const fs = require('fs');

console.log('=== Fixing Topbar Navbar Layout & Preventing Vertical Text Wrapping in index.html & admin.html ===');

let indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

// 1. Add strict nowrap, flex-shrink, and clean height rules to all navbar elements in index.html
const navbarFixCss = `
    /* Top Navbar Single-Line Alignment & Overflow Prevention */
    .navbar {
      height: 68px;
      display: flex;
      align-items: center;
    }
    .nav-container {
      width: 100%;
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 24px;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: nowrap;
    }
    .nav-left {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .badge-user {
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      padding: 4px 10px !important;
      line-height: 1.2 !important;
    }
    .nav-center-title {
      white-space: nowrap !important;
      flex-shrink: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 13.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .user-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .token-pill {
      height: 38px !important;
      padding: 0 13px !important;
      border-radius: 8px !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 8px !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
    }
    .token-pill > div:last-child {
      display: flex;
      align-items: baseline;
      gap: 5px;
      white-space: nowrap;
    }
    .token-val {
      font-size: 13.5px !important;
      font-weight: 700 !important;
      white-space: nowrap !important;
      line-height: 1 !important;
    }
    .token-sub {
      display: none !important;
    }
    .user-profile {
      display: inline-flex !important;
      align-items: center !important;
      gap: 9px !important;
      padding: 4px 8px !important;
      border-radius: 8px !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      transition: background 0.15s ease;
    }
    .user-profile:hover {
      background: #f1f5f9;
    }
    .user-avatar {
      width: 36px !important;
      height: 36px !important;
      flex-shrink: 0 !important;
    }
    .user-meta {
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      line-height: 1.25 !important;
      white-space: nowrap !important;
    }
    .user-name {
      font-size: 13px !important;
      font-weight: 700 !important;
      color: var(--ink) !important;
      white-space: nowrap !important;
    }
    .user-id {
      font-size: 11px !important;
      color: var(--muted) !important;
      white-space: nowrap !important;
    }

    @media (max-width: 1240px) {
      .nav-center-title {
        display: none !important;
      }
    }
    @media (max-width: 1024px) {
      .sync-status-pill {
        display: none !important;
      }
    }
    @media (max-width: 768px) {
      .user-meta {
        display: none !important;
      }
      .badge-user {
        display: none !important;
      }
    }
`;

indexHtml = indexHtml.replace('</style>', navbarFixCss + '\n</style>');

// 2. Move the theme selector out of the crowded topbar and into the Sidebar Footer in index.html
const topbarThemeSelect = `          <select id="ui-theme-selector" class="theme-Select-pill" onchange="applyUiTheme(this.value)" title="เปลี่ยนโทนสีของเว็บไซต์">
            <option value="clean-ota">โทนสี: Clean OTA (Navy)</option>
            <option value="boutique">โทนสี: Boutique Luxury (Emerald)</option>
            <option value="minimal-slate">โทนสี: Minimal Slate (Monochrome)</option>
          </select>\n`;

if (indexHtml.includes(topbarThemeSelect)) {
  indexHtml = indexHtml.replace(topbarThemeSelect, '');
  console.log('✓ Removed crowded theme dropdown from index.html topbar');
}

const sidebarFooterAnchor = `      <!-- Sidebar Footer -->
      <div class="sidebar-footer">`;

const sidebarFooterWithTheme = `      <!-- Sidebar Footer -->
      <div class="sidebar-footer">
        <div style="margin-bottom:10px;">
          <select id="ui-theme-selector" class="theme-Select-pill" style="width:100%;" onchange="applyUiTheme(this.value)" title="เปลี่ยนโทนสีของเว็บไซต์">
            <option value="clean-ota">โทนสี: Clean OTA (Navy)</option>
            <option value="boutique">โทนสี: Boutique Luxury (Emerald)</option>
            <option value="minimal-slate">โทนสี: Minimal Slate (Monochrome)</option>
          </select>
        </div>`;

if (indexHtml.includes(sidebarFooterAnchor) && !indexHtml.includes('id="ui-theme-selector"')) {
  indexHtml = indexHtml.replace(sidebarFooterAnchor, sidebarFooterWithTheme);
  console.log('✓ Placed theme selector neatly inside Sidebar Footer in index.html');
}

fs.writeFileSync('index.html', indexHtml, 'utf8');

// 3. Also make admin.html topbar clean and compact
let adminHtml = fs.readFileSync('admin.html', 'utf8').replace(/\r\n/g, '\n');
adminHtml = adminHtml.replace(
  `<option value="clean-ota">โทนสี: Clean OTA (Navy)</option>\n            <option value="boutique">โทนสี: Boutique Luxury (Emerald)</option>\n            <option value="minimal-slate">โทนสี: Minimal Slate (Monochrome)</option>`,
  `<option value="clean-ota">Theme: Clean Navy</option>\n            <option value="boutique">Theme: Boutique Teal</option>\n            <option value="minimal-slate">Theme: Minimal Slate</option>`
);
fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('✓ Updated admin.html topbar theme selector');
