const fs = require('fs');

console.log('=== Building 5-Chart Booking & Monthly Revenue Analytics Dashboard in admin.html & index.html ===');

// ============================================================================
// PART 1: UPDATE admin.html WITH 5-CHART ANALYTICS SUITE
// ============================================================================
let adminHtml = fs.readFileSync('admin.html', 'utf8').replace(/\r\n/g, '\n');

// 1A. Add Analytics Dashboard CSS to admin.html before </style>
const adminAnalyticsCss = `
    /* ===================================================================== */
    /* 5-CHART BOOKING & MONTHLY REVENUE ANALYTICS DASHBOARD STYLES          */
    /* ===================================================================== */
    .analytics-suite-wrap {
      margin-bottom: 28px;
    }
    .analytics-header-bar {
      background: linear-gradient(135deg, #0b2240 0%, #083b7c 60%, #0284c7 100%);
      color: #ffffff;
      border-radius: 14px;
      padding: 20px 24px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      box-shadow: 0 8px 24px rgba(8, 59, 124, 0.16);
    }
    .analytics-header-title h3 {
      margin: 0 0 4px;
      font-size: 18px;
      font-weight: 700;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .analytics-header-title p {
      margin: 0;
      font-size: 12.5px;
      color: #bae6fd;
    }
    .analytics-header-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .analytics-year-btn {
      background: rgba(255, 255, 255, 0.14);
      color: #e0f2fe;
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .analytics-year-btn:hover {
      background: rgba(255, 255, 255, 0.24);
    }
    .analytics-year-btn.active {
      background: #ffffff;
      color: #083b7c;
      border-color: #ffffff;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .analytics-kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }
    .analytics-kpi-card {
      background: #ffffff;
      border: 1px solid var(--border-line);
      border-radius: 12px;
      padding: 18px 20px;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.03);
      position: relative;
      overflow: hidden;
    }
    .analytics-kpi-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: #0284c7;
    }
    .analytics-kpi-card.teal::before { background: #0d9488; }
    .analytics-kpi-card.amber::before { background: #f59e0b; }
    .analytics-kpi-card.purple::before { background: #8b5cf6; }
    .analytics-kpi-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #64748b;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .analytics-kpi-val {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 4px;
      line-height: 1.2;
    }
    .analytics-kpi-sub {
      font-size: 11.5px;
      color: #059669;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Chart 1: Monthly Combo Bar & Line Chart */
    .monthly-chart-card {
      background: #ffffff;
      border: 1px solid var(--border-line);
      border-radius: 14px;
      padding: 22px 24px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
    }
    .chart-section-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 18px;
    }
    .chart-section-head h4 {
      margin: 0 0 4px;
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .chart-section-head p {
      margin: 0;
      font-size: 12px;
      color: #64748b;
    }
    .chart-legend-inline {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
      font-size: 12px;
      color: #475569;
      font-weight: 600;
    }
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 3px;
      display: inline-block;
      margin-right: 5px;
    }
    .monthly-bars-scroll {
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
    }
    .month-drilldown-box {
      margin-top: 16px;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 16px 18px;
    }

    /* Chart 4: Status Breakdown Cards */
    .status-breakdown-card {
      background: #ffffff;
      border: 1px solid var(--border-line);
      border-radius: 14px;
      padding: 20px 24px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
    }
    .status-stacked-bar {
      height: 14px;
      border-radius: 999px;
      background: #f1f5f9;
      display: flex;
      overflow: hidden;
      margin: 14px 0 18px;
      gap: 2px;
    }
    .status-seg {
      height: 100%;
      transition: width 0.35s ease;
    }
    .status-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }
    .status-stat-item {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      transition: all 0.15s ease;
      background: #ffffff;
    }
    .status-stat-item:hover, .status-stat-item.active {
      border-color: #0284c7;
      background: #f0f9ff;
      transform: translateY(-1px);
    }

    /* Charts 2 & 3 Two-Column Row */
    .analytics-2col-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    .analytics-panel-card {
      background: #ffffff;
      border: 1px solid var(--border-line);
      border-radius: 14px;
      padding: 20px 22px;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
    }
    .donut-layout {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 14px;
    }
    .donut-svg-wrap {
      position: relative;
      width: 175px;
      height: 175px;
      flex-shrink: 0;
    }
    .donut-center-label {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      pointer-events: none;
    }
    .donut-legend-list {
      flex: 1;
      min-width: 210px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .donut-legend-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 10px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #f1f5f9;
      font-size: 12.5px;
    }
    .horiz-bar-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 14px;
    }
    .horiz-bar-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .horiz-bar-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12.5px;
      gap: 8px;
      flex-wrap: wrap;
    }
    .horiz-bar-bg {
      height: 10px;
      background: #f1f5f9;
      border-radius: 999px;
      overflow: hidden;
    }
    .horiz-bar-fill {
      height: 100%;
      border-radius: 999px;
      transition: width 0.35s ease;
    }

    @media (max-width: 640px) {
      .analytics-header-bar {
        padding: 16px;
      }
      .monthly-chart-card, .status-breakdown-card, .analytics-panel-card {
        padding: 16px 14px;
      }
      .analytics-2col-grid {
        grid-template-columns: 1fr;
      }
    }
`;

adminHtml = adminHtml.replace('</style>', adminAnalyticsCss + '\n</style>');

// 1B. Inject the 5-Chart Analytics Suite HTML inside #view-dashboard right before <div class="table-card"> (LASTEST BOOKING)
const dashTableAnchor = `          <div class="table-card">
            <div class="table-card-head"><span>LASTEST BOOKING</span></div>`;

