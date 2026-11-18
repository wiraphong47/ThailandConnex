const fs = require('fs');

console.log('=== Upgrading Top Performance Dashboard Wave Chart (.chart-card-exact) in admin.html ===');

let adminHtml = fs.readFileSync('admin.html', 'utf8').replace(/\r\n/g, '\n');

// 1. Replace static .chart-card-exact HTML with dynamic interactive Wave Chart HTML
const oldTopChartCardHtml = `          <div class="chart-card-exact">
            <div class="chart-card-top">
              <div class="today-revenue">
                <h2>Today ฿ 0.00</h2>
                <small>Yesterday ฿ 0.00</small>
              </div>
              <div class="chart-actions-right" style="position:relative;">
                <div class="date-range-badge" onclick="toggleDateRangeMenu(event)" style="cursor:pointer;" title="คลิกเพื่อเลือกช่วงเวลา">
                  <span>📅</span>
                  <span id="dash-date-label">January 23, 2023 - February 7, 2023</span>
                  <span style="font-size:10px;">▼</span>
                </div>
                <div class="total-range-val">
                  Total <b id="dash-total-revenue">฿ 96,430.00</b>
                </div>

                <!-- Dropdown selection -->
                <div class="date-dropdown-menu" id="dash-date-menu">
                  <div class="date-dropdown-item active" onclick="selectDateRange('default')">
                    <span>23 Jan - 7 Feb 2023</span>
                    <small style="color:var(--text-muted)">Default</small>
                  </div>
                  <div class="date-dropdown-item" onclick="selectDateRange('last7')">
                    <span>Last 7 Days</span>
                    <small style="color:var(--text-muted)">1 Feb - 7 Feb</small>
                  </div>
                  <div class="date-dropdown-item" onclick="selectDateRange('last30')">
                    <span>Last 30 Days</span>
                    <small style="color:var(--text-muted)">9 Jan - 7 Feb</small>
                  </div>
                  <div class="date-dropdown-item" onclick="selectDateRange('ytd')">
                    <span>Year 2023 (YTD)</span>
                    <small style="color:var(--text-muted)">1 Jan - 7 Feb</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- Wave Area Graph -->
            <div class="wave-chart-container">
              <svg class="chart-grid-svg" viewBox="0 0 1000 230" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#168de1" stop-opacity="0.38"/>
                    <stop offset="100%" stop-color="#168de1" stop-opacity="0.02"/>
                  </linearGradient>
                </defs>

                <line x1="50" y1="20" x2="980" y2="20" stroke="#f1f5f9" stroke-width="1"/>
                <text x="40" y="24" fill="#94a3b8" font-size="10.5" text-anchor="end">24000</text>
                <line x1="50" y1="65" x2="980" y2="65" stroke="#f1f5f9" stroke-width="1"/>
                <text x="40" y="69" fill="#94a3b8" font-size="10.5" text-anchor="end">18000</text>
                <line x1="50" y1="110" x2="980" y2="110" stroke="#f1f5f9" stroke-width="1"/>
                <text x="40" y="114" fill="#94a3b8" font-size="10.5" text-anchor="end">12000</text>
                <line x1="50" y1="155" x2="980" y2="155" stroke="#f1f5f9" stroke-width="1"/>
                <text x="40" y="159" fill="#94a3b8" font-size="10.5" text-anchor="end">6000</text>
                <line x1="50" y1="200" x2="980" y2="200" stroke="#cbd5e1" stroke-width="1.2"/>
                <text x="40" y="204" fill="#94a3b8" font-size="10.5" text-anchor="end">0</text>

                <path d="M 60 200 L 120 200 C 140 200, 160 85, 200 85 L 250 82 C 270 82, 280 200, 310 200 L 340 200 C 370 200, 385 160, 420 160 C 455 160, 465 175, 490 170 C 520 160, 530 115, 550 100 C 575 80, 585 30, 620 30 C 655 30, 675 75, 710 165 C 730 200, 750 200, 770 200 L 810 200 C 840 200, 860 190, 890 190 C 920 190, 940 200, 970 200 L 970 200 Z" fill="url(#areaGrad)"/>
                <path d="M 60 200 L 120 200 C 140 200, 160 85, 200 85 L 250 82 C 270 82, 280 200, 310 200 L 340 200 C 370 200, 385 160, 420 160 C 455 160, 465 175, 490 170 C 520 160, 530 115, 550 100 C 575 80, 585 30, 620 30 C 655 30, 675 75, 710 165 C 730 200, 750 200, 770 200 L 810 200 C 840 200, 860 190, 890 190 C 920 190, 940 200, 970 200" fill="none" stroke="#168de1" stroke-width="2.5" stroke-linecap="round"/>

                <text x="60" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">23 Jan</text>
                <text x="120" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">24 Jan</text>
                <text x="180" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">25 Jan</text>
                <text x="240" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">26 Jan</text>
                <text x="300" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">27 Jan</text>
                <text x="360" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">28 Jan</text>
                <text x="420" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">29 Jan</text>
                <text x="480" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">30 Jan</text>
                <text x="540" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">31 Jan</text>
                <text x="600" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">1 Feb</text>
                <text x="660" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">2 Feb</text>
                <text x="720" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">3 Feb</text>
                <text x="780" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">4 Feb</text>
                <text x="840" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">5 Feb</text>
                <text x="900" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">6 Feb</text>
                <text x="960" y="218" fill="#94a3b8" font-size="10.5" text-anchor="middle">7 Feb</text>
              </svg>
            </div>
          </div>`;

