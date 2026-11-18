const fs = require('fs');

console.log('=== Fixing Responsive Layout & Card Grid Across All Breakpoints ===');

let indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

// 1. Improve base .card-category-badge, .card-foot, .btn-book, .coupon-img
const oldCardCss = `    .card-category-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(8, 59, 124, 0.85);
      color: #ffffff;
      backdrop-filter: blur(4px);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }`;

const newCardCss = `    .card-category-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      max-width: calc(100% - 88px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background: rgba(8, 59, 124, 0.88);
      color: #ffffff;
      backdrop-filter: blur(4px);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }`;

if (indexHtml.includes(oldCardCss)) {
  indexHtml = indexHtml.replace(oldCardCss, newCardCss);
  console.log('✓ Updated .card-category-badge to prevent badge overlap');
}

const oldCardFootCss = `    .card-foot {
      margin-top: auto;
      padding-top: 14px;
      border-top: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .price-wrap {
      display: flex;
      flex-direction: column;
    }
    .price-sub {
      font-size: 10px;
      color: var(--muted);
      text-transform: uppercase;
    }
    .price-val {
      font-family: 'IBM Plex Sans Thai', sans-serif;
      font-size: 19px;
      font-weight: 800;
      color: var(--navy);
    }
    .btn-book {
      background: var(--blue);
      color: #ffffff;
      padding: 9px 16px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 12px;
      transition: background 0.15s;
    }`;

const newCardFootCss = `    .card-foot {
      margin-top: auto;
      padding-top: 14px;
      border-top: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .price-wrap {
      display: flex;
      flex-direction: column;
      min-width: 90px;
    }
    .price-sub {
      font-size: 10.5px;
      color: var(--muted);
      white-space: nowrap;
    }
    .price-val {
      font-family: 'IBM Plex Sans Thai', sans-serif;
      font-size: 19px;
      font-weight: 800;
      color: var(--navy);
      white-space: nowrap;
    }
    .card-actions-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .btn-detail {
      background: #f1f5f9;
      color: var(--navy);
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    .btn-detail:hover {
      background: #e2e8f0;
    }
    .btn-book {
      background: var(--blue);
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 12px;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
    }`;

if (indexHtml.includes(oldCardFootCss)) {
  indexHtml = indexHtml.replace(oldCardFootCss, newCardFootCss);
  console.log('✓ Updated .card-foot, .btn-detail, and .btn-book with white-space: nowrap');
}

// Ensure .coupon-img has min-height when stacked
indexHtml = indexHtml.replace(
  `.coupon-img {\n      background-size: cover;\n      background-position: center;\n    }`,
  `.coupon-img {\n      background-size: cover;\n      background-position: center;\n      min-height: 150px;\n    }`
);

// 2. Remove the old partial responsive block at lines 1259-1304 so there is only ONE authoritative responsive section at the bottom
const oldEarlyResponsive = `    /* Responsive */
    @media (max-width: 1024px) {
      .search-row {
        grid-template-columns: 1fr 1fr;
      }
      .coupon-ticket {
        grid-template-columns: 1fr;
      }
      .coupon-side {
        border-left: 0;
        border-top: 2px dashed #cbd5e1;
        flex-direction: row;
      }
      .nav-center-title {
        display: none;
      }
    }
    @media (max-width: 768px) {
      .nav-container {
        padding: 0 16px;
      }
      .main-body {
        padding: 16px;
      }
      .search-row {
        grid-template-columns: 1fr;
      }
      .grid-3, .grid-4 {
        grid-template-columns: 1fr;
      }
      .user-meta {
        display: none;
      }
      .token-sub {
        display: none;
      }
    }
    @media (max-width: 640px) {
      .btn-admin-switch .btn-admin-text,
      .btn-admin-switch .btn-admin-arrow {
        display: none;
      }
      .btn-admin-switch {
        padding: 7px 10px;
      }
    }`;

if (indexHtml.includes(oldEarlyResponsive)) {
  indexHtml = indexHtml.replace(oldEarlyResponsive, '    /* Responsive rules consolidated at bottom of stylesheet */');
  console.log('✓ Removed duplicate early @media block');
}

// 3. Replace the bottom responsive block with a clean, properly cascading set of breakpoints
const startMarker = '    /* Comprehensive Multi-Platform Responsive Media Queries */';
const endMarker = '    .amenity-card {';
const sIdx = indexHtml.indexOf(startMarker);
const eIdx = indexHtml.indexOf(endMarker);

