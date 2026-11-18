const fs = require('fs');

console.log('=== Reverting Pagination UI back to original centered style ===');

// 1. Revert index.html pagination
let indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

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

const origRenderServicesPag = `    function renderServicesPagination(totalItems, currentPage, totalPages) {
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

      pagesHtml += \`<button onclick="changeServicesPage(\${currentPage - 1})" \${currentPage === 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} style="padding:7px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#fff; font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap;">◀ หน้าก่อนหน้า</button>\`;

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

      pagesHtml += \`<button onclick="changeServicesPage(\${currentPage + 1})" \${currentPage === totalPages ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} style="padding:7px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#fff; font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap;">หน้าถัดไป ▶</button>\`;

      pagEl.innerHTML = \`
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:nowrap; overflow-x:auto; max-width:100%; padding-bottom:4px; justify-content:center;">
          \${pagesHtml}
        </div>
        <div style="font-size:12px; color:var(--muted); text-align:center;">
          กำลังแสดงรายการที่ <b>\${(currentPage - 1) * servicesPerPage + 1} - \${Math.min(currentPage * servicesPerPage, totalItems)}</b> จากทั้งหมด <b>\${totalItems.toLocaleString('th-TH')}</b> รายการจริงในระบบ ThailandCONNEX
        </div>
      \`;
    }`;

if (indexHtml.includes(newRenderServicesPag)) {
  indexHtml = indexHtml.replace(newRenderServicesPag, origRenderServicesPag);
  console.log('✓ Reverted renderServicesPagination in index.html to original style');
}

fs.writeFileSync('index.html', indexHtml, 'utf8');

// 2. Revert admin.html pagination
let adminHtml = fs.readFileSync('admin.html', 'utf8').replace(/\r\n/g, '\n');

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

const origAdminGenericPag = `          <div class="pagination-controls">
            <button class="page-nav-btn" title="หน้าแรก" \${currentPage === 1 ? 'disabled' : ''} onclick="\${goToPageFnPrefix}1)">«</button>
            <button class="page-nav-btn" title="ก่อนหน้า" \${currentPage === 1 ? 'disabled' : ''} onclick="\${goToPageFnPrefix}\${currentPage - 1})">‹</button>
            \${pagesHtml}
            <button class="page-nav-btn" title="ถัดไป" \${currentPage === totalPages ? 'disabled' : ''} onclick="\${goToPageFnPrefix}\${currentPage + 1})">›</button>
            <button class="page-nav-btn" title="หน้าสุดท้าย" \${currentPage === totalPages ? 'disabled' : ''} onclick="\${goToPageFnPrefix}\${totalPages})">»</button>
          </div>`;

if (adminHtml.includes(newAdminGenericPag)) {
  adminHtml = adminHtml.replace(newAdminGenericPag, origAdminGenericPag);
  console.log('✓ Reverted renderGenericPaginationFooter in admin.html to original style');
}

fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('=== Done! ===');
