const fs = require('fs');

console.log('=== Fixing Mobile Responsive Overflow & SVG Chart Distortion in admin.html and index.html ===');

let adminHtml = fs.readFileSync('admin.html', 'utf8').replace(/\r\n/g, '\n');

// 1. Remove preserveAspectRatio="none" from the dashboard wave SVG so text/axes never squash on mobile
adminHtml = adminHtml.replace(
  '<svg class="chart-grid-svg" viewBox="0 0 1000 230" preserveAspectRatio="none">',
  '<svg class="chart-grid-svg" viewBox="0 0 1000 230" preserveAspectRatio="xMidYMid meet">'
);

// 2. Make #admin-role-banner wrap cleanly on mobile
adminHtml = adminHtml.replace(
  'id="admin-role-banner" style="margin-bottom: 16px; padding: 12px 18px; border-radius: 10px; font-size: 13px; display: flex; align-items: center; justify-content: space-between; gap: 12px;',
  'id="admin-role-banner" style="margin-bottom: 16px; padding: 12px 18px; border-radius: 10px; font-size: 13px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;'
);

// 3. Upgrade CSS in admin.html for .wave-chart-container, .table-card, .clean-table, and mobile viewport containment
const oldWaveAndTableCss = `    .wave-chart-container {
      position: relative;
      width: 100%;
      height: 230px;
      margin: 10px 0 24px;
    }
    .chart-grid-svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }`;

const newWaveAndTableCss = `    .wave-chart-container {
      position: relative;
      width: 100%;
      margin: 10px 0 16px;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 6px;
    }
    .chart-grid-svg {
      width: 100%;
      min-width: 620px;
      height: auto;
      aspect-ratio: 1000 / 230;
      display: block;
    }`;

if (adminHtml.includes(oldWaveAndTableCss)) {
  adminHtml = adminHtml.replace(oldWaveAndTableCss, newWaveAndTableCss);
  console.log('✓ Updated .wave-chart-container and .chart-grid-svg in admin.html');
}

const oldTableCardCss = `    /* Common Table Card */
    .table-card {
      background: #ffffff;
      border: 1px solid var(--border-line);
      border-radius: 12px;
      padding: 20px 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
      margin-bottom: 24px;
    }
    .table-card-head {
      font-weight: 700;
      font-size: 15px;
      color: #1e293b;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .clean-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }`;

const newTableCardCss = `    /* Common Table Card */
    .table-card {
      background: #ffffff;
      border: 1px solid var(--border-line);
      border-radius: 12px;
      padding: 20px 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
      margin-bottom: 24px;
      width: 100%;
      max-width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .table-card-head {
      font-weight: 700;
      font-size: 15px;
      color: #1e293b;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .clean-table {
      width: 100%;
      min-width: 580px;
      border-collapse: collapse;
      font-size: 13px;
    }`;

if (adminHtml.includes(oldTableCardCss)) {
  adminHtml = adminHtml.replace(oldTableCardCss, newTableCardCss);
  console.log('✓ Updated .table-card with overflow-x: auto and .clean-table min-width');
}

// 4. Strengthen @media (max-width: 900px) and @media (max-width: 480px) in admin.html to guarantee 0 horizontal overflow
const oldAdminResponsive = `    @media (max-width: 900px) {
      .app-layout {
        grid-template-columns: 1fr;
      }`;

const newAdminResponsive = `    html, body {
      max-width: 100%;
      overflow-x: hidden;
    }
    .app-layout, .main-wrap, .content-area, .view-section, .chart-card-exact {
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    @media (max-width: 900px) {
      .app-layout {
        display: block;
        width: 100%;
        max-width: 100vw;
        overflow-x: hidden;
      }
      .main-wrap {
        width: 100%;
        max-width: 100vw;
        overflow-x: hidden;
      }`;

if (adminHtml.includes(oldAdminResponsive)) {
  adminHtml = adminHtml.replace(oldAdminResponsive, newAdminResponsive);
  console.log('✓ Added strict 100vw containment on mobile in admin.html');
}

// Enhance mobile styles for topbar, date badge, and table-card padding on <= 480px
const oldAdmin480 = `    @media (max-width: 480px) {
      .topbar-left b {
        font-size: 12.5px;
      }
      .btn-reset-data span {
        display: none;
      }
      .portal-switcher {
        padding: 6px 10px;
        font-size: 11.5px;
      }
      .chart-card-exact {
        padding: 16px;
      }
    }`;

const newAdmin480 = `    @media (max-width: 640px) {
      .topbar {
        padding: 10px 14px;
      }
      .topbar-left {
        width: 100%;
        font-size: 12.5px;
      }
      .topbar-right {
        width: 100%;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 8px;
      }
      .chart-card-exact {
        padding: 16px 14px;
      }
      .today-revenue h2 {
        font-size: 22px;
      }
      .date-range-badge {
        width: 100%;
        justify-content: space-between;
        font-size: 12px;
      }
      .date-dropdown-menu {
        left: 0;
        right: auto;
        width: 100%;
        max-width: 280px;
      }
      .kpi-box {
        padding: 16px 18px;
      }
      .kpi-box strong {
        font-size: 24px;
      }
      .table-card {
        padding: 16px 14px;
      }
    }

    @media (max-width: 480px) {
      .topbar-left b {
        font-size: 12px;
      }
      .portal-switcher {
        padding: 6px 10px;
        font-size: 11.5px;
      }
    }`;

if (adminHtml.includes(oldAdmin480)) {
  adminHtml = adminHtml.replace(oldAdmin480, newAdmin480);
  console.log('✓ Enhanced <=640px and <=480px styles in admin.html');
}

fs.writeFileSync('admin.html', adminHtml, 'utf8');

// Also ensure html, body in index.html has strict overflow-x: hidden
let indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
if (!indexHtml.includes('html, body {\n      max-width: 100%;\n      overflow-x: hidden;\n    }')) {
  indexHtml = indexHtml.replace(
    '    body {\n      margin: 0;',
    '    html, body {\n      max-width: 100%;\n      overflow-x: hidden;\n    }\n    body {\n      margin: 0;'
  );
  fs.writeFileSync('index.html', indexHtml, 'utf8');
  console.log('✓ Added html, body max-width: 100%; overflow-x: hidden to index.html');
}

console.log('=== Done! ===');