const dashAnalyticsSuiteHtml = `          <!-- =================================================================== -->
          <!-- 5-CHART BOOKING & MONTHLY REVENUE ANALYTICS SUITE                   -->
          <!-- =================================================================== -->
          <div class="analytics-suite-wrap" id="admin-analytics-suite">
            <!-- Header & Mode Switcher -->
            <div class="analytics-header-bar">
              <div class="analytics-header-title">
                <h3>
                  <span>📊 แดชบอร์ดวิเคราะห์การจองเชิงลึก & ยอดเงินรายเดือน</span>
                  <span style="font-size:11px; background:#10b981; color:#fff; padding:2px 9px; border-radius:999px; font-weight:700;">Live Analytics</span>
                </h3>
                <p>วิเคราะห์ยอดขายรายเดือน (ม.ค. – ธ.ค.), สัดส่วนหมวดหมู่บริการ, ช่องทาง OTA, สถานะการจอง และที่พักยอดนิยมแบบ Real-time</p>
              </div>
              <div class="analytics-header-controls">
                <button type="button" class="analytics-year-btn active" id="btn-analytics-2026" onclick="setAdminAnalyticsYear('2026')">
                  📅 ปี 2026 (ปัจจุบัน + Live Sync)
                </button>
                <button type="button" class="analytics-year-btn" id="btn-analytics-2023" onclick="setAdminAnalyticsYear('2023')">
                  📑 ปี 2023 (ข้อมูลรายงานโครงการ)
                </button>
                <button type="button" class="analytics-year-btn" onclick="exportMonthlyAnalyticsCSV()" style="background:rgba(16,185,129,0.25); border-color:#34d399; color:#ecfdf5;">
                  📥 Export รายงานรายเดือน CSV
                </button>
              </div>
            </div>

            <!-- 4 Executive KPI Summary Cards -->
            <div class="analytics-kpi-grid">
              <div class="analytics-kpi-card">
                <div class="analytics-kpi-top">
                  <span>💰 ยอดเงินการจองรวมทั้งปี (Gross Revenue)</span>
                  <span>THB</span>
                </div>
                <div class="analytics-kpi-val" id="an-kpi-annual-rev">฿0.00</div>
                <div class="analytics-kpi-sub" id="an-kpi-annual-rev-sub">▲ +22.4% เทียบจากช่วงเดียวกัน</div>
              </div>
              <div class="analytics-kpi-card teal">
                <div class="analytics-kpi-top">
                  <span>🏦 ค่าคอมมิชชันแพลตฟอร์มรวม (5% Fee)</span>
                  <span>Net Revenue</span>
                </div>
                <div class="analytics-kpi-val" id="an-kpi-annual-comm">฿0.00</div>
                <div class="analytics-kpi-sub" id="an-kpi-annual-token">🪙 แจกโทเคนสะสม 0 TCP</div>
              </div>
              <div class="analytics-kpi-card amber">
                <div class="analytics-kpi-top">
                  <span>🧾 ยอดเฉลี่ยต่อคำสั่งจอง (Avg. Order Value)</span>
                  <span>AOV</span>
                </div>
                <div class="analytics-kpi-val" id="an-kpi-aov">฿0.00</div>
                <div class="analytics-kpi-sub" id="an-kpi-total-bk">จากทั้งหมด 0 รายการจอง</div>
              </div>
              <div class="analytics-kpi-card purple">
                <div class="analytics-kpi-top">
                  <span>✅ อัตราการจองสำเร็จ (Confirmation Rate)</span>
                  <span>Conversion</span>
                </div>
                <div class="analytics-kpi-val" id="an-kpi-conf-rate">0%</div>
                <div class="analytics-kpi-sub" id="an-kpi-peak-month">เดือนที่ยอดสูงสุด: พ.ย.</div>
              </div>
            </div>

            <!-- CHART 1: Monthly Revenue & Booking Count Combo Bar Chart (Jan - Dec) -->
            <div class="monthly-chart-card">
              <div class="chart-section-head">
                <div>
                  <h4>1. 📈 กราฟยอดเงินรายได้และจำนวนการจองรายเดือน (ม.ค. – ธ.ค.)</h4>
                  <p>คลิกที่แท่งเดือนใดก็ได้เพื่อเจาะลึกดูรายละเอียดการจองและยอดเงินของเดือนนั้นๆ (Interactive Monthly Drill-down)</p>
                </div>
                <div class="chart-legend-inline">
                  <span><i class="legend-dot" style="background:#0284c7;"></i>ยอดขายรายเดือน (฿)</span>
                  <span><i class="legend-dot" style="background:#38bdf8;"></i>ค่าคอมมิชชัน (5%)</span>
                  <span><i class="legend-dot" style="background:#ea580c; border-radius:50%;"></i>จำนวนการจอง (รายการ)</span>
                  <button type="button" class="btn-secondary" id="btn-reset-month-filter" style="display:none; padding:4px 10px; font-size:11.5px; color:#0284c7; border-color:#7dd3fc; background:#f0f9ff;" onclick="selectDashboardMonth('all')">
                    ✕ แสดงครบทุกเดือน
                  </button>
                </div>
              </div>

              <div class="monthly-bars-scroll">
                <div class="monthly-bars-grid" id="admin-monthly-bars-grid">
                  <!-- Populated dynamically by renderAdminAnalyticsDashboard() -->
                </div>
              </div>

              <!-- Monthly Drill-down Detail Box -->
              <div class="month-drilldown-box" id="admin-month-drilldown-box">
                <!-- Populated dynamically -->
              </div>
            </div>

            <!-- CHART 4: Booking Status Distribution (4 Status Cards + Stacked Progress Bar) -->
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
            </div>

            <!-- CHARTS 2 & 3: Category Donut Chart + Sales Channel / OTA Ranked Bar Chart -->
            <div class="analytics-2col-grid">
              <!-- CHART 2: Donut Chart by Service Category -->
              <div class="analytics-panel-card">
                <div class="chart-section-head" style="margin-bottom:6px;">
                  <div>
                    <h4>3. 🍩 สัดส่วนยอดจองและรายได้ตามหมวดหมู่บริการ</h4>
                    <p>เปรียบเทียบสัดส่วนรายได้จากที่พัก แหล่งท่องเที่ยว สปา และทัวร์</p>
                  </div>
                </div>
                <div class="donut-layout" id="admin-category-donut-wrap">
                  <!-- Populated dynamically -->
                </div>
              </div>

              <!-- CHART 3: Horizontal Bar Chart by Sales Channel / OTA -->
              <div class="analytics-panel-card">
                <div class="chart-section-head" style="margin-bottom:6px;">
                  <div>
                    <h4>4. 📊 ยอดจองและรายได้แยกตามช่องทางการขาย (OTA & Direct)</h4>
                    <p>เปรียบเทียบการจองตรงผ่านหน้าเว็บ (User Direct) กับตัวแทนจำหน่าย OTA</p>
                  </div>
                </div>
                <div class="horiz-bar-list" id="admin-channel-bars-wrap">
                  <!-- Populated dynamically -->
                </div>
              </div>
            </div>

            <!-- CHART 5: Top Performing Properties & Services Leaderboard -->
            <div class="analytics-panel-card" style="margin-bottom:20px;">
              <div class="chart-section-head" style="margin-bottom:10px;">
                <div>
                  <h4>5. 📍 อันดับผู้ประกอบการและบริการที่มียอดจองสูงสุด (Top Performing Properties & Services)</h4>
                  <p>จัดอันดับตามยอดขายรวม (THB) จำนวนคำสั่งจอง และค่าคอมมิชชันที่สร้างให้แพลตฟอร์ม</p>
                </div>
              </div>
              <div class="horiz-bar-list" id="admin-top-properties-wrap">
                <!-- Populated dynamically -->
              </div>
            </div>
          </div>

          <div class="table-card">
            <div class="table-card-head">
              <span id="dash-latest-table-title">LASTEST BOOKING (รายการจองล่าสุดทั้งหมด)</span>
              <span id="dash-latest-filter-badge" style="font-size:12px; font-weight:600; color:#0284c7;"></span>
            </div>`;

