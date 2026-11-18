const fs = require('fs');

console.log('=== Replacing Booking Status Breakdown Chart with Interactive Multi-Line SVG Trend Chart ===');

let adminHtml = fs.readFileSync('admin.html', 'utf8').replace(/\r\n/g, '\n');

// 1. Replace HTML of Chart 2 (Status Breakdown) with Interactive Line Chart
const oldStatusHtml = `            <!-- CHART 4: Booking Status Distribution (4 Status Cards + Stacked Progress Bar) -->
            <div class="status-breakdown-card">
              <div class="chart-section-head" style="margin-bottom:8px;">
                <div>
                  <h4>2. 🚦 สัดส่วนสถานะคำสั่งจองและมูลค่าเงินแยกตามสถานะ (Booking Status Breakdown)</h4>
                  <p>คลิกที่การ์ดสถานะด้านล่างเพื่อกรองตารางรายการจองตามสถานะได้ทันที</p>
                </div>
                <button type="button" class="btn-secondary" id="btn-reset-status-card" style="display:none; font-size:11.5px; padding:4px 10px;" onclick="filterDashboardByStatus('all')">
                  แสดงทุกสถานะ
                </button>
              </div>
              <div class="status-stacked-bar" id="admin-status-stacked-bar"></div>
              <div class="status-cards-grid" id="admin-status-cards-grid"></div>
            </div>`;

const newLineChartHtml = `            <!-- CHART 2: Interactive Multi-Line Trend Chart (Revenue & Bookings Trend Jan - Dec) -->
            <div class="monthly-chart-card" id="admin-line-chart-card">
              <div class="chart-section-head" style="margin-bottom:12px;">
                <div>
                  <h4>2. 📈 กราฟเส้นวิเคราะห์แนวโน้มยอดเงินรายได้และจำนวนการจองรายเดือน (Monthly Trend Line Chart)</h4>
                  <p>เปรียบเทียบทิศทางแนวโน้มยอดเงินรายได้ (THB) และปริมาณการจอง (รายการ) ตลอดทั้งปี (คลิกที่จุดข้อมูลแต่ละเดือนเพื่อดูรายละเอียด)</p>
                </div>
                <div style="display:flex; gap:6px; flex-wrap:wrap;">
                  <button type="button" class="btn-secondary line-mode-btn active" id="btn-line-mode-dual" onclick="setAdminLineChartMode('dual')" style="font-size:11.5px; padding:5px 11px; border-color:#0284c7; background:#f0f9ff; color:#0284c7; font-weight:700;">
                    🔄 เปรียบเทียบ 2 เส้น (ยอดเงิน & การจอง)
                  </button>
                  <button type="button" class="btn-secondary line-mode-btn" id="btn-line-mode-rev" onclick="setAdminLineChartMode('revenue')" style="font-size:11.5px; padding:5px 11px;">
                    💰 เฉพาะเส้นยอดเงิน (Revenue)
                  </button>
                  <button type="button" class="btn-secondary line-mode-btn" id="btn-line-mode-bk" onclick="setAdminLineChartMode('bookings')" style="font-size:11.5px; padding:5px 11px;">
                    📊 เฉพาะเส้นจำนวนการจอง (Bookings)
                  </button>
                </div>
              </div>

              <div class="chart-legend-inline" style="margin-bottom:10px;">
                <span id="line-legend-rev"><i class="legend-dot" style="background:#0284c7; border-radius:50%;"></i>เส้นยอดขายรายเดือน (฿ THB)</span>
                <span id="line-legend-bk"><i class="legend-dot" style="background:#ea580c; border-radius:50%;"></i>เส้นจำนวนการจอง (รายการ)</span>
                <span id="line-legend-avg"><i class="legend-dot" style="background:#0d9488; height:3px; width:14px;"></i>เส้นค่าเฉลี่ยรายเดือน (Average Benchmark)</span>
              </div>

              <div class="monthly-bars-scroll" style="padding-bottom:4px;">
                <div id="admin-line-chart-svg-wrap" style="min-width:740px; width:100%;">
                  <!-- SVG Line Chart injected dynamically by renderAdminLineChart() -->
                </div>
              </div>

              <div id="admin-line-chart-summary" style="margin-top:12px; display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px 16px; font-size:12.5px;">
                <!-- Summary stats injected dynamically -->
              </div>
            </div>`;

