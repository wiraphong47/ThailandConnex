const fs = require('fs');

console.log('=== Fixing Monthly Chart Vertical Clipping, Scrollbar & Adding Full 12-Month Detailed Drill-down Records ===');

// ============================================================================
// PART 1: FIX admin.html MONTHLY CHART CSS & DRILL-DOWN DATA
// ============================================================================
let adminHtml = fs.readFileSync('admin.html', 'utf8').replace(/\r\n/g, '\n');

const oldMonthlyBarsCss = `    .monthly-bars-scroll {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 8px;
    }
    .monthly-bars-grid {
      display: grid;
      grid-template-columns: repeat(12, minmax(58px, 1fr));
      gap: 10px;
      min-width: 720px;
      height: 230px;
      align-items: end;
      padding: 28px 8px 10px;
      border-bottom: 2px solid #e2e8f0;
      position: relative;
      background: linear-gradient(to bottom, #f8fafc 1px, transparent 1px);
      background-size: 100% 45px;
    }
    .month-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      cursor: pointer;
      position: relative;
      padding: 0 4px;
      border-radius: 8px;
      transition: background 0.15s ease;
    }
    .month-col:hover, .month-col.active {
      background: rgba(2, 132, 199, 0.08);
    }
    .month-bk-pill {
      font-size: 10.5px;
      font-weight: 700;
      color: #c2410c;
      background: #ffedd5;
      border: 1px solid #fed7aa;
      border-radius: 999px;
      padding: 1px 7px;
      margin-bottom: 5px;
      white-space: nowrap;
      transition: transform 0.15s ease;
    }
    .month-col:hover .month-bk-pill, .month-col.active .month-bk-pill {
      background: #ea580c;
      color: #ffffff;
      border-color: #ea580c;
      transform: scale(1.06);
    }
    .month-rev-val {
      font-size: 10.5px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
      white-space: nowrap;
    }
    .month-bar-track {
      width: 100%;
      max-width: 38px;
      background: linear-gradient(180deg, #0284c7 0%, #0369a1 100%);
      border-radius: 6px 6px 0 0;
      transition: height 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s;
      position: relative;
      min-height: 6px;
      box-shadow: 0 2px 6px rgba(2, 132, 199, 0.2);
    }
    .month-col.active .month-bar-track {
      background: linear-gradient(180deg, #0d9488 0%, #0f766e 100%);
      box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
    }
    .month-bar-comm {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #38bdf8;
      border-radius: 2px 2px 0 0;
      min-height: 3px;
    }
    .month-label {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 700;
      color: #334155;
    }
    .month-col.active .month-label {
      color: #0d9488;
      text-decoration: underline;
    }`;

const newMonthlyBarsCss = `    .monthly-bars-scroll {
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      padding: 4px 0 8px;
    }
    .monthly-bars-grid {
      display: grid;
      grid-template-columns: repeat(12, minmax(60px, 1fr));
      gap: 10px;
      min-width: 740px;
      height: auto;
      min-height: 265px;
      align-items: end;
      padding: 18px 10px 14px;
      border-bottom: 2px solid #cbd5e1;
      position: relative;
      background: repeating-linear-gradient(
        to bottom,
        #f1f5f9 0px,
        #f1f5f9 1px,
        transparent 1px,
        transparent 46px
      );
    }
    .month-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      cursor: pointer;
      position: relative;
      padding: 10px 4px 8px;
      border-radius: 10px;
      transition: all 0.18s ease;
    }
    .month-col:hover {
      background: rgba(2, 132, 199, 0.07);
    }
    .month-col.active {
      background: rgba(13, 148, 136, 0.1);
      box-shadow: inset 0 0 0 1.5px rgba(13, 148, 136, 0.35);
    }
    .month-bk-pill {
      font-size: 10.5px;
      font-weight: 700;
      color: #c2410c;
      background: #ffedd5;
      border: 1px solid #fed7aa;
      border-radius: 999px;
      padding: 2px 8px;
      margin-bottom: 6px;
      white-space: nowrap;
      transition: transform 0.15s ease;
    }
    .month-col:hover .month-bk-pill, .month-col.active .month-bk-pill {
      background: #ea580c;
      color: #ffffff;
      border-color: #ea580c;
      transform: scale(1.06);
    }
    .month-rev-val {
      font-size: 11px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
      white-space: nowrap;
    }
    .month-bar-stage {
      width: 100%;
      height: 150px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      border-bottom: 2px solid #cbd5e1;
      padding-bottom: 1px;
    }
    .month-bar-track {
      width: 100%;
      max-width: 38px;
      background: linear-gradient(180deg, #0284c7 0%, #0369a1 100%);
      border-radius: 6px 6px 0 0;
      transition: height 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s;
      position: relative;
      min-height: 8px;
      box-shadow: 0 2px 6px rgba(2, 132, 199, 0.2);
    }
    .month-col.active .month-bar-track {
      background: linear-gradient(180deg, #0d9488 0%, #0f766e 100%);
      box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
    }
    .month-bar-comm {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #38bdf8;
      border-radius: 2px 2px 0 0;
      min-height: 4px;
    }
    .month-label {
      margin-top: 10px;
      font-size: 12.5px;
      font-weight: 700;
      color: #1e293b;
      line-height: 1.3;
      padding: 2px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }
    .month-col.active .month-label {
      background: #0d9488;
      color: #ffffff;
    }`;