if (adminHtml.includes(dashTableAnchor)) {
  adminHtml = adminHtml.replace(dashTableAnchor, dashAnalyticsSuiteHtml);
  console.log('✓ Injected 5-Chart Analytics Suite HTML into #view-dashboard in admin.html');
} else {
  console.error('✗ Failed to find dashTableAnchor in admin.html');
}

// 1C. Add JS logic for the 5-Chart Analytics Suite in admin.html and hook into renderAdminFromStore()
const adminAnalyticsJs = `
    // ========================================================
    // 8. 5-CHART BOOKING & MONTHLY REVENUE ANALYTICS ENGINE
    // ========================================================
    let adminAnalyticsYear = '2026';
    let adminSelectedMonth = 'all'; // 'all' or 0..11
    let adminSelectedStatusFilter = 'all';

    const THAI_MONTHS_SHORT = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const THAI_MONTHS_FULL = [
      'มกราคม (Jan)', 'กุมภาพันธ์ (Feb)', 'มีนาคม (Mar)', 'เมษายน (Apr)',
      'พฤษภาคม (May)', 'มิถุนายน (Jun)', 'กรกฎาคม (Jul)', 'สิงหาคม (Aug)',
      'กันยายน (Sep)', 'ตุลาคม (Oct)', 'พฤศจิกายน (Nov)', 'ธันวาคม (Dec)'
    ];

    // Baseline monthly platform performance (combines with live reservations in TCStore)
    const BASE_MONTHLY_STATS = {
      '2026': [
        { rev: 18500, bk: 5, sample: 'จองที่พักกรุงเทพฯ & ตั๋วกิจกรรมต้นปี' },
        { rev: 24200, bk: 7, sample: 'ทัวร์เชียงใหม่ & ล่องเรือเจ้าพระยา' },
        { rev: 19800, bk: 6, sample: 'ที่พักพัทยา & สปาเวลเนส' },
        { rev: 32500, bk: 9, sample: 'เทศกาลสงกรานต์ รีสอร์ทหัวหิน & ภูเก็ต' },
        { rev: 15400, bk: 4, sample: 'โรงแรมบูติกเชียงใหม่ & รถรับส่งสนามบิน' },
        { rev: 17900, bk: 5, sample: 'แพ็กเกจดำน้ำกระบี่ & ที่พักริมทะเล' },
        { rev: 22600, bk: 6, sample: 'ทริปครอบครัวเกาะสมุย & บุฟเฟต์ตึกใบหยก' },
        { rev: 26100, bk: 7, sample: 'วันหยุดวันแม่ ล่องเรือดินเนอร์ & สปา' },
        { rev: 16800, bk: 5, sample: 'สัมมนา MICE & โรงแรมสุขุมวิท' },
        { rev: 29400, bk: 8, sample: 'ช่วงปิดเทอม ตุลาคม ที่พักภูเก็ต & พัทยา' },
        { rev: 0, bk: 0, sample: 'คำนวณสดจากรายการจองจริงในระบบ (Live Store)' },
        { rev: 0, bk: 0, sample: 'คำนวณสดจากรายการจองล่วงหน้าปลายปี (High Season)' }
      ],
      '2023': [
        { rev: 42800, bk: 34, sample: 'ช่วงเปิดตัวแพลตฟอร์ม ThailandCONNEX (ม.ค. 2023)' },
        { rev: 53630, bk: 46, sample: 'ยอดจอง B2B/B2C ตามรายงานสมบูรณ์ depa (ก.พ. 2023)' },
        { rev: 38900, bk: 29, sample: 'ขยายเครือข่ายผู้ประกอบการ 8 หมวดหมู่' },
        { rev: 49200, bk: 38, sample: 'แคมเปญท่องเที่ยวสงกรานต์ Travel Token' },
        { rev: 31500, bk: 24, sample: 'เชื่อมโยงระบบ OTA & Channel Manager' },
        { rev: 28400, bk: 21, sample: 'แพ็กเกจท่องเที่ยวชุมชน & Wellness' },
        { rev: 35100, bk: 27, sample: 'แคมเปญ Green Season ท่องเที่ยวไทย' },
        { rev: 39800, bk: 31, sample: 'แพ็กเกจครอบครัวและบัตรเข้าชมสถานที่' },
        { rev: 33200, bk: 25, sample: 'การจัดสรรโควตา Allotment โรงแรมคู่ค้า' },
        { rev: 45600, bk: 35, sample: 'ต้อนรับฤดูกาลท่องเที่ยว High Season' },
        { rev: 58900, bk: 44, sample: 'เทศกาลลอยกระทงและท่องเที่ยวภาคเหนือ' },
        { rev: 68400, bk: 52, sample: 'เทศกาลส่งท้ายปีเก่าต้อนรับปีใหม่' }
      ]
    };

    function detectReservationMonthIndex(r) {
      const dateStr = (r.checkin || r.bookedOn || '').trim();
      const mMatch = dateStr.match(/\\d{4}-(\\d{2})/);
      if (mMatch) {
        const m = parseInt(mMatch[1], 10);
        if (m >= 1 && m <= 12) return m - 1;
      }
      return 10; // Default Nov (index 10)
    }

    function detectServiceCategory(r) {
      const text = ((r.serviceName || '') + ' ' + (r.property || '')).toLowerCase();
      if (text.includes('spa') || text.includes('สปา') || text.includes('นวด') || text.includes('wellness')) {
        return { key: 'wellness', label: '💆 สุขภาพและสปา (Wellness)', color: '#8b5cf6' };
      }
      if (text.includes('cruise') || text.includes('ล่องเรือ') || text.includes('sealife') || text.includes('ใบหยก') || text.includes('balcony') || text.includes('บัตร')) {
        return { key: 'attraction', label: '🎡 แหล่งท่องเที่ยว & ล่องเรือ', color: '#0d9488' };
      }
      if (text.includes('tour') || text.includes('ทัวร์') || text.includes('package') || text.includes('ดำน้ำ')) {
        return { key: 'tour', label: '🧭 แพ็กเกจทัวร์ & กิจกรรม', color: '#f59e0b' };
      }
      return { key: 'accommodation', label: '🏨 โรงแรมและที่พัก (Hotel)', color: '#0284c7' };
    }

    function setAdminAnalyticsYear(yr) {
      adminAnalyticsYear = yr;
      const b26 = document.getElementById('btn-analytics-2026');
      const b23 = document.getElementById('btn-analytics-2023');
      if (b26) b26.classList.toggle('active', yr === '2026');
      if (b23) b23.classList.toggle('active', yr === '2023');
      renderAdminAnalyticsDashboard();
    }

    function selectDashboardMonth(mIdx) {
      if (mIdx === 'all' || adminSelectedMonth === mIdx) {
        adminSelectedMonth = 'all';
      } else {
        adminSelectedMonth = mIdx;
      }
      renderAdminAnalyticsDashboard();
      renderDashboardBookingsTableWithPagination();
    }

    function filterDashboardByStatus(statusKey) {
      if (statusKey === 'all' || adminSelectedStatusFilter === statusKey) {
        adminSelectedStatusFilter = 'all';
      } else {
        adminSelectedStatusFilter = statusKey;
      }
      renderAdminAnalyticsDashboard();
      renderDashboardBookingsTableWithPagination();
    }

    function renderAdminAnalyticsDashboard(reservationsInput) {
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

      // 1. Build 12-Month Data combining baseline + live reservations
      const baseArr = BASE_MONTHLY_STATS[adminAnalyticsYear] || BASE_MONTHLY_STATS['2026'];
      const partnerScale = isPartner ? 0.35 : 1;

      const monthlyData = THAI_MONTHS_SHORT.map((mShort, idx) => {
        const baseRev = Math.round((baseArr[idx] ? baseArr[idx].rev : 0) * partnerScale);
        const baseBk = Math.round((baseArr[idx] ? baseArr[idx].bk : 0) * partnerScale);
        const matchingRes = reservations.filter(r => detectReservationMonthIndex(r) === idx && r.status !== 'Cancelled');
        const allMatchingRes = reservations.filter(r => detectReservationMonthIndex(r) === idx);
        const liveRev = (adminAnalyticsYear === '2026')
          ? matchingRes.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0)
          : 0;
        const liveBk = (adminAnalyticsYear === '2026') ? matchingRes.length : 0;

        const totalRev = baseRev + liveRev;
        const totalBk = baseBk + liveBk;
        const comm = Math.round(totalRev * 0.05);

        return {
          index: idx,
          shortName: mShort,
          fullName: THAI_MONTHS_FULL[idx],
          revenue: totalRev,
          commission: comm,
          bookings: totalBk,
          liveReservations: allMatchingRes,
          note: baseArr[idx] ? baseArr[idx].sample : ''
        };
      });

      const annualRev = monthlyData.reduce((s, m) => s + m.revenue, 0);
      const annualComm = monthlyData.reduce((s, m) => s + m.commission, 0);
      const annualBk = monthlyData.reduce((s, m) => s + m.bookings, 0);
      const aov = annualBk > 0 ? Math.round(annualRev / annualBk) : 0;
      const peakMonthObj = [...monthlyData].sort((a, b) => b.revenue - a.revenue)[0] || monthlyData[10];

      // Status counts from live reservations
      const confList = reservations.filter(r => r.status === 'Confirmed');
      const pendList = reservations.filter(r => r.status === 'PendingConfirm');
      const compList = reservations.filter(r => r.status === 'Completed');
      const cancList = reservations.filter(r => r.status === 'Cancelled');
      const confRate = reservations.length > 0
        ? Math.round(((confList.length + compList.length) / reservations.length) * 100)
        : 100;

      // Update 4 Executive KPI Cards
      const elAnnRev = document.getElementById('an-kpi-annual-rev');
      const elAnnComm = document.getElementById('an-kpi-annual-comm');
      const elAnnToken = document.getElementById('an-kpi-annual-token');
      const elAov = document.getElementById('an-kpi-aov');
      const elTotalBk = document.getElementById('an-kpi-total-bk');
      const elConfRate = document.getElementById('an-kpi-conf-rate');
      const elPeakMonth = document.getElementById('an-kpi-peak-month');

      if (elAnnRev) elAnnRev.textContent = '฿' + annualRev.toLocaleString('th-TH');
      if (elAnnComm) elAnnComm.textContent = '฿' + annualComm.toLocaleString('th-TH');
      if (elAnnToken) elAnnToken.textContent = '🪙 แจกโทเคนสะสม ' + annualComm.toLocaleString('th-TH') + ' TCP';
      if (elAov) elAov.textContent = '฿' + aov.toLocaleString('th-TH');
      if (elTotalBk) elTotalBk.textContent = 'จากทั้งหมด ' + annualBk.toLocaleString('th-TH') + ' รายการจองทั้งปี';
      if (elConfRate) elConfRate.textContent = confRate + '%';
      if (elPeakMonth) elPeakMonth.textContent = 'เดือนที่ยอดสูงสุด: ' + peakMonthObj.fullName + ' (฿' + peakMonthObj.revenue.toLocaleString('th-TH') + ')';

      // Render Chart 1: 12-Month Bars
      const maxMonthRev = Math.max(...monthlyData.map(m => m.revenue), 10000);
      const barsGrid = document.getElementById('admin-monthly-bars-grid');
      const resetMonthBtn = document.getElementById('btn-reset-month-filter');
      if (resetMonthBtn) resetMonthBtn.style.display = (adminSelectedMonth !== 'all') ? 'inline-flex' : 'none';

      if (barsGrid) {
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
      }

      // Render Monthly Drill-down Box
      const drillBox = document.getElementById('admin-month-drilldown-box');
      if (drillBox) {
        if (adminSelectedMonth === 'all') {
          const novData = monthlyData[10];
          const decData = monthlyData[11];
          drillBox.innerHTML = \`
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div>
                <div style="font-size:13.5px; font-weight:700; color:#0f172a;">
                  📌 สรุปภาพรวมรายเดือนทั้งปี \${adminAnalyticsYear} (คลิกที่แท่งกราฟแต่ละเดือนด้านบนเพื่อเจาะลึกรายการจองของเดือนนั้น)
                </div>
                <div style="font-size:12px; color:#475569; margin-top:4px;">
                  • ยอดจองสดในระบบเดือน <b>พ.ย. (\${novData.bookings} รายการ = ฿\${novData.revenue.toLocaleString('th-TH')})</b> และ <b>ธ.ค. (\${decData.bookings} รายการ = ฿\${decData.revenue.toLocaleString('th-TH')})</b> ซิงค์อัตโนมัติจากหน้า User Portal
                </div>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" class="btn-secondary" style="font-size:12px; padding:6px 12px;" onclick="selectDashboardMonth(10)">🔍 ดูเดือน พ.ย. (Nov)</button>
                <button type="button" class="btn-secondary" style="font-size:12px; padding:6px 12px;" onclick="selectDashboardMonth(11)">🔍 ดูเดือน ธ.ค. (Dec)</button>
              </div>
            </div>
          \`;
        } else {
          const selM = monthlyData[adminSelectedMonth];
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
            : \`<div style="font-size:12px; color:#64748b; padding:8px 0;">ข้อมูลสรุปรายเดือนจากฐานข้อมูลโครงการ (\${selM.note})</div>\`;

          drillBox.innerHTML = \`
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
              <div>
                <span style="font-size:11px; font-weight:700; color:#0d9488; text-transform:uppercase;">Monthly Drill-Down Analysis</span>
                <h4 style="margin:2px 0 0; font-size:15px; color:#0f172a;">📅 รายละเอียดประจำเดือน \${selM.fullName} ปี \${adminAnalyticsYear}</h4>
              </div>
              <div style="display:flex; gap:14px; flex-wrap:wrap; font-size:12.5px;">
                <span>ยอดขายรวม: <b style="color:#0284c7;">฿\${selM.revenue.toLocaleString('th-TH')}</b></span>
                <span>ค่าคอมมิชชัน (5%): <b style="color:#0d9488;">฿\${selM.commission.toLocaleString('th-TH')}</b></span>
                <span>จำนวนการจอง: <b style="color:#ea580c;">\${selM.bookings} รายการ</b></span>
                <span>เฉลี่ยต่อบิล: <b>฿\${mAvg.toLocaleString('th-TH')}</b></span>
              </div>
            </div>
            <div style="display:flex; flex-direction:column; gap:6px;">
              \${liveListHtml}
            </div>
          \`;
        }
      }

      // Render Chart 4: Status Breakdown
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
      }

      // Render Chart 2: Category Donut Chart
      const catMap = {
        accommodation: { label: '🏨 โรงแรมและที่พัก', color: '#0284c7', rev: 0, count: 0 },
        attraction: { label: '🎡 แหล่งท่องเที่ยว & ล่องเรือ', color: '#0d9488', rev: 0, count: 0 },
        wellness: { label: '💆 สุขภาพและสปา', color: '#8b5cf6', rev: 0, count: 0 },
        tour: { label: '🧭 แพ็กเกจทัวร์ & กิจกรรม', color: '#f59e0b', rev: 0, count: 0 }
      };

      reservations.forEach(r => {
        const c = detectServiceCategory(r);
        if (catMap[c.key]) {
          catMap[c.key].rev += (parseFloat(r.amount) || 0);
          catMap[c.key].count += 1;
        }
      });

      const catArr = Object.values(catMap);
      const totalCatRev = Math.max(catArr.reduce((s, c) => s + c.rev, 0), 1);
      let cumulativePct = 0;
      const radius = 64;
      const circumference = 2 * Math.PI * radius;

      const svgCircles = catArr.map(c => {
        const pct = c.rev / totalCatRev;
        const dash = pct * circumference;
        const offset = -cumulativePct * circumference;
        cumulativePct += pct;
        return \`<circle cx="87.5" cy="87.5" r="\${radius}" fill="transparent" stroke="\${c.color}" stroke-width="24" stroke-dasharray="\${dash} \${circumference}" stroke-dashoffset="\${offset}" transform="rotate(-90 87.5 87.5)"/>\`;
      }).join('');

      const donutWrap = document.getElementById('admin-category-donut-wrap');
      if (donutWrap) {
        donutWrap.innerHTML = \`
          <div class="donut-svg-wrap">
            <svg width="175" height="175" viewBox="0 0 175 175">
              <circle cx="87.5" cy="87.5" r="\${radius}" fill="transparent" stroke="#f1f5f9" stroke-width="24"/>
              \${svgCircles}
            </svg>
            <div class="donut-center-label">
              <span style="font-size:10.5px; color:#64748b; font-weight:600;">ยอดจองรวม</span>
              <strong style="font-size:15px; color:#0f172a;">฿\${totalCatRev.toLocaleString('th-TH')}</strong>
              <span style="font-size:10.5px; color:#0284c7; font-weight:700;">\${reservations.length} รายการ</span>
            </div>
          </div>
          <div class="donut-legend-list">
            \${catArr.map(c => {
              const pct = Math.round((c.rev / totalCatRev) * 100);
              return \`
                <div class="donut-legend-item">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="width:10px; height:10px; border-radius:50%; background:\${c.color}; display:inline-block;"></span>
                    <div>
                      <div style="font-weight:700; color:#1e293b;">\${c.label}</div>
                      <div style="font-size:11px; color:#64748b;">\${c.count} รายการจอง</div>
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <div style="font-weight:800; color:#0f172a;">฿\${c.rev.toLocaleString('th-TH')}</div>
                    <div style="font-size:11px; font-weight:700; color:\${c.color};">\${pct}%</div>
                  </div>
                </div>
              \`;
            }).join('')}
          </div>
        \`;
      }

      // Render Chart 3: Sales Channel / OTA Performance
      const chanMap = {};
      reservations.forEach(r => {
        const ag = r.agent || 'User Direct (Portal)';
        if (!chanMap[ag]) chanMap[ag] = { name: ag, count: 0, rev: 0, comm: 0 };
        chanMap[ag].count += 1;
        chanMap[ag].rev += (parseFloat(r.amount) || 0);
        chanMap[ag].comm += (parseFloat(r.commission) || Math.round((parseFloat(r.amount) || 0) * 0.05));
      });
      const chanArr = Object.values(chanMap).sort((a, b) => b.rev - a.rev);
      const maxChanRev = Math.max(...chanArr.map(c => c.rev), 1);
      const chanColors = ['#0284c7', '#0d9488', '#8b5cf6', '#f59e0b', '#ec4899'];

      const chanWrap = document.getElementById('admin-channel-bars-wrap');
      if (chanWrap) {
        chanWrap.innerHTML = chanArr.map((c, idx) => {
          const widthPct = Math.max(6, Math.round((c.rev / maxChanRev) * 100));
          const sharePct = Math.round((c.rev / totalCatRev) * 100);
          const col = chanColors[idx % chanColors.length];
          return \`
            <div class="horiz-bar-item">
              <div class="horiz-bar-top">
                <div>
                  <b style="color:#0f172a;">\${c.name}</b>
                  <span class="badge badge-info" style="margin-left:6px;">\${c.count} จอง (\${sharePct}%)</span>
                </div>
                <div style="text-align:right;">
                  <b style="color:\${col};">฿\${c.rev.toLocaleString('th-TH')}</b>
                  <small style="color:#64748b; margin-left:4px;">(คอมมิชชัน ฿\${c.comm.toLocaleString('th-TH')})</small>
                </div>
              </div>
              <div class="horiz-bar-bg">
                <div class="horiz-bar-fill" style="width:\${widthPct}%; background:\${col};"></div>
              </div>
            </div>
          \`;
        }).join('');
      }

      // Render Chart 5: Top Performing Properties Leaderboard
      const propMap = {};
      reservations.forEach(r => {
        const key = r.property || 'Partner Property';
        if (!propMap[key]) propMap[key] = { property: key, service: r.serviceName || '', count: 0, rev: 0, comm: 0 };
        propMap[key].count += 1;
        propMap[key].rev += (parseFloat(r.amount) || 0);
        propMap[key].comm += (parseFloat(r.commission) || Math.round((parseFloat(r.amount) || 0) * 0.05));
      });
      const propArr = Object.values(propMap).sort((a, b) => b.rev - a.rev);
      const maxPropRev = Math.max(...propArr.map(p => p.rev), 1);

      const topPropWrap = document.getElementById('admin-top-properties-wrap');
      if (topPropWrap) {
        topPropWrap.innerHTML = propArr.map((p, idx) => {
          const widthPct = Math.max(6, Math.round((p.rev / maxPropRev) * 100));
          return \`
            <div class="horiz-bar-item">
              <div class="horiz-bar-top">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="width:24px; height:24px; border-radius:6px; background:\${idx < 3 ? '#0284c7' : '#e2e8f0'}; color:\${idx < 3 ? '#fff' : '#475569'}; font-weight:800; font-size:11.5px; display:inline-grid; place-items:center;">#\${idx + 1}</span>
                  <div>
                    <b style="color:#0f172a;">\${p.property}</b>
                    <small style="color:#64748b; display:block;">\${p.service}</small>
                  </div>
                </div>
                <div style="text-align:right;">
                  <span class="badge badge-success" style="margin-right:6px;">\${p.count} รายการจอง</span>
                  <b style="font-size:14px; color:#0f172a;">฿\${p.rev.toLocaleString('th-TH')}</b>
                  <small style="color:#0d9488; display:block; font-weight:600;">ค่าธรรมเนียมแพลตฟอร์ม: ฿\${p.comm.toLocaleString('th-TH')}</small>
                </div>
              </div>
              <div class="horiz-bar-bg">
                <div class="horiz-bar-fill" style="width:\${widthPct}%; background:linear-gradient(90deg, #0284c7, #0d9488);"></div>
              </div>
            </div>
          \`;
        }).join('');
      }
    }

    function exportMonthlyAnalyticsCSV() {
      const baseArr = BASE_MONTHLY_STATS[adminAnalyticsYear] || BASE_MONTHLY_STATS['2026'];
      const storeState = (typeof TCStore !== 'undefined') ? TCStore.getState() : {};
      const reservations = storeState.reservations || [];

      const headers = ['Month_No', 'Month_Name', 'Year', 'Total_Bookings', 'Gross_Revenue_THB', 'Platform_Commission_5Pct_THB'];
      const rows = THAI_MONTHS_FULL.map((mFull, idx) => {
        const baseRev = baseArr[idx] ? baseArr[idx].rev : 0;
        const baseBk = baseArr[idx] ? baseArr[idx].bk : 0;
        const matchingRes = reservations.filter(r => detectReservationMonthIndex(r) === idx && r.status !== 'Cancelled');
        const liveRev = (adminAnalyticsYear === '2026') ? matchingRes.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0) : 0;
        const liveBk = (adminAnalyticsYear === '2026') ? matchingRes.length : 0;
        const totRev = baseRev + liveRev;
        const totBk = baseBk + liveBk;
        return [idx + 1, \`"\${mFull}"\`, adminAnalyticsYear, totBk, totRev, Math.round(totRev * 0.05)];
      });

      const bom = '\\uFEFF';
      const content = bom + [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`ThailandConnex_Monthly_Revenue_Report_\${adminAnalyticsYear}.csv\`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('📥 ดาวน์โหลดรายงานยอดขายรายเดือน CSV เรียบร้อยแล้ว');
    }
`;

