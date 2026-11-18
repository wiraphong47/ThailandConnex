const fs = require('fs');

console.log('=== Upgrading Pagination UI to Pro Enterprise Design in index.html & admin.html ===');

// ============================================================================
// PART 1: UPGRADE index.html PAGINATION CSS & JS
// ============================================================================
let indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

const proPaginationCss = `
    /* ===================================================================== */
    /* PRO ENTERPRISE PAGINATION BAR UI                                      */
    /* ===================================================================== */
    .pro-pagination-card {
      width: 100%;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 14px 20px;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .pro-page-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: #475569;
      flex-wrap: wrap;
    }
    .pro-page-badge {
      background: #f0f9ff;
      color: #0369a1;
      border: 1px solid #bae6fd;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
    }
    .pro-page-nav-group {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #f8fafc;
      padding: 5px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      flex-wrap: nowrap;
      max-width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .pro-page-btn {
      min-width: 36px;
      height: 36px;
      padding: 0 10px;
      border-radius: 9px;
      border: 1px solid transparent;
      background: transparent;
      color: #334155;
      font-size: 13px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      white-space: nowrap;
      user-select: none;
      flex-shrink: 0;
    }
    .pro-page-btn:hover:not(:disabled):not(.active) {
      background: #ffffff;
      color: #0284c7;
      border-color: #cbd5e1;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
      transform: translateY(-1px);
    }
    .pro-page-btn.active {
      background: linear-gradient(135deg, #0284c7 0%, #083b7c 100%);
      color: #ffffff;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.32);
    }
    .pro-page-btn.nav-pill {
      background: #ffffff;
      border-color: #e2e8f0;
      padding: 0 13px;
      color: #0f172a;
      font-weight: 600;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    }
    .pro-page-btn.nav-pill:hover:not(:disabled) {
      background: #f0f9ff;
      border-color: #7dd3fc;
      color: #0284c7;
    }
    .pro-page-btn:disabled {
      opacity: 0.38;
      cursor: not-allowed;
      box-shadow: none;
    }
    .pro-page-dots {
      padding: 0 6px;
      color: #94a3b8;
      font-weight: 700;
      font-size: 13px;
      user-select: none;
    }
    .pro-page-jump {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      color: #64748b;
      font-weight: 600;
    }
    .pro-page-jump-input {
      width: 54px;
      height: 34px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      text-align: center;
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
      background: #f8fafc;
      outline: none;
      transition: all 0.15s;
    }
    .pro-page-jump-input:focus {
      background: #ffffff;
      border-color: #0284c7;
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.12);
    }
    .pro-page-jump-btn {
      height: 34px;
      padding: 0 12px;
      border-radius: 8px;
      background: #f1f5f9;
      color: #0f172a;
      border: 1px solid #cbd5e1;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s;
    }
    .pro-page-jump-btn:hover {
      background: #0284c7;
      color: #ffffff;
      border-color: #0284c7;
    }

    @media (max-width: 900px) {
      .pro-pagination-card {
        flex-direction: column;
        align-items: center;
        padding: 14px;
        gap: 12px;
      }
      .pro-page-meta {
        justify-content: center;
        text-align: center;
      }
    }
    @media (max-width: 520px) {
      .pro-page-btn .nav-text-lbl {
        display: none;
      }
      .pro-page-btn.nav-pill {
        padding: 0 10px;
      }
      .pro-page-btn {
        min-width: 33px;
        height: 33px;
        padding: 0 8px;
        font-size: 12.5px;
      }
    }
`;

indexHtml = indexHtml.replace('</style>', proPaginationCss + '\n</style>');

