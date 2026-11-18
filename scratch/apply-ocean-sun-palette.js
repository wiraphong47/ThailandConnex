const fs = require('fs');

console.log('=== Applying Ocean & Sun Color Palette (#00A5CF, #027EBC, #F26419, #F6AE2D, #FFF8F0, #FFFFFF) ===');

const OCEAN_SUN_CSS = `
    /* ===================================================================== */
    /* OCEAN & SUN COLOR SYSTEM (ฟ้า-น้ำทะเล ตัดส้ม-เหลืองสดใส บนพื้นขาว/ครีมอ่อน) */
    /* ===================================================================== */
    :root, [data-theme="ocean-sun"], [data-theme="clean-ota"] {
      --navy: #027EBC;
      --navy-dark: #015F8E;
      --blue: #00A5CF;
      --blue-light: #E6F7FB;
      --teal: #00A5CF;
      --teal-light: #E6F7FB;
      --orange: #F26419;
      --orange-light: #FFF3EB;
      --sun-yellow: #F6AE2D;
      --sun-yellow-light: #FFF9E6;
      --ink: #0F2942;
      --muted: #5A6B7C;
      --line: #E6DFD5;
      --wash: #FFF8F0;
      --card-bg: #FFFFFF;
      --sidebar-bg: #FFFFFF;
      --primary-navy: #027EBC;
      --primary-blue: #00A5CF;
      --primary-orange: #F26419;
      --bg-wash: #FFF8F0;
      --border-line: #E6DFD5;
      --text-main: #0F2942;
      --text-muted: #5A6B7C;
    }

    body {
      background: #FFF8F0 !important;
      color: #0F2942 !important;
    }

    /* Navbar & Sidebar */
    .navbar, .topbar, .sidebar {
      background: #FFFFFF !important;
      border-color: #E6DFD5 !important;
    }
    .brand, .brand-logo {
      color: #027EBC !important;
    }
    .brand span, .brand-logo span {
      color: #F26419 !important;
    }
    .badge-user {
      background: #E6F7FB !important;
      color: #027EBC !important;
      border: 1px solid #B3E5F2 !important;
    }
    .badge-user::before {
      background: #00A5CF !important;
    }

    /* Hero Banner (Ocean & Turquoise with Sunshine Accents) */
    .user-hero {
      background: linear-gradient(135deg, #027EBC 0%, #00A5CF 100%) !important;
      border-radius: 14px !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      box-shadow: 0 8px 24px rgba(2, 126, 188, 0.16) !important;
    }
    .hero-tag {
      background: #F6AE2D !important;
      color: #0F2942 !important;
      border: none !important;
      font-weight: 700 !important;
      border-radius: 999px !important;
    }
    .stat-box {
      background: rgba(255, 255, 255, 0.14) !important;
      border: 1px solid rgba(255, 255, 255, 0.28) !important;
      border-radius: 10px !important;
    }
    .stat-val {
      color: #FFF8F0 !important;
    }

    /* Primary CTA Buttons in Vibrant Sun Orange (#F26419) */
    .btn-search, .btn-book, .btn-redeem {
      background: #F26419 !important;
      color: #FFFFFF !important;
      border: 1px solid #F26419 !important;
      border-radius: 8px !important;
      box-shadow: 0 3px 10px rgba(242, 100, 25, 0.24) !important;
      font-weight: 700 !important;
    }
    .btn-search:hover, .btn-book:hover, .btn-redeem:hover {
      background: #D9530E !important;
      border-color: #D9530E !important;
      box-shadow: 0 4px 14px rgba(242, 100, 25, 0.34) !important;
    }

    /* Ocean & Turquoise Primary Action Buttons */
    .btn-auth-header, .btn-auth-submit, .btn-action {
      background: #027EBC !important;
      color: #FFFFFF !important;
      border: 1px solid #027EBC !important;
      border-radius: 8px !important;
    }
    .btn-auth-header:hover, .btn-auth-submit:hover, .btn-action:hover {
      background: #00A5CF !important;
      border-color: #00A5CF !important;
    }

    /* Category Filter Pills */
    .cat-pill {
      background: #FFFFFF !important;
      border: 1px solid #E6DFD5 !important;
      color: #0F2942 !important;
      border-radius: 999px !important;
    }
    .cat-pill:hover {
      border-color: #00A5CF !important;
      color: #027EBC !important;
      background: #E6F7FB !important;
    }
    .cat-pill.active {
      background: #00A5CF !important;
      color: #FFFFFF !important;
      border-color: #00A5CF !important;
      box-shadow: 0 3px 10px rgba(0, 165, 207, 0.25) !important;
    }

    /* Cards & Badges */
    .service-card, .voucher-card, .search-card, .table-container, .table-card, .chart-card-exact, .monthly-chart-card, .analytics-panel-card {
      background: #FFFFFF !important;
      border: 1px solid #E6DFD5 !important;
      border-radius: 12px !important;
    }
    .card-category-badge {
      background: #027EBC !important;
      color: #FFFFFF !important;
      border-radius: 6px !important;
    }
    .card-rating-badge {
      background: #F6AE2D !important;
      color: #0F2942 !important;
      font-weight: 800 !important;
      border-radius: 6px !important;
    }
    .voucher-points-badge {
      background: #F26419 !important;
      color: #FFFFFF !important;
      border-radius: 999px !important;
    }
    .price-val {
      color: #027EBC !important;
    }
    .feat-tag {
      background: #FFF8F0 !important;
      color: #0F2942 !important;
      border: 1px solid #F0E6D8 !important;
    }

    /* Token Pill & User Avatar */
    .token-pill {
      background: #FFF9E6 !important;
      border: 1px solid #F6AE2D !important;
      color: #0F2942 !important;
    }
    .token-icon {
      background: #F6AE2D !important;
      color: #0F2942 !important;
    }
    .token-val {
      color: #D9530E !important;
    }
    .user-avatar, .suc-avatar, .profile-card-avatar {
      background: #F26419 !important;
      color: #FFFFFF !important;
    }
    .sidebar-user-card {
      background: linear-gradient(135deg, #027EBC 0%, #00A5CF 100%) !important;
      color: #FFFFFF !important;
    }
    .side-nav-item.active, .menu-item-btn.active {
      background: #E6F7FB !important;
      color: #027EBC !important;
      border-right-color: #00A5CF !important;
    }

    /* Dashboard & Monthly Chart (Ocean & Sun) */
    .analytics-header-bar {
      background: linear-gradient(135deg, #027EBC 0%, #00A5CF 100%) !important;
      color: #FFFFFF !important;
      border: none !important;
    }
    .analytics-header-title h3 {
      color: #FFFFFF !important;
    }
    .analytics-header-title p {
      color: #E6F7FB !important;
    }
    .analytics-year-btn {
      background: rgba(255, 255, 255, 0.16) !important;
      color: #FFFFFF !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
    }
    .analytics-year-btn.active {
      background: #F6AE2D !important;
      color: #0F2942 !important;
      border-color: #F6AE2D !important;
      font-weight: 800 !important;
    }
    .analytics-kpi-card::before {
      background: #00A5CF !important;
      width: 4px !important;
    }
    .analytics-kpi-card.teal::before { background: #027EBC !important; }
    .analytics-kpi-card.amber::before { background: #F6AE2D !important; }
    .analytics-kpi-card.purple::before { background: #F26419 !important; }
    .month-bar-track {
      background: linear-gradient(180deg, #00A5CF 0%, #027EBC 100%) !important;
      border-radius: 6px 6px 0 0 !important;
    }
    .month-bar-comm {
      background: #F6AE2D !important;
    }
    .month-col.active .month-bar-track {
      background: #F26419 !important;
    }
    .month-bk-pill {
      background: #FFF3EB !important;
      color: #F26419 !important;
      border: 1px solid #FAD1B8 !important;
    }
    .month-col:hover .month-bk-pill, .month-col.active .month-bk-pill {
      background: #F26419 !important;
      color: #FFFFFF !important;
      border-color: #F26419 !important;
    }
    .month-col.active .month-label {
      background: #027EBC !important;
      color: #FFFFFF !important;
    }
`;

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