if (sIdx !== -1 && eIdx !== -1 && eIdx > sIdx) {
  const unifiedResponsiveCss = `    /* Comprehensive Multi-Platform Responsive Media Queries */
    /* 1. Tablet Landscape & Small Laptop (max-width: 1080px) */
    @media (max-width: 1080px) {
      .grid-3 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
      }
      .grid-4 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }
      .wallet-top-grid {
        grid-template-columns: 1fr;
      }
      .hero-stats {
        grid-template-columns: repeat(2, 1fr);
      }
      .sync-status-pill,
      .nav-center-title {
        display: none;
      }
      .search-row {
        grid-template-columns: 1fr 1fr;
      }
      .search-row .btn-search {
        grid-column: 1 / -1;
        justify-content: center;
      }
      .coupon-ticket {
        grid-template-columns: 1fr;
      }
      .coupon-side {
        border-left: 0;
        border-top: 2px dashed #cbd5e1;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    /* 2. Tablet Portrait & Large Phones (max-width: 768px) */
    @media (max-width: 768px) {
      .nav-container {
        padding: 0 14px;
        height: 62px;
        gap: 8px;
      }
      .main-body {
        padding: 16px 14px 40px;
      }
      .brand {
        font-size: 19px;
      }
      .badge-user,
      .user-meta,
      .token-sub {
        display: none;
      }
      .user-actions {
        gap: 8px;
      }
      .user-hero {
        padding: 26px 18px 36px;
        border-radius: 18px;
      }
      .hero-title {
        font-size: 25px;
      }
      .hero-desc {
        font-size: 13.5px;
      }
      .search-card {
        padding: 16px;
        margin-top: -22px;
      }
      .search-row {
        grid-template-columns: 1fr !important;
        gap: 12px;
      }
      .search-row .btn-search {
        width: 100%;
        height: 44px;
      }
      /* Force 1-column cards on 768px and below so cards never look squished */
      .grid-3,
      .grid-4 {
        grid-template-columns: 1fr !important;
        gap: 16px;
      }
      .category-pills {
        flex-wrap: nowrap;
        overflow-x: auto;
        padding-bottom: 6px;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
      }
      .cat-pill {
        white-space: nowrap;
        flex-shrink: 0;
      }
      .section-head {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
      .table-toolbar {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }
      .table-actions {
        flex-wrap: wrap;
        width: 100%;
      }
      .table-search,
      .table-filter-select {
        flex: 1 1 100%;
        width: 100%;
      }
      .table-foot {
        flex-direction: column;
        gap: 10px;
        align-items: center;
        text-align: center;
      }
      .hotel-gallery-grid {
        grid-template-columns: 1fr;
      }
      .hotel-hero-img {
        height: 230px;
      }
      .hotel-thumbs-list {
        grid-template-columns: repeat(4, 1fr);
      }
      .hotel-thumb-item {
        min-height: 64px;
      }
      .modal-backdrop {
        padding: 10px;
      }
      .modal-box,
      .modal-box.modal-large {
        width: 100%;
        max-height: 92vh;
        margin: 0;
        border-radius: 16px;
      }
      .modal-head {
        padding: 14px 16px;
      }
      .modal-body {
        padding: 16px !important;
      }
      .modal-foot {
        padding: 12px 16px !important;
        flex-direction: column;
        align-items: stretch !important;
      }
      .modal-foot > div {
        width: 100%;
        justify-content: space-between;
      }
      .lightbox-backdrop {
        padding: 12px;
      }
      .lightbox-arrow {
        width: 40px;
        height: 40px;
        font-size: 16px;
      }
      .lightbox-arrow.prev { left: 8px; }
      .lightbox-arrow.next { right: 8px; }
    }

    /* 3. Mobile Phones (max-width: 640px) */
    @media (max-width: 640px) {
      .btn-admin-switch .btn-admin-text,
      .btn-admin-switch .btn-admin-arrow {
        display: none;
      }
      .btn-admin-switch {
        padding: 7px 10px;
      }
      .hero-stats {
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .stat-box {
        padding: 10px 12px;
      }
      .stat-val {
        font-size: 16px;
      }
      .card-thumb {
        height: 190px;
      }
      .card-body {
        padding: 16px;
      }
      .card-foot {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .card-actions-wrap {
        display: flex;
        gap: 8px;
      }
      .btn-detail,
      .btn-book {
        padding: 9px 14px;
        font-size: 12.5px;
      }
      .sidebar {
        width: 86vw;
        max-width: 310px;
      }
      .toast-box {
        left: 12px;
        right: 12px;
        bottom: 14px;
      }
      .toast-item {
        min-width: 0;
        width: 100%;
      }
    }

    /* 4. Compact Mobile Phones (max-width: 400px) */
    @media (max-width: 400px) {
      .brand {
        font-size: 17px;
      }
      .token-pill {
        padding: 5px 9px;
      }
      .token-val {
        font-size: 12px;
      }
      .btn-auth-header {
        padding: 6px 10px;
        font-size: 11.5px;
      }
      .card-foot {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
      .card-actions-wrap {
        width: 100%;
        display: grid !important;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .btn-detail,
      .btn-book {
        width: 100%;
        text-align: center;
      }
    }
`;
  indexHtml = indexHtml.slice(0, sIdx) + unifiedResponsiveCss + indexHtml.slice(eIdx);
  console.log('✓ Replaced responsive block with clean cascade-ordered breakpoints');
}

// 4. Update renderServices card HTML to use .card-actions-wrap and clean button classes
const oldCardFootHtml = `              <div style="display:flex; gap:6px;">
                <button class="btn-detail" onclick="event.stopPropagation(); openAccommodationDetail('\${item.id}')" style="background:#f1f5f9; color:var(--navy); border:1px solid #cbd5e1; border-radius:8px; padding:7px 11px; font-size:12px; font-weight:600; cursor:pointer;" title="ดูข้อมูลและรายละเอียด">
                  ดูรายละเอียด
                </button>
                <button class="btn-book" onclick="event.stopPropagation(); instantBook('\${item.id}')">
                  จองทันที (Book)
                </button>
              </div>`;

const newCardFootHtml = `              <div class="card-actions-wrap">
                <button class="btn-detail" onclick="event.stopPropagation(); openAccommodationDetail('\${item.id}')" title="ดูข้อมูลและรายละเอียด">
                  ดูรายละเอียด
                </button>
                <button class="btn-book" onclick="event.stopPropagation(); instantBook('\${item.id}')">
                  จองทันที (Book)
                </button>
              </div>`;

if (indexHtml.includes(oldCardFootHtml)) {
  indexHtml = indexHtml.replace(oldCardFootHtml, newCardFootHtml);
  console.log('✓ Updated renderServices card buttons markup');
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('✓ Saved index.html successfully');