const oldRenderServicesPag = `    function renderServicesPagination(totalItems, currentPage, totalPages) {
      const pagEl = document.getElementById('services-pagination');
      if (!pagEl) return;
      if (totalItems <= servicesPerPage) {
        pagEl.innerHTML = '';
        return;
      }

      let pagesHtml = '';
      const maxButtons = 5;
      let startP = Math.max(1, currentPage - 2);
      let endP = Math.min(totalPages, startP + maxButtons - 1);
      if (endP - startP < maxButtons - 1) {
        startP = Math.max(1, endP - maxButtons + 1);
      }

      pagesHtml += \`<button onclick="changeServicesPage(\${currentPage - 1})" \${currentPage === 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} style="padding:7px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#fff; font-size:13px; font-weight:600; cursor:pointer;">◀ หน้าก่อนหน้า</button>\`;

      if (startP > 1) {
        pagesHtml += \`<button onclick="changeServicesPage(1)" style="padding:7px 12px; border-radius:8px; border:1px solid #cbd5e1; background:#fff; font-size:13px; cursor:pointer;">1</button>\`;
        if (startP > 2) pagesHtml += \`<span style="padding:0 4px; color:#94a3b8;">...</span>\`;
      }

      for (let p = startP; p <= endP; p++) {
        const isActive = p === currentPage;
        pagesHtml += \`<button onclick="changeServicesPage(\${p})" style="padding:7px 12px; border-radius:8px; border:1px solid \${isActive ? 'var(--blue)' : '#cbd5e1'}; background:\${isActive ? 'var(--blue)' : '#fff'}; color:\${isActive ? '#fff' : 'var(--navy)'}; font-size:13px; font-weight:\${isActive ? '700' : '500'}; cursor:pointer;">\${p}</button>\`;
      }

      if (endP < totalPages) {
        if (endP < totalPages - 1) pagesHtml += \`<span style="padding:0 4px; color:#94a3b8;">...</span>\`;
        pagesHtml += \`<button onclick="changeServicesPage(\${totalPages})" style="padding:7px 12px; border-radius:8px; border:1px solid #cbd5e1; background:#fff; font-size:13px; cursor:pointer;">\${totalPages}</button>\`;
      }

      pagesHtml += \`<button onclick="changeServicesPage(\${currentPage + 1})" \${currentPage === totalPages ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} style="padding:7px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#fff; font-size:13px; font-weight:600; cursor:pointer;">หน้าถัดไป ▶</button>\`;

      pagEl.innerHTML = \`
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; justify-content:center;">
          \${pagesHtml}
        </div>
        <div style="font-size:12px; color:var(--muted); text-align:center;">
          กำลังแสดงรายการที่ <b>\${(currentPage - 1) * servicesPerPage + 1} - \${Math.min(currentPage * servicesPerPage, totalItems)}</b> จากทั้งหมด <b>\${totalItems.toLocaleString('th-TH')}</b> รายการจริงในระบบ ThailandCONNEX
        </div>
      \`;
    }`;