// Inject adminAnalyticsJs right before document.addEventListener('DOMContentLoaded' in admin.html
adminHtml = adminHtml.replace(
  "    document.addEventListener('DOMContentLoaded', () => {",
  adminAnalyticsJs + "\n    document.addEventListener('DOMContentLoaded', () => {"
);

// Also update renderAdminFromStore in admin.html to call renderAdminAnalyticsDashboard(reservations) and update Today Revenue header
adminHtml = adminHtml.replace(
  "      // 7. Render Dashboard Latest Bookings Table (Paginated 10 items per page)\n      renderDashboardBookingsTableWithPagination(reservations);",
  "      // 6.5 Render 5-Chart Booking & Monthly Revenue Analytics Dashboard\n      renderAdminAnalyticsDashboard(reservations);\n\n      // 7. Render Dashboard Latest Bookings Table (Paginated 10 items per page)\n      renderDashboardBookingsTableWithPagination(reservations);"
);

// Update renderDashboardBookingsTableWithPagination to respect adminSelectedMonth & adminSelectedStatusFilter
const oldDashTableFilter = `      let dataToUse = dashBkMasterList;
      if (isPartner) {
        dataToUse = dashBkMasterList.filter(r => {
          const p = (r.property || '').toLowerCase();
          const s = (r.serviceName || '').toLowerCase();
          const a = (r.agent || '').toLowerCase();
          return p.includes('phuket') || p.includes('ภูเก็ต') || p.includes('สมชาย') || p.includes('andaman') || p.includes('tour') || p.includes('sealife') || s.includes('phuket') || s.includes('ภูเก็ต') || s.includes('sealife') || a.includes('gianttick');
        });
      }`;

