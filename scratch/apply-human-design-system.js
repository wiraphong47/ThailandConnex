const fs = require('fs');

console.log('=== Applying Authentic Human-Crafted Design System (De-AI Overhaul + 3 Pro Palettes) ===');

const THEME_ENGINE_CSS = `
    /* ===================================================================== */
    /* HUMAN-CRAFTED EDITORIAL & ENTERPRISE DESIGN SYSTEM OVERRIDES          */
    /* ===================================================================== */
    :root, [data-theme="clean-ota"] {
      --navy: #0f294d;
      --navy-dark: #091931;
      --blue: #1d4ed8;
      --blue-light: #eff6ff;
      --teal: #0f766e;
      --teal-light: #f0fdfa;
      --orange: #c2410c;
      --orange-light: #fff7ed;
      --ink: #0f172a;
      --muted: #64748b;
      --line: #e2e8f0;
      --wash: #f8fafc;
      --primary-navy: #0f294d;
      --primary-blue: #1d4ed8;
      --primary-orange: #c2410c;
      --bg-wash: #f8fafc;
      --border-line: #e2e8f0;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --radius: 10px;
      --shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.04);
      --shadow-md: 0 4px 12px rgba(15, 23, 42, 0.06);
      --shadow-lg: 0 12px 28px rgba(15, 23, 42, 0.1);
    }

    [data-theme="boutique"] {
      --navy: #11393b;
      --navy-dark: #0a2526;
      --blue: #0f766e;
      --blue-light: #f0fdfa;
      --teal: #115e59;
      --teal-light: #ccfbf1;
      --orange: #b45309;
      --orange-light: #fef3c7;
      --ink: #1c1917;
      --muted: #57534e;
      --line: #e7e5e4;
      --wash: #faf8f5;
      --primary-navy: #11393b;
      --primary-blue: #0f766e;
      --primary-orange: #b45309;
      --bg-wash: #faf8f5;
      --border-line: #e7e5e4;
      --text-main: #1c1917;
      --text-muted: #57534e;
    }

    [data-theme="minimal-slate"] {
      --navy: #18181b;
      --navy-dark: #09090b;
      --blue: #2563eb;
      --blue-light: #f4f4f5;
      --teal: #3f3f46;
      --teal-light: #f4f4f5;
      --orange: #18181b;
      --orange-light: #f4f4f5;
      --ink: #09090b;
      --muted: #71717a;
      --line: #e4e4e7;
      --wash: #fafafa;
      --primary-navy: #18181b;
      --primary-blue: #2563eb;
      --primary-orange: #18181b;
      --bg-wash: #fafafa;
      --border-line: #e4e4e7;
      --text-main: #09090b;
      --text-muted: #71717a;
    }

    /* Flat, disciplined enterprise surfaces (Remove flashy AI gradients) */
    .user-hero {
      background: var(--navy) !important;
      border-radius: 12px !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      box-shadow: var(--shadow-sm) !important;
    }
    .user-hero::before, .user-hero::after {
      display: none !important;
    }
    .hero-tag {
      background: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(255, 255, 255, 0.18) !important;
      color: #f8fafc !important;
      border-radius: 6px !important;
      letter-spacing: 0.3px !important;
    }
    .stat-box {
      background: rgba(255, 255, 255, 0.06) !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      border-radius: 8px !important;
    }
    .stat-val {
      color: #ffffff !important;
    }
    .btn-search, .btn-book, .btn-auth-header, .btn-auth-submit, .btn-action {
      background: var(--navy) !important;
      color: #ffffff !important;
      border-radius: 8px !important;
      box-shadow: none !important;
      border: 1px solid var(--navy) !important;
      transition: background 0.15s ease, opacity 0.15s ease !important;
    }
    .btn-search:hover, .btn-book:hover, .btn-auth-header:hover, .btn-auth-submit:hover, .btn-action:hover {
      background: var(--blue) !important;
      border-color: var(--blue) !important;
      transform: none !important;
    }
    .token-pill {
      background: #ffffff !important;
      color: var(--ink) !important;
      border: 1px solid var(--line) !important;
      border-radius: 8px !important;
      box-shadow: var(--shadow-sm) !important;
    }
    .token-icon {
      background: var(--navy) !important;
      color: #ffffff !important;
    }
    .token-val {
      color: var(--navy) !important;
    }
    .token-sub {
      color: var(--muted) !important;
    }
    .user-avatar, .suc-avatar, .profile-card-avatar {
      background: var(--navy) !important;
      color: #ffffff !important;
      box-shadow: none !important;
      border: 1px solid rgba(255,255,255,0.2) !important;
    }
    .sidebar-user-card {
      background: var(--navy) !important;
      border-radius: 10px !important;
      box-shadow: none !important;
    }
    .suc-bal-val {
      color: #ffffff !important;
    }
    .badge-user {
      background: #f1f5f9 !important;
      color: #334155 !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 6px !important;
    }
    .btn-admin-switch, .portal-switcher {
      background: #ffffff !important;
      color: var(--ink) !important;
      border: 1px solid var(--line) !important;
      border-radius: 8px !important;
      box-shadow: var(--shadow-sm) !important;
    }
    .btn-admin-switch:hover, .portal-switcher:hover {
      background: #f8fafc !important;
      border-color: #cbd5e1 !important;
      color: var(--navy) !important;
      transform: none !important;
    }
    .cat-pill {
      border-radius: 8px !important;
      background: #ffffff !important;
      border: 1px solid var(--line) !important;
      color: #334155 !important;
      font-weight: 500 !important;
    }
    .cat-pill.active {
      background: var(--navy) !important;
      color: #ffffff !important;
      border-color: var(--navy) !important;
      font-weight: 600 !important;
      box-shadow: none !important;
    }
    .service-card, .voucher-card, .table-container, .table-card, .chart-card-exact, .monthly-chart-card, .analytics-panel-card {
      border-radius: 10px !important;
      border: 1px solid var(--line) !important;
      box-shadow: var(--shadow-sm) !important;
    }
    .service-card:hover, .voucher-card:hover {
      transform: translateY(-2px) !important;
      box-shadow: var(--shadow-md) !important;
      border-color: #cbd5e1 !important;
    }
    .card-category-badge {
      background: rgba(15, 23, 42, 0.82) !important;
      border-radius: 5px !important;
      font-weight: 500 !important;
    }
    .card-rating-badge {
      background: #ffffff !important;
      color: #0f172a !important;
      border-radius: 5px !important;
      box-shadow: 0 2px 6px rgba(0,0,0,0.12) !important;
    }
    .voucher-points-badge {
      background: var(--navy) !important;
      color: #ffffff !important;
      border-radius: 6px !important;
      box-shadow: none !important;
    }
    .btn-redeem {
      background: var(--navy) !important;
      border-radius: 8px !important;
    }

    /* Admin Analytics Suite Clean Editorial Overrides */
    .analytics-header-bar {
      background: #ffffff !important;
      color: var(--ink) !important;
      border: 1px solid var(--line) !important;
      border-radius: 10px !important;
      box-shadow: var(--shadow-sm) !important;
    }
    .analytics-header-title h3 {
      color: var(--ink) !important;
      font-size: 17px !important;
    }
    .analytics-header-title p {
      color: var(--muted) !important;
    }
    .analytics-year-btn {
      background: #f8fafc !important;
      color: #475569 !important;
      border: 1px solid var(--line) !important;
      border-radius: 7px !important;
      box-shadow: none !important;
    }
    .analytics-year-btn:hover {
      background: #f1f5f9 !important;
      color: var(--ink) !important;
    }
    .analytics-year-btn.active {
      background: var(--navy) !important;
      color: #ffffff !important;
      border-color: var(--navy) !important;
    }
    .analytics-kpi-card {
      border-radius: 10px !important;
      border: 1px solid var(--line) !important;
      box-shadow: var(--shadow-sm) !important;
    }
    .analytics-kpi-card::before {
      background: var(--navy) !important;
      width: 3px !important;
    }
    .analytics-kpi-sub {
      color: var(--muted) !important;
      font-weight: 500 !important;
    }
    .month-bar-track {
      background: var(--navy) !important;
      box-shadow: none !important;
      border-radius: 4px 4px 0 0 !important;
    }
    .month-bar-comm {
      background: rgba(255, 255, 255, 0.28) !important;
    }
    .month-col.active .month-bar-track {
      background: var(--blue) !important;
      box-shadow: none !important;
    }
    .month-bk-pill {
      background: #f1f5f9 !important;
      color: #475569 !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 5px !important;
      font-weight: 600 !important;
    }
    .month-col:hover .month-bk-pill, .month-col.active .month-bk-pill {
      background: var(--navy) !important;
      color: #ffffff !important;
      border-color: var(--navy) !important;
      transform: none !important;
    }
    .month-col.active .month-label {
      background: var(--navy) !important;
      color: #ffffff !important;
    }

    /* Theme Switcher Select Pill */
    .theme-Select-pill {
      height: 34px;
      padding: 0 10px;
      border-radius: 8px;
      border: 1px solid var(--line);
      background: #ffffff;
      color: var(--ink);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      outline: none;
    }
    .theme-Select-pill:hover {
      border-color: #cbd5e1;
      background: #f8fafc;
    }
`;