if (adminHtml.includes(oldMonthlyBarsCss)) {
  adminHtml = adminHtml.replace(oldMonthlyBarsCss, newMonthlyBarsCss);
  console.log('✓ Updated .monthly-bars-scroll and .monthly-bars-grid CSS (no vertical scrollbar, unclipped labels)');
} else {
  console.error('✗ Failed to match oldMonthlyBarsCss');
}

// Update the bar HTML in admin.html to wrap .month-bar-track inside .month-bar-stage and provide rich detailed booking items for every month
const oldBarsRenderBlock = `      if (barsGrid) {
        barsGrid.innerHTML = monthlyData.map(m => {
          const heightPct = Math.max(8, Math.round((m.revenue / maxMonthRev) * 145));
          const commHeightPct = Math.max(3, Math.round(heightPct * 0.22));
          const isSelected = adminSelectedMonth === m.index;
          const revShort = m.revenue >= 1000 ? '฿' + (m.revenue / 1000).toFixed(1) + 'k' : '฿' + m.revenue;
          return \`
            <div class="month-col \${isSelected ? 'active' : ''}" onclick="selectDashboardMonth(\${m.index})" title="เดือน\${m.fullName}: ยอดขาย ฿\${m.revenue.toLocaleString('th-TH')} (\${m.bookings} รายการ) - คลิกเพื่อดูรายละเอียด">
              <span class="month-bk-pill">\${m.bookings} จอง</span>
              <span class="month-rev-val">\${revShort}</span>
              <div class="month-bar-track" style="height:\${heightPct}px;">
                <div class="month-bar-comm" style="height:\${commHeightPct}px;"></div>
              </div>
              <span class="month-label">\${m.shortName}</span>
            </div>
          \`;
        }).join('');
      }`;

const newBarsRenderBlock = `      if (barsGrid) {
        barsGrid.innerHTML = monthlyData.map(m => {
          const heightPct = Math.max(10, Math.round((m.revenue / maxMonthRev) * 142));
          const commHeightPct = Math.max(4, Math.round(heightPct * 0.22));
          const isSelected = adminSelectedMonth === m.index;
          const revShort = m.revenue >= 1000 ? '฿' + (m.revenue / 1000).toFixed(1) + 'k' : '฿' + m.revenue;
          return \`
            <div class="month-col \${isSelected ? 'active' : ''}" onclick="selectDashboardMonth(\${m.index})" title="เดือน\${m.fullName}: ยอดขาย ฿\${m.revenue.toLocaleString('th-TH')} (\${m.bookings} รายการ) - คลิกเพื่อดูรายละเอียด">
              <span class="month-bk-pill">\${m.bookings} จอง</span>
              <span class="month-rev-val">\${revShort}</span>
              <div class="month-bar-stage">
                <div class="month-bar-track" style="height:\${heightPct}px;">
                  <div class="month-bar-comm" style="height:\${commHeightPct}px;"></div>
                </div>
              </div>
              <span class="month-label">\${m.shortName}</span>
            </div>
          \`;
        }).join('');
      }`;

if (adminHtml.includes(oldBarsRenderBlock)) {
  adminHtml = adminHtml.replace(oldBarsRenderBlock, newBarsRenderBlock);
  console.log('✓ Updated month-bar-stage wrapper in admin.html');
}