const newDashTableFilter = `      let dataToUse = dashBkMasterList;
      if (isPartner) {
        dataToUse = dashBkMasterList.filter(r => {
          const p = (r.property || '').toLowerCase();
          const s = (r.serviceName || '').toLowerCase();
          const a = (r.agent || '').toLowerCase();
          return p.includes('phuket') || p.includes('ภูเก็ต') || p.includes('สมชาย') || p.includes('andaman') || p.includes('tour') || p.includes('sealife') || s.includes('phuket') || s.includes('ภูเก็ต') || s.includes('sealife') || a.includes('gianttick');
        });
      }
      if (typeof adminSelectedMonth !== 'undefined' && adminSelectedMonth !== 'all') {
        dataToUse = dataToUse.filter(r => detectReservationMonthIndex(r) === adminSelectedMonth);
      }
      if (typeof adminSelectedStatusFilter !== 'undefined' && adminSelectedStatusFilter !== 'all') {
        dataToUse = dataToUse.filter(r => r.status === adminSelectedStatusFilter);
      }
      const filterBadge = document.getElementById('dash-latest-filter-badge');
      if (filterBadge) {
        const parts = [];
        if (typeof adminSelectedMonth !== 'undefined' && adminSelectedMonth !== 'all') parts.push('เดือน: ' + THAI_MONTHS_FULL[adminSelectedMonth]);
        if (typeof adminSelectedStatusFilter !== 'undefined' && adminSelectedStatusFilter !== 'all') parts.push('สถานะ: ' + adminSelectedStatusFilter);
        filterBadge.textContent = parts.length > 0 ? '🔍 กรองเฉพาะ ' + parts.join(' • ') + ' (' + dataToUse.length + ' รายการ)' : '';
      }`;