const newRenderServicesPag = `    function renderServicesPagination(totalItems, currentPage, totalPages) {
      const pagEl = document.getElementById('services-pagination');
      if (!pagEl) return;
      if (totalItems <= servicesPerPage) {
        pagEl.innerHTML = '';
        return;
      }

      let pagesHtml = '';
      const maxButtons = 5;
      let startP = Math.max(1, currentPage - 2);
      let endP = Math.min(totalPages, startP + maxButtons - 1);
      if (endP - startP < maxButtons - 1) {
        startP = Math.max(1, endP - maxButtons + 1);
      }

      // Previous Button with crisp SVG icon
      pagesHtml += \`
        <button type="button" class="pro-page-btn nav-pill" onclick="changeServicesPage(\${currentPage - 1})" \${currentPage === 1 ? 'disabled' : ''} title="หน้าก่อนหน้า">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <span class="nav-text-lbl">ก่อนหน้า</span>
        </button>
      \`;

      if (startP > 1) {
        pagesHtml += \`<button type="button" class="pro-page-btn" onclick="changeServicesPage(1)">1</button>\`;
        if (startP > 2) pagesHtml += \`<span class="pro-page-dots">•••</span>\`;
      }

      for (let p = startP; p <= endP; p++) {
        const isActive = p === currentPage;
        pagesHtml += \`<button type="button" class="pro-page-btn \${isActive ? 'active' : ''}" onclick="changeServicesPage(\${p})">\${p}</button>\`;
      }

      if (endP < totalPages) {
        if (endP < totalPages - 1) pagesHtml += \`<span class="pro-page-dots">•••</span>\`;
        pagesHtml += \`<button type="button" class="pro-page-btn" onclick="changeServicesPage(\${totalPages})">\${totalPages}</button>\`;
      }

      // Next Button with crisp SVG icon (always stays on the same line inside .pro-page-nav-group)
      pagesHtml += \`
        <button type="button" class="pro-page-btn nav-pill" onclick="changeServicesPage(\${currentPage + 1})" \${currentPage === totalPages ? 'disabled' : ''} title="หน้าถัดไป">
          <span class="nav-text-lbl">ถัดไป</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      \`;

      const startItem = (currentPage - 1) * servicesPerPage + 1;
      const endItem = Math.min(currentPage * servicesPerPage, totalItems);

      pagEl.innerHTML = \`
        <div class="pro-pagination-card">
          <div class="pro-page-meta">
            <span class="pro-page-badge">หน้า \${currentPage} / \${totalPages}</span>
            <span>แสดงรายการที่ <b style="color:var(--navy);">\${startItem.toLocaleString('th-TH')} – \${endItem.toLocaleString('th-TH')}</b> จากทั้งหมด <b style="color:var(--navy);">\${totalItems.toLocaleString('th-TH')}</b> รายการ</span>
          </div>

          <div class="pro-page-nav-group">
            \${pagesHtml}
          </div>

          <div class="pro-page-jump">
            <span>ไปที่หน้า:</span>
            <input type="number" id="services-jump-input" class="pro-page-jump-input" min="1" max="\${totalPages}" value="\${currentPage}" onkeydown="if(event.key==='Enter') jumpToServicesPage(\${totalPages})">
            <button type="button" class="pro-page-jump-btn" onclick="jumpToServicesPage(\${totalPages})">ไป ➔</button>
          </div>
        </div>
      \`;
    }

    function jumpToServicesPage(maxPage) {
      const inp = document.getElementById('services-jump-input');
      if (!inp) return;
      let p = parseInt(inp.value, 10);
      if (isNaN(p) || p < 1) p = 1;
      if (p > maxPage) p = maxPage;
      changeServicesPage(p);
    }`;

if (indexHtml.includes(oldRenderServicesPag)) {
  indexHtml = indexHtml.replace(oldRenderServicesPag, newRenderServicesPag);
  console.log('✓ Upgraded renderServicesPagination in index.html');
} else {
  console.error('✗ Failed to match oldRenderServicesPag in index.html');
}

fs.writeFileSync('index.html', indexHtml, 'utf8');

// ============================================================================
// PART 2: UPGRADE admin.html PAGINATION CSS & JS
// ============================================================================
let adminHtml = fs.readFileSync('admin.html', 'utf8').replace(/\r\n/g, '\n');

const oldAdminPagCss = `    /* Table Pagination Styles */
    .table-pagination-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 18px;
      border-top: 1px solid var(--border-line);
      background: #fafcff;
      border-radius: 0 0 10px 10px;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 13px;
    }
    .pagination-controls {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .page-nav-btn {
      min-width: 34px;
      height: 34px;
      padding: 0 8px;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      color: #334155;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    .page-nav-btn:hover:not(:disabled) {
      background: #f1f5f9;
      border-color: #94a3b8;
      color: var(--primary-blue);
    }
    .page-nav-btn.active {
      background: var(--primary-blue);
      border-color: var(--primary-blue);
      color: #ffffff;
      font-weight: 700;
    }
    .page-nav-btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      background: #f8fafc;
    }
    .page-nav-ellipsis {
      padding: 0 4px;
      color: #94a3b8;
      font-weight: 700;
    }`;