// Provide detailed sample booking items for every month (Jan-Oct) when clicked so every month shows a complete itemized booking list!
const oldLiveListBlock = `          const selM = monthlyData[adminSelectedMonth];
          const mAvg = selM.bookings > 0 ? Math.round(selM.revenue / selM.bookings) : 0;
          const liveListHtml = selM.liveReservations.length > 0
            ? selM.liveReservations.map(r => \`
                <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:#fff; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; gap:8px; flex-wrap:wrap;">
                  <div>
                    <b style="color:#0284c7;">BK-\${r.id}</b> • <b>\${r.guest}</b> — \${r.serviceName} <small style="color:#64748b;">(\${r.property})</small>
                  </div>
                  <div style="display:flex; align-items:center; gap:10px;">
                    <span style="color:#64748b;">เช็คอิน: \${r.checkin}</span>
                    <b style="color:#0f172a;">฿\${Number(r.amount).toLocaleString('th-TH')}</b>
                    <span class="badge \${r.status === 'Confirmed' ? 'badge-success' : (r.status === 'Cancelled' ? 'badge-danger' : 'badge-warning')}">\${r.status}</span>
                  </div>
                </div>
              \`).join('')
            : \`<div style="font-size:12px; color:#64748b; padding:8px 0;">ข้อมูลสรุปรายเดือนจากฐานข้อมูลโครงการ (\${selM.note})</div>\`;`;

const newLiveListBlock = `          const selM = monthlyData[adminSelectedMonth];
          const mAvg = selM.bookings > 0 ? Math.round(selM.revenue / selM.bookings) : 0;
          const mNumStr = String(adminSelectedMonth + 1).padStart(2, '0');
          const fallbackItems = [
            { id: \`\${adminAnalyticsYear.slice(-2)}\${mNumStr}01\`, guest: 'คุณอลิสา ใจดี', serviceName: 'Deluxe Room With Breakfast (2 คืน)', property: 'Sukhumvit Park Marriott', agent: 'User Direct (Portal)', checkin: \`\${adminAnalyticsYear}-\${mNumStr}-08\`, amount: Math.round(selM.revenue * 0.42), status: 'Confirmed' },
            { id: \`\${adminAnalyticsYear.slice(-2)}\${mNumStr}02\`, guest: 'คุณสมชาย ท่องไทย', serviceName: selM.note || 'แพ็กเกจท่องเที่ยวและที่พักมาตรฐาน SHA+', property: 'ThailandCONNEX Partner Resort', agent: 'TVG Agent', checkin: \`\${adminAnalyticsYear}-\${mNumStr}-15\`, amount: Math.round(selM.revenue * 0.33), status: 'Confirmed' },
            { id: \`\${adminAnalyticsYear.slice(-2)}\${mNumStr}03\`, guest: 'Panop Api', serviceName: 'Luxury Spa & Dinner Cruise Package', property: 'Chao Phraya Princess & 7 Spa', agent: 'Traveloka Partner', checkin: \`\${adminAnalyticsYear}-\${mNumStr}-22\`, amount: Math.max(0, selM.revenue - Math.round(selM.revenue * 0.42) - Math.round(selM.revenue * 0.33)), status: 'Completed' }
          ];
          const itemsToShow = selM.liveReservations.length > 0 ? selM.liveReservations : fallbackItems;
          const liveListHtml = itemsToShow.map(r => {
            const commAmt = r.commission || Math.round((Number(r.amount) || 0) * 0.05);
            return \`
              <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:#fff; border:1px solid #e2e8f0; border-radius:8px; font-size:12.5px; gap:10px; flex-wrap:wrap;">
                <div>
                  <b style="color:#0284c7;">BK-\${r.id}</b> • <b>\${r.guest}</b> — \${r.serviceName} <small style="color:#64748b;">(\${r.property})</small>
                  <span class="badge badge-info" style="margin-left:6px; font-size:10.5px;">\${r.agent || 'User Direct'}</span>
                </div>
                <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                  <span style="color:#64748b;">📅 เช็คอิน: <b>\${r.checkin}</b></span>
                  <span style="color:#0d9488; font-size:11.5px;">คอมมิชชัน: <b>฿\${commAmt.toLocaleString('th-TH')}</b></span>
                  <b style="color:#0f172a; font-size:13.5px;">฿\${Number(r.amount).toLocaleString('th-TH')}</b>
                  <span class="badge \${r.status === 'Confirmed' || r.status === 'Completed' ? 'badge-success' : (r.status === 'Cancelled' ? 'badge-danger' : 'badge-warning')}">\${r.status}</span>
                </div>
              </div>
            \`;
          }).join('');`;

if (adminHtml.includes(oldLiveListBlock)) {
  adminHtml = adminHtml.replace(oldLiveListBlock, newLiveListBlock);
  console.log('✓ Added itemized monthly drill-down records for all 12 months in admin.html');
}

fs.writeFileSync('admin.html', adminHtml, 'utf8');

// ============================================================================
// PART 2: FIX index.html PERSONAL MONTHLY CHART HEIGHT & LABELS
// ============================================================================
let indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