if (adminHtml.includes(oldDashTableFilter)) {
  adminHtml = adminHtml.replace(oldDashTableFilter, newDashTableFilter);
  console.log('✓ Connected dashboard table to interactive month & status filters');
}

fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('✓ admin.html saved!');

// ============================================================================
// PART 2: UPDATE index.html WITH PERSONAL MONTHLY SPENDING & BOOKING DASHBOARD
// ============================================================================
let indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

const userAnalyticsHtmlAnchor = `        <div class="table-container">
          <div class="table-toolbar">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <h3 class="table-title" style="margin:0;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                ประวัติการจองของฉัน (My Bookings)
              </h3>`;

const userAnalyticsHtml = `        <!-- Personal Booking & Monthly Spending Analytics Dashboard -->
        <div id="user-booking-analytics-wrap" style="margin-bottom: 24px;">
          <!-- Populated dynamically by renderUserBookingDashboard() -->
        </div>

        <div class="table-container">
          <div class="table-toolbar">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <h3 class="table-title" style="margin:0;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                ประวัติการจองของฉัน (My Bookings)
              </h3>`;

if (indexHtml.includes(userAnalyticsHtmlAnchor)) {
  indexHtml = indexHtml.replace(userAnalyticsHtmlAnchor, userAnalyticsHtml);
  console.log('✓ Injected #user-booking-analytics-wrap into index.html');
}