const newTopChartCardHtml = `          <div class="chart-card-exact">
            <div class="chart-card-top">
              <div class="today-revenue">
                <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                  <h2 id="dash-header-today-rev">Today ฿ 430.00</h2>
                  <span id="dash-header-today-badge" class="badge badge-success" style="font-size:11.5px; padding:4px 10px;">+1 การจองวันนี้ (Live)</span>
                </div>
                <small id="dash-header-yesterday-rev" style="font-size:13px; color:#475569; font-weight:500;">
                  Yesterday <b style="color:#0f172a;">฿ 10,560.00</b> (3 รายการจอง) • ค่าคอมมิชชันวันนี้ <b id="dash-header-today-comm" style="color:#0d9488;">฿ 22.00</b>
                </small>
              </div>
              <div class="chart-actions-right" style="position:relative;">
                <div class="date-range-badge" onclick="toggleDateRangeMenu(event)" style="cursor:pointer;" title="คลิกเพื่อเลือกช่วงเวลาแสดงกราฟ">
                  <span>📅</span>
                  <span id="dash-date-label">12 พ.ย. 2026 - ปัจจุบัน (ข้อมูลการจองสด Live)</span>
                  <span style="font-size:10px;">▼</span>
                </div>
                <div class="total-range-val">
                  Total <b id="dash-total-revenue" style="color:#0284c7;">฿ 40,890.00</b>
                  <span id="dash-total-bk-tag" style="font-size:12px; color:#64748b; font-weight:500; margin-left:4px;">(9 รายการ)</span>
                </div>

                <!-- Dropdown selection -->
                <div class="date-dropdown-menu" id="dash-date-menu" style="width:290px;">
                  <div class="date-dropdown-item active" id="range-item-live" onclick="selectDateRange('live')">
                    <span>🟢 ช่วงปัจจุบัน (พ.ย. 2026 Live)</span>
                    <small style="color:var(--text-muted)">Real-time</small>
                  </div>
                  <div class="date-dropdown-item" id="range-item-monthly" onclick="selectDateRange('monthly')">
                    <span>📊 รายเดือนทั้งปี 2026 (ม.ค. - ธ.ค.)</span>
                    <small style="color:var(--text-muted)">12 เดือน</small>
                  </div>
                  <div class="date-dropdown-item" id="range-item-default" onclick="selectDateRange('default')">
                    <span>📑 23 Jan - 7 Feb 2023</span>
                    <small style="color:var(--text-muted)">รายงาน depa</small>
                  </div>
                  <div class="date-dropdown-item" id="range-item-ytd" onclick="selectDateRange('ytd')">
                    <span>📈 Year 2023 (ม.ค. - ธ.ค. 2023)</span>
                    <small style="color:var(--text-muted)">ทั้งปี 2023</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- Interactive Wave Area Graph -->
            <div class="wave-chart-container" id="dash-top-wave-wrap">
              <!-- Populated dynamically by renderTopWaveChart() -->
            </div>

            <!-- Selected Point Detail Strip -->
            <div id="dash-top-wave-detail" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 16px; font-size:12.5px; color:#334155; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
              <span>💡 <b>คำแนะนำ:</b> คลิกที่จุดข้อมูลบนกราฟเพื่อดูยอดเงินและรายละเอียดการจองของวัน/เดือนนั้นๆ</span>
              <span style="color:#0284c7; font-weight:700;">ซิงค์ข้อมูลสดอัตโนมัติ (Real-time Sync)</span>
            </div>
          </div>`;