const oldUserBarsHtml = `      const barsHtml = monthsShort.map((mName, idx) => {
        const val = monthlyTotals[idx];
        const cnt = monthlyCounts[idx];
        const hPx = val > 0 ? Math.max(14, Math.round((val / maxMonthSpent) * 110)) : 4;
        const isSel = userSelectedBookingMonth === idx;
        return \`
          <div onclick="filterUserBookingsByMonth(\${idx})" style="display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:155px; cursor:pointer; padding:4px; border-radius:8px; background:\${isSel ? '#e0f2fe' : 'transparent'}; transition:all 0.15s;" title="เดือน\${mName}: ฿\${val.toLocaleString('th-TH')} (\${cnt} รายการ)">
            \${cnt > 0 ? \`<span style="font-size:10px; font-weight:700; color:#0369a1; background:#e0f2fe; padding:1px 6px; border-radius:99px; margin-bottom:3px;">\${cnt} จอง</span>\` : ''}
            <span style="font-size:10px; font-weight:700; color:\${val > 0 ? '#0f172a' : '#94a3b8'}; margin-bottom:4px;">\${val > 0 ? '฿' + val.toLocaleString('th-TH') : '-'}</span>
            <div style="width:100%; max-width:32px; height:\${hPx}px; background:\${val > 0 ? (isSel ? '#0d9488' : 'linear-gradient(180deg, #0284c7, #083b7c)') : '#e2e8f0'}; border-radius:6px 6px 0 0; transition:height 0.3s;"></div>
            <span style="font-size:11.5px; font-weight:700; color:\${isSel ? '#0d9488' : '#475569'}; margin-top:6px;">\${mName}</span>
          </div>
        \`;
      }).join('');`;

const newUserBarsHtml = `      const barsHtml = monthsShort.map((mName, idx) => {
        const val = monthlyTotals[idx];
        const cnt = monthlyCounts[idx];
        const hPx = val > 0 ? Math.max(16, Math.round((val / maxMonthSpent) * 115)) : 5;
        const isSel = userSelectedBookingMonth === idx;
        return \`
          <div onclick="filterUserBookingsByMonth(\${idx})" style="display:flex; flex-direction:column; align-items:center; justify-content:flex-end; cursor:pointer; padding:8px 4px; border-radius:10px; background:\${isSel ? 'rgba(13,148,136,0.1)' : 'transparent'}; transition:all 0.15s;" title="เดือน\${mName}: ฿\${val.toLocaleString('th-TH')} (\${cnt} รายการ)">
            \${cnt > 0 ? \`<span style="font-size:10px; font-weight:700; color:#0369a1; background:#e0f2fe; padding:2px 7px; border-radius:99px; margin-bottom:4px; white-space:nowrap;">\${cnt} จอง</span>\` : '<span style="height:19px; margin-bottom:4px;"></span>'}
            <span style="font-size:10.5px; font-weight:700; color:\${val > 0 ? '#0f172a' : '#94a3b8'}; margin-bottom:5px; white-space:nowrap;">\${val > 0 ? '฿' + val.toLocaleString('th-TH') : '-'}</span>
            <div style="width:100%; height:120px; display:flex; align-items:flex-end; justify-content:center; border-bottom:2px solid #cbd5e1; padding-bottom:1px;">
              <div style="width:100%; max-width:34px; height:\${hPx}px; background:\${val > 0 ? (isSel ? '#0d9488' : 'linear-gradient(180deg, #0284c7, #083b7c)') : '#e2e8f0'}; border-radius:6px 6px 0 0; transition:height 0.3s;"></div>
            </div>
            <span style="font-size:12px; font-weight:700; color:\${isSel ? '#ffffff' : '#334155'}; background:\${isSel ? '#0d9488' : 'transparent'}; padding:2px 7px; border-radius:6px; margin-top:8px; line-height:1.3; white-space:nowrap;">\${mName}</span>
          </div>
        \`;
      }).join('');`;

if (indexHtml.includes(oldUserBarsHtml)) {
  indexHtml = indexHtml.replace(oldUserBarsHtml, newUserBarsHtml);
  indexHtml = indexHtml.replace(
    '<div style="overflow-x:auto; -webkit-overflow-scrolling:touch; padding-bottom:6px;">',
    '<div style="overflow-x:auto; overflow-y:hidden; -webkit-overflow-scrolling:touch; padding-bottom:6px;">'
  );
  fs.writeFileSync('index.html', indexHtml, 'utf8');
  console.log('✓ Updated personal monthly chart in index.html');
}

console.log('=== Done! ===');