if (adminHtml.includes(oldStatusHtml)) {
  adminHtml = adminHtml.replace(oldStatusHtml, newLineChartHtml);
  console.log('✓ Replaced Status Breakdown HTML with Interactive Line Chart HTML');
} else {
  console.error('✗ Failed to find oldStatusHtml');
}

// 2. Replace Status Breakdown JS rendering with renderAdminLineChart(monthlyData)
const oldStatusJs = `      // Render Chart 4: Status Breakdown
      const totalResCount = Math.max(reservations.length, 1);
      const statusGroups = [
        { key: 'Confirmed', label: 'ยืนยันแล้ว (Confirmed)', icon: '✅', color: '#10b981', bg: '#ecfdf5', list: confList },
        { key: 'PendingConfirm', label: 'รอตรวจสอบ (Pending)', icon: '⏳', color: '#f59e0b', bg: '#fffbeb', list: pendList },
        { key: 'Completed', label: 'เสร็จสมบูรณ์ (Completed)', icon: '🏆', color: '#0284c7', bg: '#f0f9ff', list: compList },
        { key: 'Cancelled', label: 'ยกเลิก/คืนเงิน (Cancelled)', icon: '❌', color: '#ef4444', bg: '#fef2f2', list: cancList }
      ];

      const stackedBarEl = document.getElementById('admin-status-stacked-bar');
      const statusCardsEl = document.getElementById('admin-status-cards-grid');
      const resetStatusBtn = document.getElementById('btn-reset-status-card');
      if (resetStatusBtn) resetStatusBtn.style.display = (adminSelectedStatusFilter !== 'all') ? 'inline-flex' : 'none';

      if (stackedBarEl) {
        stackedBarEl.innerHTML = statusGroups.map(g => {
          const pct = Math.round((g.list.length / totalResCount) * 100);
          return pct > 0 ? \`<div class="status-seg" style="width:\${pct}%; background:\${g.color};" title="\${g.label}: \${g.list.length} รายการ (\${pct}%)"></div>\` : '';
        }).join('');
      }

      if (statusCardsEl) {
        statusCardsEl.innerHTML = statusGroups.map(g => {
          const sumAmt = g.list.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);
          const pct = Math.round((g.list.length / totalResCount) * 100);
          const isAct = adminSelectedStatusFilter === g.key;
          return \`
            <div class="status-stat-item \${isAct ? 'active' : ''}" onclick="filterDashboardByStatus('\${g.key}')">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:12px; font-weight:700; color:#334155;">\${g.icon} \${g.label}</span>
                <span style="font-size:11px; font-weight:700; padding:2px 7px; border-radius:99px; background:\${g.bg}; color:\${g.color};">\${pct}%</span>
              </div>
              <div style="font-size:20px; font-weight:800; color:#0f172a;">\${g.list.length} <small style="font-size:12px; font-weight:600; color:#64748b;">รายการ</small></div>
              <div style="font-size:12px; color:\${g.color}; font-weight:700; margin-top:2px;">มูลค่ารวม ฿\${sumAmt.toLocaleString('th-TH')}</div>
            </div>
          \`;
        }).join('');
      }`;

const newLineChartJs = `      // Render Chart 2: Interactive Multi-Line SVG Trend Chart
      renderAdminLineChart(monthlyData);`;

if (adminHtml.includes(oldStatusJs)) {
  adminHtml = adminHtml.replace(oldStatusJs, newLineChartJs);
  console.log('✓ Replaced Status Breakdown JS with renderAdminLineChart(monthlyData)');
} else {
  console.error('✗ Failed to find oldStatusJs');
}