if (adminHtml.includes(oldTopChartCardHtml)) {
  adminHtml = adminHtml.replace(oldTopChartCardHtml, newTopChartCardHtml);
  console.log('✓ Upgraded .chart-card-exact HTML in admin.html');
} else {
  console.error('✗ Failed to match oldTopChartCardHtml');
}

// 2. Replace selectDateRange and add renderTopWaveChart() in admin.html
const oldSelectDateRange = `    function selectDateRange(rangeKey) {
      const label = document.getElementById('dash-date-label');
      const totalRev = document.getElementById('dash-total-revenue');
      const kpiBookings = document.getElementById('dash-kpi-bookings');
      const todayRev = document.getElementById('dash-kpi-today-rev');
      const todayCount = document.getElementById('dash-kpi-today-count');

      document.querySelectorAll('.date-dropdown-item').forEach(i => i.classList.remove('active'));

      if (rangeKey === 'default') {
        label.textContent = 'January 23, 2023 - February 7, 2023';
        totalRev.textContent = '฿ 96,430.00';
        kpiBookings.textContent = '80';
        todayRev.textContent = '฿ 0.00';
        todayCount.textContent = '0';
      } else if (rangeKey === 'last7') {
        label.textContent = 'Last 7 Days (1 Feb - 7 Feb 2023)';
        totalRev.textContent = '฿ 42,850.00';
        kpiBookings.textContent = '36';
        todayRev.textContent = '฿ 2,580.00';
        todayCount.textContent = '4';
      } else if (rangeKey === 'last30') {
        label.textContent = 'Last 30 Days (9 Jan - 7 Feb 2023)';
        totalRev.textContent = '฿ 185,620.00';
        kpiBookings.textContent = '154';
        todayRev.textContent = '฿ 2,580.00';
        todayCount.textContent = '4';
      } else if (rangeKey === 'ytd') {
        label.textContent = 'Year 2023 to Date (1 Jan - 7 Feb 2023)';
        totalRev.textContent = '฿ 428,900.00';
        kpiBookings.textContent = '362';
        todayRev.textContent = '฿ 2,580.00';
        todayCount.textContent = '4';
      }

      const menu = document.getElementById('dash-date-menu');
      if (menu) menu.classList.remove('show');
      showToast(\`อัปเดตสถิติช่วงเวลา: \${label.textContent}\`, 'info');
    }`;