// Enhance renderReservations() in index.html to also render the personal monthly spending chart & filter by month
const oldUserResRenderEnd = `      if (summaryEl) {
        summaryEl.textContent = \`แสดงรายการที่ 1 ถึง \${filtered.length} จากประวัติการจองของคุณทั้งหมด \${userReservations.length} รายการ\`;
      }
    }`;

const newUserResRenderEnd = `      if (summaryEl) {
        summaryEl.textContent = \`แสดงรายการที่ 1 ถึง \${filtered.length} จากประวัติการจองของคุณทั้งหมด \${userReservations.length} รายการ\`;
      }
      renderUserBookingDashboard(userReservations);
    }

    let userSelectedBookingMonth = 'all';

    function filterUserBookingsByMonth(mIdx) {
      if (mIdx === 'all' || userSelectedBookingMonth === mIdx) {
        userSelectedBookingMonth = 'all';
      } else {
        userSelectedBookingMonth = mIdx;
      }
      renderReservations();
    }

    function renderUserBookingDashboard(userReservations) {
      const wrap = document.getElementById('user-booking-analytics-wrap');
      if (!wrap) return;

      if (!isUserLoggedIn() || !userReservations || userReservations.length === 0) {
        wrap.innerHTML = '';
        return;
      }

      const monthsShort = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
      const monthlyTotals = new Array(12).fill(0);
      const monthlyCounts = new Array(12).fill(0);

      let totalSpent = 0;
      let confirmedCount = 0;
      const catCounts = { '🏨 ที่พัก/โรงแรม': 0, '🎡 แหล่งท่องเที่ยว/ล่องเรือ': 0, '💆 สปา/เวลเนส': 0 };

      userReservations.forEach(r => {
        const amt = parseFloat(r.amount) || 0;
        if (r.status !== 'Cancelled') {
          totalSpent += amt;
        }
        if (r.status === 'Confirmed' || r.status === 'Completed') {
          confirmedCount++;
        }
        const dStr = (r.checkin || r.bookedOn || '').trim();
        const mMatch = dStr.match(/\\d{4}-(\\d{2})/);
        const mIdx = mMatch ? Math.max(0, Math.min(11, parseInt(mMatch[1], 10) - 1)) : 10;
        if (r.status !== 'Cancelled') {
          monthlyTotals[mIdx] += amt;
          monthlyCounts[mIdx] += 1;
        }

        const txt = ((r.serviceName || '') + ' ' + (r.property || '')).toLowerCase();
        if (txt.includes('spa') || txt.includes('สปา')) catCounts['💆 สปา/เวลเนส'] += amt;
        else if (txt.includes('cruise') || txt.includes('ล่องเรือ') || txt.includes('sealife') || txt.includes('ใบหยก')) catCounts['🎡 แหล่งท่องเที่ยว/ล่องเรือ'] += amt;
        else catCounts['🏨 ที่พัก/โรงแรม'] += amt;
      });

      const totalEarnedTCP = Math.round(totalSpent * 0.05);
      const maxMonthSpent = Math.max(...monthlyTotals, 1000);

      const barsHtml = monthsShort.map((mName, idx) => {
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
      }).join('');

      wrap.innerHTML = \`
        <div style="background:#ffffff; border:1px solid var(--line); border-radius:16px; padding:20px 22px; box-shadow:var(--shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
            <div>
              <h3 style="margin:0 0 4px; font-size:16px; color:var(--navy); display:flex; align-items:center; gap:8px;">
                <span>📊 สรุปภาพรวมการจองและยอดใช้จ่ายรายเดือนของคุณ (\${state.user.name})</span>
              </h3>
              <p style="margin:0; font-size:12px; color:var(--muted);">แสดงข้อมูลสถิติการเดินทางและยอดเงินแต่ละเดือนเฉพาะบัญชีของคุณ (คลิกที่เดือนเพื่อกรองตารางด้านล่าง)</p>
            </div>
            \${userSelectedBookingMonth !== 'all' ? \`
              <button type="button" class="btn-export" style="height:32px; font-size:12px; color:#0284c7; border-color:#7dd3fc; background:#f0f9ff;" onclick="filterUserBookingsByMonth('all')">
                ✕ แสดงครบทุกเดือน
              </button>
            \` : ''}
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(190px, 1fr)); gap:12px; margin-bottom:18px;">
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-left:4px solid #0284c7; border-radius:10px; padding:12px 14px;">
              <div style="font-size:11.5px; color:#64748b; font-weight:600;">📋 รายการจองของฉันทั้งหมด</div>
              <div style="font-size:22px; font-weight:800; color:var(--navy); margin-top:4px;">\${userReservations.length} <small style="font-size:12px; font-weight:600;">รายการ</small></div>
              <div style="font-size:11px; color:#059669; font-weight:600;">ยืนยันแล้ว \${confirmedCount} รายการ</div>
            </div>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-left:4px solid #0d9488; border-radius:10px; padding:12px 14px;">
              <div style="font-size:11.5px; color:#64748b; font-weight:600;">💰 ยอดใช้จ่ายรวมสุทธิ</div>
              <div style="font-size:22px; font-weight:800; color:#0d9488; margin-top:4px;">฿\${totalSpent.toLocaleString('th-TH')}</div>
              <div style="font-size:11px; color:#64748b;">เฉลี่ย ฿\${Math.round(totalSpent / Math.max(userReservations.length, 1)).toLocaleString('th-TH')} / การจอง</div>
            </div>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-left:4px solid #f59e0b; border-radius:10px; padding:12px 14px;">
              <div style="font-size:11.5px; color:#64748b; font-weight:600;">🪙 แต้มสะสมที่ได้รับ (Cashback 5%)</div>
              <div style="font-size:22px; font-weight:800; color:#d97706; margin-top:4px;">+\${totalEarnedTCP.toLocaleString('th-TH')} TCP</div>
              <div style="font-size:11px; color:#b45309; font-weight:600;">เข้ากระเป๋า ERC-20 อัตโนมัติ</div>
            </div>
          </div>

          <div style="overflow-x:auto; -webkit-overflow-scrolling:touch; padding-bottom:6px;">
            <div style="display:grid; grid-template-columns:repeat(12, minmax(52px, 1fr)); gap:8px; min-width:640px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
              \${barsHtml}
            </div>
          </div>
        </div>
      \`;
    }`;