const THEME_ENGINE_JS = `
    // ==========================================
    // MULTI-PALETTE THEME SWITCHER (SYNCED)
    // ==========================================
    function applyUiTheme(themeName) {
      const valid = ['clean-ota', 'boutique', 'minimal-slate'];
      const chosen = valid.includes(themeName) ? themeName : 'clean-ota';
      document.documentElement.setAttribute('data-theme', chosen);
      try { localStorage.setItem('TC_UI_THEME', chosen); } catch (e) {}
      const sel = document.getElementById('ui-theme-selector');
      if (sel && sel.value !== chosen) sel.value = chosen;
    }
    (function initSavedTheme() {
      try {
        const saved = localStorage.getItem('TC_UI_THEME') || 'clean-ota';
        document.documentElement.setAttribute('data-theme', saved);
        window.addEventListener('DOMContentLoaded', () => {
          const sel = document.getElementById('ui-theme-selector');
          if (sel) sel.value = saved;
        });
        window.addEventListener('storage', (e) => {
          if (e.key === 'TC_UI_THEME' && e.newValue) applyUiTheme(e.newValue);
        });
      } catch (e) {}
    })();
`;

function stripExcessiveEmojis(html) {
  // Remove decorative AI emojis from headings, pills, buttons, and labels while keeping clean text
  const decorativeEmojis = [
    '✨ ', '🏨 ', '🧭 ', '💆 ', '🚗 ', '🍽️ ', '🎡 ', '🛍️ ', '🌿 ',
    '📊 ', '📈 ', '🍩 ', '📍 ', '💰 ', '🏦 ', '🧾 ', '🪙 ', '🏆 ',
    '📋 ', '🔑 ', '🎉 ', '🛎️ ', '🏢 ', '📅 ', '💡 ', '📌 ', '🟢 ', '📑 '
  ];
  let out = html;
  for (const em of decorativeEmojis) {
    out = out.split(em).join('');
  }
  return out;
}