const newSelectDateRange = `    let currentTopWaveRange = 'live'; // 'live' | 'monthly' | 'default' | 'ytd'
    let selectedTopWaveIndex = -1;

    function selectDateRange(rangeKey) {
      currentTopWaveRange = rangeKey;
      selectedTopWaveIndex = -1;
      document.querySelectorAll('.date-dropdown-item').forEach(i => i.classList.remove('active'));
      const activeItem = document.getElementById('range-item-' + rangeKey);
      if (activeItem) activeItem.classList.add('active');

      const menu = document.getElementById('dash-date-menu');
      if (menu) menu.classList.remove('show');

      renderTopWaveChart();
      const label = document.getElementById('dash-date-label');
      if (label) showToast(\`อัปเดตกราฟช่วงเวลา: \${label.textContent}\`, 'info');
    }

    function selectTopWavePoint(idx) {
      selectedTopWaveIndex = (selectedTopWaveIndex === idx) ? -1 : idx;
      renderTopWaveChart();
    }

    function renderTopWaveChart(reservationsInput) {
      const storeState = (typeof TCStore !== 'undefined') ? TCStore.getState() : {};
      const currentAdmin = (storeState.auth && storeState.auth.currentAdmin) || {};
      const isPartner = (currentAdmin.email || '').toLowerCase().includes('somchai') || (currentAdmin.email || '').toLowerCase().includes('phuket');

      let reservations = reservationsInput || storeState.reservations || [];
      if (isPartner) {
        reservations = reservations.filter(r => {
          const p = (r.property || '').toLowerCase();
          const s = (r.serviceName || '').toLowerCase();
          const a = (r.agent || '').toLowerCase();
          return p.includes('phuket') || p.includes('ภูเก็ต') || p.includes('สมชาย') || p.includes('andaman') || p.includes('tour') || p.includes('sealife') || s.includes('phuket') || s.includes('ภูเก็ต') || s.includes('sealife') || a.includes('gianttick');
        });
      }

      // 1. Calculate Today & Yesterday Revenue dynamically so Top Header matches Bottom KPI Card 100%
      const nowIso = new Date().toISOString().substring(0, 10);
      const todayBookings = reservations.filter(r => {
        const b = (r.bookedOn || '').substring(0, 10);
        return b === nowIso || b === '2026-11-18' || b === '2026-11-17';
      });
      const yesterdayBookings = reservations.filter(r => {
        const b = (r.bookedOn || '').substring(0, 10);
        return b === '2026-11-16';
      });

      const todayRev = todayBookings.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);
      const todayComm = Math.round(todayRev * 0.05);
      const yesterdayRev = yesterdayBookings.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);

      const headerTodayEl = document.getElementById('dash-header-today-rev');
      const headerTodayBadge = document.getElementById('dash-header-today-badge');
      const headerYesterdayEl = document.getElementById('dash-header-yesterday-rev');
      const kpiTodayCount = document.getElementById('dash-kpi-today-count');
      const kpiTodayRev = document.getElementById('dash-kpi-today-rev');

      if (headerTodayEl) headerTodayEl.textContent = 'Today ฿ ' + todayRev.toLocaleString('th-TH', { minimumFractionDigits: 2 });
      if (headerTodayBadge) headerTodayBadge.textContent = \`+\${todayBookings.length} การจองวันนี้ (Live)\`;
      if (headerYesterdayEl) {
        headerYesterdayEl.innerHTML = \`Yesterday <b style="color:#0f172a;">฿ \${yesterdayRev.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</b> (\${yesterdayBookings.length} รายการจอง) • ค่าคอมมิชชันวันนี้ <b style="color:#0d9488;">฿ \${todayComm.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</b>\`;
      }
      if (kpiTodayCount) kpiTodayCount.textContent = todayBookings.length;
      if (kpiTodayRev) kpiTodayRev.textContent = '฿ ' + todayRev.toLocaleString('th-TH', { minimumFractionDigits: 2 });

      // 2. Build Series Points based on currentTopWaveRange
      let pointsData = [];
      const labelEl = document.getElementById('dash-date-label');
      const totalRevEl = document.getElementById('dash-total-revenue');
      const totalBkTag = document.getElementById('dash-total-bk-tag');
      const kpiBookingsEl = document.getElementById('dash-kpi-bookings');

      if (currentTopWaveRange === 'live') {
        if (labelEl) labelEl.textContent = '12 พ.ย. 2026 – ปัจจุบัน (ข้อมูลการจองสด Real-time)';
        // Group live reservations by bookedOn date (YYYY-MM-DD)
        const dateMap = {};
        const baseDates = ['2026-11-12', '2026-11-13', '2026-11-14', '2026-11-15', '2026-11-16', '2026-11-17'];
        if (!baseDates.includes(nowIso) && nowIso.startsWith('2026-11')) baseDates.push(nowIso);
        baseDates.forEach(d => { dateMap[d] = { date: d, rev: 0, bk: 0, items: [] }; });

        reservations.forEach(r => {
          const d = (r.bookedOn || '2026-11-17').substring(0, 10);
          if (!dateMap[d]) dateMap[d] = { date: d, rev: 0, bk: 0, items: [] };
          dateMap[d].rev += (parseFloat(r.amount) || 0);
          dateMap[d].bk += 1;
          dateMap[d].items.push(r);
        });

        const sortedDates = Object.keys(dateMap).sort();
        pointsData = sortedDates.map(d => {
          const parts = d.split('-');
          const dayNum = parseInt(parts[2] || '1', 10);
          const mIdx = parseInt(parts[1] || '11', 10) - 1;
          const mShort = (typeof THAI_MONTHS_SHORT !== 'undefined' && THAI_MONTHS_SHORT[mIdx]) ? THAI_MONTHS_SHORT[mIdx] : 'พ.ย.';
          return {
            label: \`\${dayNum} \${mShort}\`,
            fullLabel: \`วันที่ \${dayNum} \${mShort} \${parts[0]}\`,
            rev: dateMap[d].rev,
            bk: dateMap[d].bk,
            items: dateMap[d].items
          };
        });
      } else if (currentTopWaveRange === 'monthly') {
        if (labelEl) labelEl.textContent = 'ม.ค. – ธ.ค. 2026 (ยอดขายรายเดือนทั้งปี)';
        const baseArr = (typeof BASE_MONTHLY_STATS !== 'undefined' && BASE_MONTHLY_STATS['2026']) ? BASE_MONTHLY_STATS['2026'] : [];
        pointsData = (typeof THAI_MONTHS_SHORT !== 'undefined' ? THAI_MONTHS_SHORT : ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.']).map((mShort, idx) => {
          const bRev = baseArr[idx] ? baseArr[idx].rev : 15000;
          const bBk = baseArr[idx] ? baseArr[idx].bk : 4;
          const matching = reservations.filter(r => typeof detectReservationMonthIndex === 'function' && detectReservationMonthIndex(r) === idx && r.status !== 'Cancelled');
          const lRev = matching.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);
          return {
            label: mShort,
            fullLabel: \`เดือน\${mShort} 2026\`,
            rev: bRev + lRev,
            bk: bBk + matching.length,
            items: matching
          };
        });
      } else if (currentTopWaveRange === 'ytd') {
        if (labelEl) labelEl.textContent = 'ม.ค. – ธ.ค. 2023 (สถิติรายเดือนตามรายงาน depa)';
        const base23 = (typeof BASE_MONTHLY_STATS !== 'undefined' && BASE_MONTHLY_STATS['2023']) ? BASE_MONTHLY_STATS['2023'] : [];
        pointsData = (typeof THAI_MONTHS_SHORT !== 'undefined' ? THAI_MONTHS_SHORT : []).map((mShort, idx) => ({
          label: mShort,
          fullLabel: \`เดือน\${mShort} 2023\`,
          rev: base23[idx] ? base23[idx].rev : 35000,
          bk: base23[idx] ? base23[idx].bk : 25,
          items: []
        }));
      } else {
        if (labelEl) labelEl.textContent = 'January 23, 2023 - February 7, 2023 (รายงาน depa)';
        const depaDays = [
          { label: '23 Jan', rev: 1200, bk: 2 },
          { label: '24 Jan', rev: 2400, bk: 3 },
          { label: '25 Jan', rev: 14800, bk: 12 },
          { label: '26 Jan', rev: 15600, bk: 14 },
          { label: '27 Jan', rev: 1800, bk: 2 },
          { label: '28 Jan', rev: 1500, bk: 2 },
          { label: '29 Jan', rev: 5400, bk: 5 },
          { label: '30 Jan', rev: 4100, bk: 4 },
          { label: '31 Jan', rev: 12500, bk: 9 },
          { label: '1 Feb', rev: 22400, bk: 16 },
          { label: '2 Feb', rev: 11200, bk: 8 },
          { label: '3 Feb', rev: 1600, bk: 1 },
          { label: '4 Feb', rev: 0, bk: 0 },
          { label: '5 Feb', rev: 600, bk: 1 },
          { label: '6 Feb', rev: 1330, bk: 1 },
          { label: '7 Feb', rev: 0, bk: 0 }
        ];
        pointsData = depaDays.map(d => ({
          label: d.label,
          fullLabel: \`วันที่ \${d.label} 2023\`,
          rev: d.rev,
          bk: d.bk,
          items: []
        }));
      }

      const sumRangeRev = pointsData.reduce((s, p) => s + p.rev, 0);
      const sumRangeBk = pointsData.reduce((s, p) => s + p.bk, 0);

      if (totalRevEl) totalRevEl.textContent = '฿ ' + sumRangeRev.toLocaleString('th-TH', { minimumFractionDigits: 2 });
      if (totalBkTag) totalBkTag.textContent = \`(\${sumRangeBk} รายการ)\`;
      if (kpiBookingsEl) kpiBookingsEl.textContent = isPartner ? \`\${reservations.length} (ภูเก็ต)\` : sumRangeBk;

      // 3. Render SVG Wave Area + Interactive Data Points
      const wrap = document.getElementById('dash-top-wave-wrap');
      if (!wrap || !pointsData.length) return;

      const svgW = 1000;
      const svgH = 250;
      const padL = 64;
      const padR = 36;
      const padT = 36;
      const padB = 42;
      const plotW = svgW - padL - padR;
      const plotH = svgH - padT - padB;

      const rawMax = Math.max(...pointsData.map(p => p.rev), 4000);
      const stepVal = Math.ceil((rawMax * 1.15) / 4 / 1000) * 1000;
      const maxAxisVal = stepVal * 4;

      const getX = (i) => pointsData.length === 1
        ? Math.round(padL + plotW / 2)
        : Math.round(padL + (i / (pointsData.length - 1)) * plotW);
      const getY = (val) => Math.round(padT + plotH - (val / maxAxisVal) * plotH);

      let gridSvg = '';
      for (let step = 0; step <= 4; step++) {
        const val = step * stepVal;
        const y = getY(val);
        gridSvg += \`
          <line x1="\${padL}" y1="\${y}" x2="\${svgW - padR}" y2="\${y}" stroke="\${step === 0 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="\${step === 0 ? '1.5' : '1'}"/>
          <text x="\${padL - 10}" y="\${y + 4}" fill="#64748b" font-size="11" font-weight="600" text-anchor="end">฿\${val >= 1000 ? (val / 1000) + 'k' : val}</text>
        \`;
      }

      const coords = pointsData.map((p, i) => ({ x: getX(i), y: getY(p.rev), p, i }));

      let linePath = \`M \${coords[0].x} \${coords[0].y}\`;
      for (let i = 0; i < coords.length - 1; i++) {
        const c0 = coords[i];
        const c1 = coords[i + 1];
        const cpx1 = Math.round(c0.x + (c1.x - c0.x) * 0.45);
        const cpx2 = Math.round(c0.x + (c1.x - c0.x) * 0.55);
        linePath += \` C \${cpx1} \${c0.y}, \${cpx2} \${c1.y}, \${c1.x} \${c1.y}\`;
      }
      const areaPath = \`\${linePath} L \${coords[coords.length - 1].x} \${padT + plotH} L \${coords[0].x} \${padT + plotH} Z\`;

      const nodesSvg = coords.map(c => {
        const isSel = selectedTopWaveIndex === c.i;
        const revLabel = c.p.rev >= 1000 ? '฿' + (c.p.rev / 1000).toFixed(1).replace('.0', '') + 'k' : (c.p.rev > 0 ? '฿' + c.p.rev : '');
        const showLabel = pointsData.length <= 12 || c.p.rev > 0;
        return \`
          <g style="cursor:pointer;" onclick="selectTopWavePoint(\${c.i})">
            <title>\${c.p.fullLabel}: ยอดขาย ฿\${c.p.rev.toLocaleString('th-TH')} (\${c.p.bk} รายการจอง)</title>
            \${isSel ? \`<line x1="\${c.x}" y1="\${padT}" x2="\${c.x}" y2="\${padT + plotH}" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4 3"/>\` : ''}
            <circle cx="\${c.x}" cy="\${c.y}" r="\${isSel ? '7' : '5'}" fill="\${isSel ? '#0d9488' : '#168de1'}" stroke="#ffffff" stroke-width="2.5"/>
            \${showLabel && revLabel ? \`
              <text x="\${c.x}" y="\${c.y - 12}" fill="\${isSel ? '#0f766e' : '#0f172a'}" font-size="10.5" font-weight="800" text-anchor="middle">\${revLabel}</text>
            \` : ''}
            <text x="\${c.x}" y="\${padT + plotH + 22}" fill="\${isSel ? '#0284c7' : '#475569'}" font-size="11" font-weight="\${isSel ? '800' : '600'}" text-anchor="middle">\${c.p.label}</text>
          </g>
        \`;
      }).join('');

      wrap.innerHTML = \`
        <svg class="chart-grid-svg" viewBox="0 0 \${svgW} \${svgH}" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#168de1" stop-opacity="0.38"/>
              <stop offset="100%" stop-color="#168de1" stop-opacity="0.02"/>
            </linearGradient>
          </defs>
          \${gridSvg}
          <path d="\${areaPath}" fill="url(#areaGrad)"/>
          <path d="\${linePath}" fill="none" stroke="#168de1" stroke-width="3" stroke-linecap="round"/>
          \${nodesSvg}
        </svg>
      \`;

      const detailBox = document.getElementById('dash-top-wave-detail');
      if (detailBox) {
        if (selectedTopWaveIndex >= 0 && pointsData[selectedTopWaveIndex]) {
          const selP = pointsData[selectedTopWaveIndex];
          const itemNames = (selP.items && selP.items.length > 0)
            ? selP.items.map(it => \`\${it.guest} (\${it.property}: ฿\${Number(it.amount).toLocaleString('th-TH')})\`).join(' • ')
            : \`ยอดรวม \${selP.bk} รายการจอง (ค่าคอมมิชชัน ฿\${Math.round(selP.rev * 0.05).toLocaleString('th-TH')})\`;
          detailBox.innerHTML = \`
            <div>
              <b style="color:#0284c7;">📌 \${selP.fullLabel}:</b> ยอดขายรวม <b>฿\${selP.rev.toLocaleString('th-TH')}</b> (\${selP.bk} รายการจอง) — <span style="color:#475569;">\${itemNames}</span>
            </div>
            <button type="button" class="btn-secondary" style="font-size:11px; padding:4px 10px;" onclick="selectTopWavePoint(-1)">✕ ปิดรายละเอียด</button>
          \`;
        } else {
          const maxPt = [...pointsData].sort((a, b) => b.rev - a.rev)[0];
          detailBox.innerHTML = \`
            <span>💡 <b>สรุปกราฟช่วงเวลานี้:</b> ยอดสูงสุดอยู่ที่ <b>\${maxPt ? maxPt.fullLabel : '-'} (฿\${maxPt ? maxPt.rev.toLocaleString('th-TH') : '0'})</b> • คลิกที่จุดกลมบนกราฟเพื่อดูรายละเอียดรายวัน</span>
            <span style="color:#0284c7; font-weight:700;">🟢 ซิงค์ข้อมูลสดอัตโนมัติ (Real-time Sync)</span>
          \`;
        }
      }
    }`;