// Update :root at top of index.html
const oldRootIndex = `    :root {
      --navy: #083b7c;
      --navy-dark: #062b5c;
      --blue: #168de1;
      --blue-light: #e8f4fd;
      --teal: #08b99d;
      --teal-light: #e6f8f4;
      --orange: #ff7834;
      --orange-light: #fff2eb;
      --ink: #15243b;
      --muted: #64748b;
      --line: #e2e8f0;
      --wash: #f4f7fb;`;

const newRootIndex = `    :root {
      --navy: #027EBC;
      --navy-dark: #015F8E;
      --blue: #00A5CF;
      --blue-light: #E6F7FB;
      --teal: #00A5CF;
      --teal-light: #E6F7FB;
      --orange: #F26419;
      --orange-light: #FFF3EB;
      --sun-yellow: #F6AE2D;
      --ink: #0F2942;
      --muted: #5A6B7C;
      --line: #E6DFD5;
      --wash: #FFF8F0;`;

if (indexHtml.includes(oldRootIndex)) {
  indexHtml = indexHtml.replace(oldRootIndex, newRootIndex);
  console.log('✓ Updated top :root in index.html to Ocean & Sun palette');
}

indexHtml = indexHtml.replace('</style>', OCEAN_SUN_CSS + '\n</style>');