const newAdminPagCss = `    /* Table Pagination Styles (Pro Enterprise UI) */
    .table-pagination-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 20px;
      border-top: 1px solid var(--border-line);
      background: #ffffff;
      border-radius: 0 0 12px 12px;
      flex-wrap: wrap;
      gap: 14px;
      font-size: 13px;
    }
    .pagination-controls {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #f8fafc;
      padding: 4px;
      border-radius: 11px;
      border: 1px solid #e2e8f0;
      flex-wrap: nowrap;
      max-width: 100%;
      overflow-x: auto;
    }
    .page-nav-btn {
      min-width: 34px;
      height: 34px;
      padding: 0 10px;
      border-radius: 8px;
      border: 1px solid transparent;
      background: transparent;
      color: #334155;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .page-nav-btn:hover:not(:disabled):not(.active) {
      background: #ffffff;
      border-color: #cbd5e1;
      color: #0284c7;
      box-shadow: 0 2px 5px rgba(15, 23, 42, 0.06);
      transform: translateY(-1px);
    }
    .page-nav-btn.active {
      background: linear-gradient(135deg, #0284c7 0%, #083b7c 100%);
      color: #ffffff;
      font-weight: 700;
      box-shadow: 0 3px 10px rgba(2, 132, 199, 0.3);
    }
    .page-nav-btn.nav-step {
      background: #ffffff;
      border-color: #e2e8f0;
      color: #0f172a;
      padding: 0 12px;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    }
    .page-nav-btn.nav-step:hover:not(:disabled) {
      background: #f0f9ff;
      border-color: #7dd3fc;
      color: #0284c7;
    }
    .page-nav-btn:disabled {
      opacity: 0.38;
      cursor: not-allowed;
      box-shadow: none;
    }
    .page-nav-ellipsis {
      padding: 0 5px;
      color: #94a3b8;
      font-weight: 700;
      font-size: 12px;
    }`;

if (adminHtml.includes(oldAdminPagCss)) {
  adminHtml = adminHtml.replace(oldAdminPagCss, newAdminPagCss);
  console.log('✓ Upgraded pagination CSS in admin.html');
}

const oldAdminGenericPag = `          <div class="pagination-controls">
            <button class="page-nav-btn" title="หน้าแรก" \${currentPage === 1 ? 'disabled' : ''} onclick="\${goToPageFnPrefix}1)">«</button>
            <button class="page-nav-btn" title="ก่อนหน้า" \${currentPage === 1 ? 'disabled' : ''} onclick="\${goToPageFnPrefix}\${currentPage - 1})">‹</button>
            \${pagesHtml}
            <button class="page-nav-btn" title="ถัดไป" \${currentPage === totalPages ? 'disabled' : ''} onclick="\${goToPageFnPrefix}\${currentPage + 1})">›</button>
            <button class="page-nav-btn" title="หน้าสุดท้าย" \${currentPage === totalPages ? 'disabled' : ''} onclick="\${goToPageFnPrefix}\${totalPages})">»</button>
          </div>`;

const newAdminGenericPag = `          <div class="pagination-controls">
            <button class="page-nav-btn nav-step" title="ก่อนหน้า" \${currentPage === 1 ? 'disabled' : ''} onclick="\${goToPageFnPrefix}\${currentPage - 1})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              <span>ก่อนหน้า</span>
            </button>
            \${pagesHtml}
            <button class="page-nav-btn nav-step" title="ถัดไป" \${currentPage === totalPages ? 'disabled' : ''} onclick="\${goToPageFnPrefix}\${currentPage + 1})">
              <span>ถัดไป</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>`;

if (adminHtml.includes(oldAdminGenericPag)) {
  adminHtml = adminHtml.replace(oldAdminGenericPag, newAdminGenericPag);
  console.log('✓ Upgraded renderGenericPaginationFooter in admin.html');
}

fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('=== Done! ===');