if (adminHtml.includes(oldSelectDateRange)) {
  adminHtml = adminHtml.replace(oldSelectDateRange, newSelectDateRange);
  console.log('✓ Replaced selectDateRange and added renderTopWaveChart()');
} else {
  console.error('✗ Failed to match oldSelectDateRange');
}

// 3. Call renderTopWaveChart(reservations) inside renderAdminFromStore()
const oldKpiUpdateBlock = `      // 5. Update KPI Elements
      const kpiBookings = document.getElementById('dash-kpi-bookings');
      if (kpiBookings) kpiBookings.textContent = isPartner ? \`\${reservations.length} (ภูเก็ต)\` : reservations.length;

      const bCount = document.getElementById('booking-count');
      if (bCount) bCount.textContent = isPartner ? \`\${reservations.length} (การจองของคุณ)\` : reservations.length;

      // Calculate today's bookings
      const todayCountEl = document.getElementById('dash-kpi-today-count');
      const todayRevEl = document.getElementById('dash-kpi-today-rev');
      const todayStr = new Date().toISOString().substring(0, 10);
      const todayBookings = reservations.filter(r => (r.bookedOn || '').includes(todayStr) || (r.bookedOn || '').includes('2026-11-17') || (r.bookedOn || '').includes('2023-02-06'));
      const todayRev = todayBookings.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);

      if (todayCountEl) todayCountEl.textContent = todayBookings.length;
      if (todayRevEl) todayRevEl.textContent = '฿ ' + todayRev.toLocaleString('th-TH', { minimumFractionDigits: 2 });

      // Total revenue on dashboard header
      const totalRev = reservations.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
      const dashTotalRev = document.getElementById('dash-total-revenue');
      if (dashTotalRev) dashTotalRev.textContent = '฿ ' + totalRev.toLocaleString('th-TH', { minimumFractionDigits: 2 });`;

const newKpiUpdateBlock = `      // 5. Update Top Wave Chart & KPI Elements dynamically
      const bCount = document.getElementById('booking-count');
      if (bCount) bCount.textContent = isPartner ? \`\${reservations.length} (การจองของคุณ)\` : reservations.length;
      renderTopWaveChart(reservations);`;

if (adminHtml.includes(oldKpiUpdateBlock)) {
  adminHtml = adminHtml.replace(oldKpiUpdateBlock, newKpiUpdateBlock);
  console.log('✓ Hooked renderTopWaveChart(reservations) into renderAdminFromStore()');
} else {
  console.error('✗ Failed to match oldKpiUpdateBlock');
}

fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('✓ admin.html saved!');