// 3. Add setAdminLineChartMode and renderAdminLineChart functions
const lineChartFunctions = `
    let adminLineChartMode = 'dual'; // 'dual' | 'revenue' | 'bookings'

    function setAdminLineChartMode(mode) {
      adminLineChartMode = mode;
      ['dual', 'rev', 'bk'].forEach(k => {
        const btn = document.getElementById('btn-line-mode-' + k);
        if (btn) {
          const isAct = (k === 'dual' && mode === 'dual') || (k === 'rev' && mode === 'revenue') || (k === 'bk' && mode === 'bookings');
          btn.classList.toggle('active', isAct);
          btn.style.borderColor = isAct ? '#0284c7' : '#e2e8f0';
          btn.style.background = isAct ? '#f0f9ff' : '#ffffff';
          btn.style.color = isAct ? '#0284c7' : '#475569';
          btn.style.fontWeight = isAct ? '700' : '500';
        }
      });
      renderAdminAnalyticsDashboard();
    }

    function renderAdminLineChart(monthlyData) {
      const wrap = document.getElementById('admin-line-chart-svg-wrap');
      const summaryWrap = document.getElementById('admin-line-chart-summary');
      if (!wrap || !monthlyData || !monthlyData.length) return;

      const svgW = 960;
      const svgH = 270;
      const padL = 62;
      const padR = 54;
      const padT = 34;
      const padB = 44;
      const plotW = svgW - padL - padR;
      const plotH = svgH - padT - padB;

      const maxRev = Math.max(...monthlyData.map(m => m.revenue), 10000) * 1.12;
      const maxBk = Math.max(...monthlyData.map(m => m.bookings), 5) * 1.18;
      const avgRev = Math.round(monthlyData.reduce((s, m) => s + m.revenue, 0) / monthlyData.length);
      const avgBk = (monthlyData.reduce((s, m) => s + m.bookings, 0) / monthlyData.length).toFixed(1);

      const getX = (idx) => Math.round(padL + (idx / 11) * plotW);
      const getRevY = (val) => Math.round(padT + plotH - (val / maxRev) * plotH);
      const getBkY = (val) => Math.round(padT + plotH - (val / maxBk) * plotH);

      // Horizontal Grid Lines (5 steps)
      let gridLinesSvg = '';
      for (let i = 0; i <= 4; i++) {
        const ratio = i / 4;
        const y = Math.round(padT + plotH - ratio * plotH);
        const revLabel = Math.round((maxRev * ratio) / 1000) + 'k';
        const bkLabel = Math.round(maxBk * ratio);
        gridLinesSvg += \`
          <line x1="\${padL}" y1="\${y}" x2="\${svgW - padR}" y2="\${y}" stroke="\${i === 0 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="\${i === 0 ? '1.5' : '1'}" stroke-dasharray="\${i === 0 ? '' : '4 4'}"/>
          <text x="\${padL - 10}" y="\${y + 4}" fill="#64748b" font-size="11" font-weight="600" text-anchor="end">฿\${revLabel}</text>
          <text x="\${svgW - padR + 10}" y="\${y + 4}" fill="#ea580c" font-size="11" font-weight="600" text-anchor="start">\${bkLabel} จอง</text>
        \`;
      }

      // Average Revenue Benchmark Line
      const avgRevY = getRevY(avgRev);
      const avgLineSvg = (adminLineChartMode !== 'bookings') ? \`
        <line x1="\${padL}" y1="\${avgRevY}" x2="\${svgW - padR}" y2="\${avgRevY}" stroke="#0d9488" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.8"/>
        <rect x="\${svgW - padR - 118}" y="\${avgRevY - 18}" width="114" height="16" rx="4" fill="#ecfdf5" stroke="#99f6e4"/>
        <text x="\${svgW - padR - 61}" y="\${avgRevY - 7}" fill="#0f766e" font-size="10" font-weight="700" text-anchor="middle">เฉลี่ย ฿\${(avgRev/1000).toFixed(1)}k/เดือน</text>
      \` : '';

      // Build Revenue Path & Area
      const revPoints = monthlyData.map((m, i) => ({ x: getX(i), y: getRevY(m.revenue), m }));
      const bkPoints = monthlyData.map((m, i) => ({ x: getX(i), y: getBkY(m.bookings), m }));

      const buildSmoothPath = (pts) => {
        if (!pts.length) return '';
        let d = \`M \${pts[0].x} \${pts[0].y}\`;
        for (let i = 0; i < pts.length - 1; i++) {
          const p0 = pts[i];
          const p1 = pts[i + 1];
          const cpx1 = Math.round(p0.x + (p1.x - p0.x) * 0.45);
          const cpx2 = Math.round(p0.x + (p1.x - p0.x) * 0.55);
          d += \` C \${cpx1} \${p0.y}, \${cpx2} \${p1.y}, \${p1.x} \${p1.y}\`;
        }
        return d;
      };

      const revLinePath = buildSmoothPath(revPoints);
      const revAreaPath = \`\${revLinePath} L \${revPoints[revPoints.length - 1].x} \${padT + plotH} L \${revPoints[0].x} \${padT + plotH} Z\`;

      const bkLinePath = buildSmoothPath(bkPoints);
      const bkAreaPath = \`\${bkLinePath} L \${bkPoints[bkPoints.length - 1].x} \${padT + plotH} L \${bkPoints[0].x} \${padT + plotH} Z\`;

      // Active Month Vertical Highlight & X-axis labels
      const xAxisSvg = monthlyData.map((m, i) => {
        const x = getX(i);
        const isSel = adminSelectedMonth === i;
        return \`
          <g style="cursor:pointer;" onclick="selectDashboardMonth(\${i})">
            \${isSel ? \`<rect x="\${x - 24}" y="\${padT - 10}" width="48" height="\${plotH + 10}" rx="8" fill="rgba(13, 148, 136, 0.09)"/>\` : ''}
            <line x1="\${x}" y1="\${padT}" x2="\${x}" y2="\${padT + plotH}" stroke="\${isSel ? '#0d9488' : '#f1f5f9'}" stroke-width="\${isSel ? '1.5' : '1'}"/>
            \${isSel ? \`<rect x="\${x - 22}" y="\${padT + plotH + 8}" width="44" height="22" rx="6" fill="#0d9488"/>\` : ''}
            <text x="\${x}" y="\${padT + plotH + 23}" fill="\${isSel ? '#ffffff' : '#334155'}" font-size="12" font-weight="700" text-anchor="middle">\${m.shortName}</text>
          </g>
        \`;
      }).join('');

      // Revenue Nodes
      const revNodesSvg = (adminLineChartMode === 'dual' || adminLineChartMode === 'revenue') ? revPoints.map((pt, i) => {
        const isSel = adminSelectedMonth === i;
        const revShort = pt.m.revenue >= 1000 ? '฿' + (pt.m.revenue / 1000).toFixed(1) + 'k' : '฿' + pt.m.revenue;
        return \`
          <g style="cursor:pointer;" onclick="selectDashboardMonth(\${i})">
            <title>เดือน\${pt.m.fullName}: ยอดขาย ฿\${pt.m.revenue.toLocaleString('th-TH')} (\${pt.m.bookings} รายการ)</title>
            <circle cx="\${pt.x}" cy="\${pt.y}" r="\${isSel ? '7' : '5'}" fill="\${isSel ? '#0d9488' : '#0284c7'}" stroke="#ffffff" stroke-width="2.5"/>
            <text x="\${pt.x}" y="\${pt.y - 11}" fill="\${isSel ? '#0f766e' : '#0369a1'}" font-size="10.5" font-weight="800" text-anchor="middle">\${revShort}</text>
          </g>
        \`;
      }).join('') : '';

      // Booking Nodes
      const bkNodesSvg = (adminLineChartMode === 'dual' || adminLineChartMode === 'bookings') ? bkPoints.map((pt, i) => {
        const isSel = adminSelectedMonth === i;
        const labelOffset = (adminLineChartMode === 'dual' && Math.abs(pt.y - revPoints[i].y) < 22) ? 18 : -10;
        return \`
          <g style="cursor:pointer;" onclick="selectDashboardMonth(\${i})">
            <title>เดือน\${pt.m.fullName}: จำนวน \${pt.m.bookings} รายการจอง</title>
            <circle cx="\${pt.x}" cy="\${pt.y}" r="\${isSel ? '6.5' : '4.5'}" fill="#ea580c" stroke="#ffffff" stroke-width="2"/>
            <text x="\${pt.x}" y="\${pt.y + labelOffset}" fill="#c2410c" font-size="10" font-weight="700" text-anchor="middle">\${pt.m.bookings} จอง</text>
          </g>
        \`;
      }).join('') : '';

      wrap.innerHTML = \`
        <svg viewBox="0 0 \${svgW} \${svgH}" preserveAspectRatio="xMidYMid meet" style="width:100%; height:auto; display:block; overflow:visible;">
          <defs>
            <linearGradient id="lineRevGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0284c7" stop-opacity="0.28"/>
              <stop offset="100%" stop-color="#0284c7" stop-opacity="0.01"/>
            </linearGradient>
            <linearGradient id="lineBkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ea580c" stop-opacity="0.24"/>
              <stop offset="100%" stop-color="#ea580c" stop-opacity="0.01"/>
            </linearGradient>
          </defs>
          \${gridLinesSvg}
          \${xAxisSvg}
          \${avgLineSvg}
          \${(adminLineChartMode === 'dual' || adminLineChartMode === 'revenue') ? \`
            <path d="\${revAreaPath}" fill="url(#lineRevGrad)"/>
            <path d="\${revLinePath}" fill="none" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
          \` : ''}
          \${(adminLineChartMode === 'bookings') ? \`
            <path d="\${bkAreaPath}" fill="url(#lineBkGrad)"/>
          \` : ''}
          \${(adminLineChartMode === 'dual' || adminLineChartMode === 'bookings') ? \`
            <path d="\${bkLinePath}" fill="none" stroke="#ea580c" stroke-width="2.5" stroke-dasharray="\${adminLineChartMode === 'dual' ? '5 3' : ''}" stroke-linecap="round"/>
          \` : ''}
          \${revNodesSvg}
          \${bkNodesSvg}
        </svg>
      \`;

      if (summaryWrap) {
        const peakM = [...monthlyData].sort((a, b) => b.revenue - a.revenue)[0];
        const minM = [...monthlyData].sort((a, b) => a.revenue - b.revenue)[0];
        summaryWrap.innerHTML = \`
          <div>
            <span style="color:#64748b; font-size:11.5px;">🏆 เดือนที่กราฟพุ่งสูงสุด (Peak Month):</span>
            <div style="font-weight:800; color:#0284c7; margin-top:2px;">\${peakM.fullName} — ฿\${peakM.revenue.toLocaleString('th-TH')} (\${peakM.bookings} จอง)</div>
          </div>
          <div>
            <span style="color:#64748b; font-size:11.5px;">📊 ค่าเฉลี่ยรายเดือน (Monthly Average):</span>
            <div style="font-weight:800; color:#0d9488; margin-top:2px;">฿\${avgRev.toLocaleString('th-TH')} / เดือน (เฉลี่ย \${avgBk} จอง/เดือน)</div>
          </div>
          <div>
            <span style="color:#64748b; font-size:11.5px;">📌 ช่วงต่ำสุด-สูงสุด (Min – Max Range):</span>
            <div style="font-weight:800; color:#0f172a; margin-top:2px;">฿\${minM.revenue.toLocaleString('th-TH')} – ฿\${peakM.revenue.toLocaleString('th-TH')}</div>
          </div>
        \`;
      }
    }
`;

adminHtml = adminHtml.replace(
  '    function setAdminAnalyticsYear(yr) {',
  lineChartFunctions + '\n    function setAdminAnalyticsYear(yr) {'
);

fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('✓ Saved admin.html with Interactive Line Chart!');