if (indexHtml.includes(oldUserResRenderEnd)) {
  indexHtml = indexHtml.replace(oldUserResRenderEnd, newUserResRenderEnd);
  console.log('✓ Added renderUserBookingDashboard to index.html');
}

// Also make sure when not logged in or 0 reservations in renderReservations(), wrap.innerHTML is cleared
indexHtml = indexHtml.replace(
  "if (summaryEl) summaryEl.textContent = 'กรุณาเข้าสู่ระบบเพื่อดูประวัติการจองส่วนตัวของคุณ';\n        return;",
  "if (summaryEl) summaryEl.textContent = 'กรุณาเข้าสู่ระบบเพื่อดูประวัติการจองส่วนตัวของคุณ';\n        const w = document.getElementById('user-booking-analytics-wrap'); if (w) w.innerHTML = '';\n        return;"
);

// Support month filtering in user's filtered reservations list
const oldUserFilterBlock = `      // 3. Apply search and status filters to user's reservations
      const filtered = userReservations.filter(r => {
        if (statusFilter !== 'all' && r.status !== statusFilter) return false;`;

const newUserFilterBlock = `      // 3. Apply search, status, and month filters to user's reservations
      const filtered = userReservations.filter(r => {
        if (typeof userSelectedBookingMonth !== 'undefined' && userSelectedBookingMonth !== 'all') {
          const dStr = (r.checkin || r.bookedOn || '').trim();
          const mMatch = dStr.match(/\\d{4}-(\\d{2})/);
          const mIdx = mMatch ? Math.max(0, Math.min(11, parseInt(mMatch[1], 10) - 1)) : 10;
          if (mIdx !== userSelectedBookingMonth) return false;
        }
        if (statusFilter !== 'all' && r.status !== statusFilter) return false;`;

if (indexHtml.includes(oldUserFilterBlock)) {
  indexHtml = indexHtml.replace(oldUserFilterBlock, newUserFilterBlock);
  console.log('✓ Added interactive month filter to user reservations table');
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('✓ index.html saved!');