// ============================================================================
// 1. APPLY TO index.html
// ============================================================================
let indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

indexHtml = indexHtml.replace('</style>', THEME_ENGINE_CSS + '\n</style>');
indexHtml = indexHtml.replace('  </script>\n</body>', THEME_ENGINE_JS + '\n  </script>\n</body>');

// Add theme selector dropdown to index.html topbar (.user-actions)
const indexTopbarAnchor = `<div class="user-actions">`;
const indexTopbarWithTheme = `<div class="user-actions">
          <select id="ui-theme-selector" class="theme-Select-pill" onchange="applyUiTheme(this.value)" title="เปลี่ยนโทนสีของเว็บไซต์">
            <option value="clean-ota">โทนสี: Clean OTA (Navy)</option>
            <option value="boutique">โทนสี: Boutique Luxury (Emerald)</option>
            <option value="minimal-slate">โทนสี: Minimal Slate (Monochrome)</option>
          </select>`;

if (indexHtml.includes(indexTopbarAnchor) && !indexHtml.includes('id="ui-theme-selector"')) {
  indexHtml = indexHtml.replace(indexTopbarAnchor, indexTopbarWithTheme);
  console.log('✓ Added 3-Palette Theme Switcher to index.html topbar');
}

// Clean up inline gradients in index.html (#view-rewards, #view-wallet, Data Bank gateway card)
indexHtml = indexHtml.replace(
  'background: linear-gradient(135deg, #083b7c, #0c4a6e);',
  'background: var(--navy);'
);
indexHtml = indexHtml.replace(
  'background:linear-gradient(135deg, #0f172a, #1e293b);',
  'background: var(--navy);'
);
indexHtml = indexHtml.replace(
  'background:linear-gradient(135deg, #093b7c, #1377c8);',
  'background: var(--navy);'
);
indexHtml = indexHtml.replace(
  /color:#38bdf8;/g,
  'color:#ffffff;'
);
indexHtml = indexHtml.replace(
  /linear-gradient\(180deg, #0284c7, #083b7c\)/g,
  'var(--navy)'
);

indexHtml = stripExcessiveEmojis(indexHtml);
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('✓ Updated index.html with Clean Human-Crafted Design System');

// ============================================================================
// 2. APPLY TO admin.html
// ============================================================================
let adminHtml = fs.readFileSync('admin.html', 'utf8').replace(/\r\n/g, '\n');

adminHtml = adminHtml.replace('</style>', THEME_ENGINE_CSS + '\n</style>');
adminHtml = adminHtml.replace('  </script>\n</body>', THEME_ENGINE_JS + '\n  </script>\n</body>');

const adminTopbarAnchor = `<div class="topbar-right">`;
const adminTopbarWithTheme = `<div class="topbar-right">
          <select id="ui-theme-selector" class="theme-Select-pill" onchange="applyUiTheme(this.value)" title="เปลี่ยนโทนสีของระบบ">
            <option value="clean-ota">โทนสี: Clean OTA (Navy)</option>
            <option value="boutique">โทนสี: Boutique Luxury (Emerald)</option>
            <option value="minimal-slate">โทนสี: Minimal Slate (Monochrome)</option>
          </select>`;

if (adminHtml.includes(adminTopbarAnchor) && !adminHtml.includes('id="ui-theme-selector"')) {
  adminHtml = adminHtml.replace(adminTopbarAnchor, adminTopbarWithTheme);
  console.log('✓ Added 3-Palette Theme Switcher to admin.html topbar');
}

// Replace rainbow chart colors in admin.html with refined monochrome/editorial palette
adminHtml = adminHtml.replace(
  "const chanColors = ['#0284c7', '#0d9488', '#8b5cf6', '#f59e0b', '#ec4899'];",
  "const chanColors = ['#0f294d', '#1e40af', '#0f766e', '#475569', '#64748b'];"
);
adminHtml = adminHtml.replace(
  `accommodation: { label: '🏨 โรงแรมและที่พัก', color: '#0284c7', rev: 0, count: 0 },
        attraction: { label: '🎡 แหล่งท่องเที่ยว & ล่องเรือ', color: '#0d9488', rev: 0, count: 0 },
        wellness: { label: '💆 สุขภาพและสปา', color: '#8b5cf6', rev: 0, count: 0 },
        tour: { label: '🧭 แพ็กเกจทัวร์ & กิจกรรม', color: '#f59e0b', rev: 0, count: 0 }`,
  `accommodation: { label: 'โรงแรมและที่พัก (Accommodation)', color: '#0f294d', rev: 0, count: 0 },
        attraction: { label: 'แหล่งท่องเที่ยวและล่องเรือ (Attraction)', color: '#1d4ed8', rev: 0, count: 0 },
        wellness: { label: 'สุขภาพและสปา (Wellness & Spa)', color: '#0f766e', rev: 0, count: 0 },
        tour: { label: 'แพ็กเกจทัวร์และกิจกรรม (Tours)', color: '#64748b', rev: 0, count: 0 }`
);
adminHtml = adminHtml.replace(
  'background:linear-gradient(90deg, #0284c7, #0d9488);',
  'background:var(--primary-navy);'
);

adminHtml = stripExcessiveEmojis(adminHtml);
fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('✓ Updated admin.html with Clean Human-Crafted Design System');