// Update user personal monthly chart bars in index.html to use Ocean & Sun colors (#00A5CF / #027EBC / #F26419)
indexHtml = indexHtml.replace(
  "background:${val > 0 ? (isSel ? '#0d9488' : 'var(--navy)') : '#e2e8f0'}",
  "background:${val > 0 ? (isSel ? '#F26419' : 'linear-gradient(180deg, #00A5CF, #027EBC)') : '#E6DFD5'}"
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('✓ Saved index.html with Ocean & Sun palette');

// 2. Update admin.html
let adminHtml = fs.readFileSync('admin.html', 'utf8').replace(/\r\n/g, '\n');

adminHtml = adminHtml.replace('</style>', OCEAN_SUN_CSS + '\n</style>');

// Update chart colors in admin.html to Ocean & Sun (#027EBC, #00A5CF, #F26419, #F6AE2D)
adminHtml = adminHtml.replace(
  "const chanColors = ['#0f294d', '#1e40af', '#0f766e', '#475569', '#64748b'];",
  "const chanColors = ['#027EBC', '#00A5CF', '#F26419', '#F6AE2D', '#5A6B7C'];"
);
adminHtml = adminHtml.replace(
  `accommodation: { label: 'โรงแรมและที่พัก (Accommodation)', color: '#0f294d', rev: 0, count: 0 },
        attraction: { label: 'แหล่งท่องเที่ยวและล่องเรือ (Attraction)', color: '#1d4ed8', rev: 0, count: 0 },
        wellness: { label: 'สุขภาพและสปา (Wellness & Spa)', color: '#0f766e', rev: 0, count: 0 },
        tour: { label: 'แพ็กเกจทัวร์และกิจกรรม (Tours)', color: '#64748b', rev: 0, count: 0 }`,
  `accommodation: { label: 'โรงแรมและที่พัก (Accommodation)', color: '#027EBC', rev: 0, count: 0 },
        attraction: { label: 'แหล่งท่องเที่ยวและล่องเรือ (Attraction)', color: '#00A5CF', rev: 0, count: 0 },
        wellness: { label: 'สุขภาพและสปา (Wellness & Spa)', color: '#F26419', rev: 0, count: 0 },
        tour: { label: 'แพ็กเกจทัวร์และกิจกรรม (Tours)', color: '#F6AE2D', rev: 0, count: 0 }`
);
adminHtml = adminHtml.replace(
  '<span><i class="legend-dot" style="background:#0284c7;"></i>ยอดขายรายเดือน (฿)</span>\n                  <span><i class="legend-dot" style="background:#38bdf8;"></i>ค่าคอมมิชชัน (5%)</span>\n                  <span><i class="legend-dot" style="background:#ea580c; border-radius:50%;"></i>จำนวนการจอง (รายการ)</span>',
  '<span><i class="legend-dot" style="background:#00A5CF;"></i>ยอดขายรายเดือน (฿)</span>\n                  <span><i class="legend-dot" style="background:#F6AE2D;"></i>ค่าคอมมิชชัน (5%)</span>\n                  <span><i class="legend-dot" style="background:#F26419; border-radius:50%;"></i>จำนวนการจอง (รายการ)</span>'
);

fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('✓ Saved admin.html with Ocean & Sun palette');
