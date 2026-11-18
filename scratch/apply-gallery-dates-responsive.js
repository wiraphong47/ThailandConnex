const fs = require('fs');
const { execSync } = require('child_process');

console.log('=== Restoring clean base from HEAD and applying all updates with normalized LF ===');

let indexHtml = execSync('git show HEAD:index.html', { maxBuffer: 20 * 1024 * 1024 }).toString('utf8').replace(/\r\n/g, '\n');
let adminHtml = execSync('git show HEAD:admin.html', { maxBuffer: 20 * 1024 * 1024 }).toString('utf8').replace(/\r\n/g, '\n');

// ============================================================================
// PART 1: UPDATE index.html
// ============================================================================

// 1A. Replace inline grid on #view-wallet with responsive class .wallet-top-grid
if (indexHtml.includes('<div style="display:grid; grid-template-columns:1.2fr 1.8fr; gap:24px; margin-bottom:28px;">')) {
  indexHtml = indexHtml.replace(
    '<div style="display:grid; grid-template-columns:1.2fr 1.8fr; gap:24px; margin-bottom:28px;">',
    '<div class="wallet-top-grid">'
  );
  console.log('✓ 1A: Replaced wallet inline grid with .wallet-top-grid');
}

// 1B. Enhance CSS for Gallery, Lightbox, and Comprehensive Responsive Breakpoints
const oldModalGalleryCss = `    /* Modal Accommodation Details */
    .modal-box.modal-large {
      max-width: 860px;
      width: 95%;
    }
    .hotel-gallery-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 10px;
      margin-bottom: 18px;
    }
    @media (max-width: 640px) {
      .hotel-gallery-grid {
        grid-template-columns: 1fr;
      }
    }
    .hotel-hero-img {
      height: 280px;
      background-size: cover;
      background-position: center;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      transition: background-image 0.25s ease-in-out;
    }
    .hotel-thumb-item {
      height: 85px;
      background-size: cover;
      background-position: center;
      border-radius: 8px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.2s ease;
    }
    .hotel-thumb-item:hover, .hotel-thumb-item.active {
      border-color: var(--primary-blue, #083b7c);
      transform: scale(1.02);
    }`;

const newModalGalleryCss = `    /* Wallet Top Grid */
    .wallet-top-grid {
      display: grid;
      grid-template-columns: 1.2fr 1.8fr;
      gap: 24px;
      margin-bottom: 28px;
    }

    /* Modal Accommodation Details & Interactive Gallery */
    .modal-box.modal-large {
      max-width: 880px;
      width: 95%;
    }
    .hotel-gallery-grid {
      display: grid;
      grid-template-columns: 2.2fr 1fr;
      gap: 12px;
      margin-bottom: 18px;
    }
    .hotel-hero-img {
      height: 310px;
      background-size: cover;
      background-position: center;
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.1);
      transition: background-image 0.25s ease-in-out;
      position: relative;
      cursor: zoom-in;
      overflow: hidden;
      user-select: none;
    }
    .hotel-hero-img::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(15,23,42,0.45) 0%, transparent 40%);
      pointer-events: none;
    }
    .hero-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(15, 23, 42, 0.65);
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.35);
      display: grid;
      place-items: center;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      z-index: 3;
      transition: all 0.2s ease;
      backdrop-filter: blur(4px);
    }
    .hero-nav-btn:hover {
      background: rgba(2, 132, 199, 0.95);
      transform: translateY(-50%) scale(1.08);
    }
    .hero-nav-btn.prev { left: 12px; }
    .hero-nav-btn.next { right: 12px; }
    .hero-zoom-badge {
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: rgba(15, 23, 42, 0.78);
      color: #ffffff;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      z-index: 3;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.25);
      backdrop-filter: blur(4px);
      transition: all 0.2s ease;
    }
    .hero-zoom-badge:hover {
      background: #0284c7;
      transform: translateY(-1px);
    }
    .hotel-thumbs-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 1fr;
      gap: 10px;
    }
    .hotel-thumb-item {
      min-height: 92px;
      background-size: cover;
      background-position: center;
      border-radius: 10px;
      cursor: pointer;
      border: 2.5px solid transparent;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }
    .hotel-thumb-item::after {
      content: '🔍 ดูรูป';
      position: absolute;
      inset: 0;
      background: rgba(8, 59, 124, 0.45);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      display: grid;
      place-items: center;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .hotel-thumb-item:hover::after {
      opacity: 1;
    }
    .hotel-thumb-item:hover, .hotel-thumb-item.active {
      border-color: #0284c7;
      box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.25);
      transform: translateY(-1px);
    }

    /* Full-Screen Image Lightbox Modal */
    .lightbox-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(9, 14, 26, 0.94);
      backdrop-filter: blur(8px);
      z-index: 20000;
      display: none;
      flex-direction: column;
      justify-content: space-between;
      padding: 16px 24px 20px;
      user-select: none;
      animation: fadeIn 0.2s ease;
    }
    .lightbox-backdrop.show {
      display: flex;
    }
    .lightbox-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ffffff;
      gap: 12px;
      z-index: 5;
    }
    .lightbox-title-wrap {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .lightbox-title {
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .lightbox-counter {
      font-size: 12px;
      color: #38bdf8;
      font-weight: 600;
    }
    .lightbox-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .lightbox-btn {
      background: rgba(255,255,255,0.14);
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.22);
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .lightbox-btn:hover {
      background: rgba(255,255,255,0.26);
    }
    .lightbox-btn.close-btn {
      background: rgba(239, 68, 68, 0.25);
      border-color: rgba(239, 68, 68, 0.5);
      color: #fecaca;
    }
    .lightbox-btn.close-btn:hover {
      background: #ef4444;
      color: #ffffff;
    }
    .lightbox-stage {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      margin: 12px 0;
      min-height: 0;
    }
    .lightbox-main-img {
      max-width: 90%;
      max-height: 70vh;
      object-fit: contain;
      border-radius: 12px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.65);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: zoom-in;
    }
    .lightbox-main-img.zoomed {
      transform: scale(1.65);
      cursor: zoom-out;
    }
    .lightbox-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255,255,255,0.16);
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.3);
      display: grid;
      place-items: center;
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      z-index: 5;
      transition: all 0.2s ease;
      backdrop-filter: blur(6px);
    }
    .lightbox-arrow:hover {
      background: #0284c7;
      border-color: #38bdf8;
      transform: translateY(-50%) scale(1.08);
    }
    .lightbox-arrow.prev { left: 16px; }
    .lightbox-arrow.next { right: 16px; }
    .lightbox-thumbs {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      overflow-x: auto;
      padding: 6px 4px;
      z-index: 5;
    }
    .lightbox-thumb {
      width: 78px;
      height: 54px;
      border-radius: 8px;
      background-size: cover;
      background-position: center;
      cursor: pointer;
      border: 2px solid rgba(255,255,255,0.2);
      opacity: 0.55;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .lightbox-thumb:hover, .lightbox-thumb.active {
      opacity: 1;
      border-color: #38bdf8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(56, 189, 248, 0.4);
    }

    /* Comprehensive Multi-Platform Responsive Media Queries */
    @media (max-width: 1024px) {
      .grid-3 {
        grid-template-columns: repeat(2, 1fr);
      }
      .grid-4 {
        grid-template-columns: repeat(2, 1fr);
      }
      .wallet-top-grid {
        grid-template-columns: 1fr;
      }
      .hero-stats {
        grid-template-columns: repeat(2, 1fr);
      }
      .sync-status-pill {
        display: none;
      }
      .search-row {
        grid-template-columns: 1fr 1fr;
      }
      .search-row .btn-search {
        grid-column: 1 / -1;
        justify-content: center;
      }
    }
    @media (max-width: 768px) {
      .nav-container {
        padding: 0 12px;
        height: 62px;
        gap: 8px;
      }
      .brand {
        font-size: 19px;
      }
      .badge-user {
        display: none;
      }
      .user-actions {
        gap: 8px;
      }
      .user-hero {
        padding: 28px 20px;
        border-radius: 18px;
      }
      .hero-title {
        font-size: 26px;
      }
      .hero-desc {
        font-size: 13.5px;
      }
      .search-card {
        padding: 16px;
        margin-top: -22px;
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
      .table-search, .table-filter-select {
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
      .modal-box, .modal-box.modal-large {
        width: 96%;
        max-height: 92vh;
        margin: 8px;
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
    @media (max-width: 480px) {
      .hero-stats {
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .stat-box {
        padding: 10px;
      }
      .stat-val {
        font-size: 16px;
      }
      .token-pill {
        padding: 5px 10px;
      }
      .token-val {
        font-size: 12.5px;
      }
      .btn-auth-header {
        padding: 6px 12px;
        font-size: 12px;
      }
      .card-foot {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
      .card-foot > div:last-child {
        width: 100%;
        display: grid !important;
        grid-template-columns: 1fr 1fr;
      }
      .sidebar {
        width: 88vw;
        max-width: 310px;
      }
    }`;

if (indexHtml.includes(oldModalGalleryCss)) {
  indexHtml = indexHtml.replace(oldModalGalleryCss, newModalGalleryCss);
  console.log('✓ 1B: Updated index.html gallery, lightbox, and responsive CSS');
} else {
  console.error('✗ 1B FAILED');
}

// 1C. Update Search Bar Check-in Date input in index.html
const oldSearchDateGroup = `            <div class="form-group">
              <label>วันที่เช็คอิน - เช็คเอาท์</label>
              <input type="date" id="booking-checkin" class="form-control" value="2026-11-20">
            </div>`;

const newSearchDateGroup = `            <div class="form-group">
              <label>วันที่เช็คอิน (วันนี้ / อนาคต)</label>
              <input type="date" id="booking-checkin" class="form-control" onchange="validateSearchDates()">
            </div>`;

if (indexHtml.includes(oldSearchDateGroup)) {
  indexHtml = indexHtml.replace(oldSearchDateGroup, newSearchDateGroup);
  console.log('✓ 1C: Updated search bar check-in input with validateSearchDates()');
} else {
  console.error('✗ 1C FAILED');
}

// 1D. Update Gallery Section inside #modal-accommodation-detail and add Full-Screen Lightbox Modal
const oldGalleryHtml = `        <!-- Gallery Section -->
        <div class="hotel-gallery-grid">
          <div id="hotel-main-img" class="hotel-hero-img"></div>
          <div id="hotel-gallery-thumbs" style="display:flex; flex-direction:column; gap:10px;">
            <!-- Thumbnails inserted dynamically -->
          </div>
        </div>`;

const newGalleryHtml = `        <!-- Gallery Section (Interactive + Fullscreen Lightbox Trigger) -->
        <div class="hotel-gallery-grid">
          <div id="hotel-main-img" class="hotel-hero-img" onclick="openImageLightbox(currentGalleryIndex)" title="คลิกเพื่อดูรูปภาพขนาดใหญ่">
            <button type="button" class="hero-nav-btn prev" onclick="event.stopPropagation(); stepHotelGallery(-1)" title="รูปก่อนหน้า">❮</button>
            <button type="button" class="hero-nav-btn next" onclick="event.stopPropagation(); stepHotelGallery(1)" title="รูปถัดไป">❯</button>
            <div class="hero-zoom-badge" onclick="event.stopPropagation(); openImageLightbox(currentGalleryIndex)">
              <span>🔍 คลิกดูรูปขยายใหญ่</span>
              <span id="hotel-hero-counter">(1/4)</span>
            </div>
          </div>
          <div id="hotel-gallery-thumbs" class="hotel-thumbs-list">
            <!-- All thumbnails inserted dynamically -->
          </div>
        </div>`;

if (indexHtml.includes(oldGalleryHtml)) {
  indexHtml = indexHtml.replace(oldGalleryHtml, newGalleryHtml);
  console.log('✓ 1D: Updated #modal-accommodation-detail gallery HTML');
} else {
  console.error('✗ 1D FAILED');
}

const detailModalEndMarker = `      <div class="modal-foot" style="background:#ffffff; border-top:1px solid #e2e8f0; padding:16px 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div>
          <span style="font-size:11.5px; color:var(--muted); display:block;">ราคาเริ่มต้น / คืน (รวมภาษีแล้ว)</span>
          <div style="display:flex; align-items:baseline; gap:6px;">
            <span id="hotel-footer-price" style="font-size:22px; font-weight:800; color:var(--navy);">฿28,999</span>
            <span style="font-size:12px; color:#059669; font-weight:600;" id="hotel-reward-token">+1,450 TCP Token</span>
          </div>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="btn-export" onclick="shareHotelDetail()">🔗 แชร์ข้อมูลที่พัก</button>
          <button class="btn-book" id="btn-modal-book" style="padding:10px 24px; font-size:14px; font-weight:700;" onclick="bookFromModal()">
            จองห้องพักนี้ทันที (Book Now)
          </button>
        </div>
      </div>
    </div>
  </div>`;

const detailModalWithLightbox = `${detailModalEndMarker}

  <!-- ============================================== -->
  <!-- MODAL: FULL-SCREEN IMAGE LIGHTBOX GALLERY      -->
  <!-- ============================================== -->
  <div class="lightbox-backdrop" id="modal-image-lightbox" onclick="if(event.target===this || event.target.classList.contains('lightbox-stage')) closeImageLightbox()">
    <div class="lightbox-top">
      <div class="lightbox-title-wrap">
        <div class="lightbox-title" id="lightbox-title">ภาพบรรยากาศที่พักและบริการ</div>
        <div class="lightbox-counter" id="lightbox-counter">รูปที่ 1 จาก 4</div>
      </div>
      <div class="lightbox-actions">
        <button type="button" class="lightbox-btn" onclick="toggleLightboxZoom()" id="btn-lightbox-zoom">
          🔍 ซูมขยาย
        </button>
        <button type="button" class="lightbox-btn close-btn" onclick="closeImageLightbox()">
          ✕ ปิดหน้าต่างรูป
        </button>
      </div>
    </div>
    <div class="lightbox-stage">
      <button type="button" class="lightbox-arrow prev" onclick="stepLightboxImage(-1)" title="รูปก่อนหน้า">❮</button>
      <img id="lightbox-main-img" class="lightbox-main-img" src="" alt="Gallery Preview" onclick="toggleLightboxZoom()">
      <button type="button" class="lightbox-arrow next" onclick="stepLightboxImage(1)" title="รูปถัดไป">❯</button>
    </div>
    <div class="lightbox-thumbs" id="lightbox-thumbs">
      <!-- Populated dynamically -->
    </div>
  </div>`;

if (indexHtml.includes(detailModalEndMarker)) {
  indexHtml = indexHtml.replace(detailModalEndMarker, detailModalWithLightbox);
  console.log('✓ 1E: Added #modal-image-lightbox full-screen viewer modal');
} else {
  console.error('✗ 1E FAILED');
}

// 1F. Update JS for Date Validation, Gallery & Lightbox in index.html
const oldDetailAndBookingJs = `    function openAccommodationDetail(serviceId) {
      currentDetailServiceId = serviceId;
      const s = (typeof TCStore !== 'undefined' && TCStore.getServiceById(serviceId)) ||
                (state.services && state.services.find(x => x.id === serviceId)) || null;

      const detail = accommodationDataDetails[serviceId] || {
        title: s ? s.title : 'รายละเอียดบริการ',
        cat: s ? s.categoryName : 'บริการท่องเที่ยว',
        rating: s ? \`\${s.rating} (ผู้ใช้ประเมินยอดเยี่ยม)\` : '4.9 ★',
        roomType: s ? (s.roomType || 'Standard Package') : 'Standard Package',
        roomSize: 'ตามมาตรฐาน ThailandCONNEX',
        capacity: 'ตามเงื่อนไขที่ระบุ',
        allotment: s ? \`เหลือ \${s.allotment || 10} สิทธิ์วันนี้\` : 'มีที่ว่างพร้อมจอง',
        location: s ? s.location : 'ประเทศไทย',
        provider: s ? \`ให้บริการโดย \${s.provider} • depa Verified\` : 'ThailandCONNEX Certified Partner',
        price: s ? s.price : 1000,
        checkIn: '14:00 น.',
        checkOut: '12:00 น.',
        cancellation: 'ยกเลิกฟรีล่วงหน้า 24-48 ชม.',
        description: s ? \`\${s.title} บริการคุณภาพมาตรฐานระดับสากล ผ่านการรับรองโดยสำนักงานส่งเสริมเศรษฐกิจดิจิทัล (depa) และการท่องเที่ยวแห่งประเทศไทย\` : '',
        gallery: [
          s ? s.image : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
        ],
        amenities: (s && s.features) ? s.features.map(f => \`✓ \${f}\`) : ['✓ มาตรฐาน SHA Plus', '✓ ประกันอุบัติเหตุ', '✓ ฟรี Wi-Fi']
      };

      document.getElementById('hotel-detail-title').textContent = detail.title;
      document.getElementById('hotel-detail-cat').textContent = detail.cat;
      document.getElementById('hotel-detail-rating').textContent = detail.rating;
      document.getElementById('hotel-room-type').textContent = detail.roomType;
      document.getElementById('hotel-room-size').textContent = detail.roomSize;
      document.getElementById('hotel-capacity').textContent = detail.capacity;
      document.getElementById('hotel-allotment').textContent = detail.allotment;
      document.getElementById('hotel-location-text').textContent = detail.location;
      document.getElementById('hotel-provider-text').textContent = detail.provider;
      document.getElementById('hotel-description').textContent = detail.description;
      document.getElementById('hotel-checkin').textContent = detail.checkIn;
      document.getElementById('hotel-checkout').textContent = detail.checkOut;
      document.getElementById('hotel-cancellation').textContent = detail.cancellation;
      document.getElementById('hotel-footer-price').textContent = \`฿\${detail.price.toLocaleString('th-TH')}\`;
      document.getElementById('hotel-reward-token').textContent = \`+\${Math.round(detail.price * 0.05).toLocaleString('th-TH')} TCP Token\`;

      // Set Main Image
      const mainImg = document.getElementById('hotel-main-img');
      mainImg.style.backgroundImage = \`url('\${detail.gallery[0]}')\`;

      // Set Gallery Thumbnails
      const thumbsContainer = document.getElementById('hotel-gallery-thumbs');
      thumbsContainer.innerHTML = detail.gallery.slice(1, 4).map((imgUrl, idx) => \`
        <div class="hotel-thumb-item" style="background-image:url('\${imgUrl}');" onclick="changeHotelHeroImage('\${imgUrl}')" title="คลิกเพื่อดูรูปภาพขนาดใหญ่"></div>
      \`).join('');

      // Set Amenities
      const amenitiesContainer = document.getElementById('hotel-amenities-list');
      amenitiesContainer.innerHTML = detail.amenities.map(a => \`
        <div class="amenity-card">\${a}</div>
      \`).join('');

      openModal('modal-accommodation-detail');
    }

    function changeHotelHeroImage(url) {
      const mainImg = document.getElementById('hotel-main-img');
      if (mainImg) mainImg.style.backgroundImage = \`url('\${url}')\`;
    }`;

const newDetailAndBookingJs = `    // Gallery & Lightbox State
    let currentGalleryImages = [];
    let currentGalleryIndex = 0;
    let currentGalleryTitle = '';

    // Date Helpers: Always enforce Today or Future dates in local time
    function getTodayDateStr() {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      return \`\${yyyy}-\${mm}-\${dd}\`;
    }

    function getFutureDateStr(days = 1, baseDateStr = null) {
      const d = baseDateStr ? new Date(baseDateStr + 'T00:00:00') : new Date();
      if (isNaN(d.getTime())) {
        const fallback = new Date();
        fallback.setDate(fallback.getDate() + days);
        return \`\${fallback.getFullYear()}-\${String(fallback.getMonth() + 1).padStart(2, '0')}-\${String(fallback.getDate()).padStart(2, '0')}\`;
      }
      d.setDate(d.getDate() + days);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return \`\${yyyy}-\${mm}-\${dd}\`;
    }

    function initDateConstraints() {
      const todayStr = getTodayDateStr();
      const searchCheckin = document.getElementById('booking-checkin');
      if (searchCheckin) {
        searchCheckin.min = todayStr;
        if (!searchCheckin.value || searchCheckin.value < todayStr) {
          searchCheckin.value = todayStr;
        }
      }
    }

    function validateSearchDates() {
      const todayStr = getTodayDateStr();
      const searchCheckin = document.getElementById('booking-checkin');
      if (searchCheckin && searchCheckin.value && searchCheckin.value < todayStr) {
        searchCheckin.value = todayStr;
        showToast('⚠️ ไม่สามารถเลือกวันที่ผ่านมาแล้วได้ ระบบปรับเป็นวันนี้ (' + todayStr + ') ให้อัตโนมัติ', true);
      }
    }

    function openAccommodationDetail(serviceId) {
      currentDetailServiceId = serviceId;
      const s = (typeof TCStore !== 'undefined' && TCStore.getServiceById(serviceId)) ||
                (state.services && state.services.find(x => x.id === serviceId)) || null;

      const defaultGallery = [
        s ? s.image : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
      ];

      const detail = accommodationDataDetails[serviceId] || {
        title: s ? s.title : 'รายละเอียดบริการ',
        cat: s ? s.categoryName : 'บริการท่องเที่ยว',
        rating: s ? \`\${s.rating} (ผู้ใช้ประเมินยอดเยี่ยม)\` : '4.9 ★',
        roomType: s ? (s.roomType || 'Standard Package') : 'Standard Package',
        roomSize: 'ตามมาตรฐาน ThailandCONNEX',
        capacity: 'ตามเงื่อนไขที่ระบุ',
        allotment: s ? \`เหลือ \${s.allotment || 10} สิทธิ์วันนี้\` : 'มีที่ว่างพร้อมจอง',
        location: s ? s.location : 'ประเทศไทย',
        provider: s ? \`ให้บริการโดย \${s.provider} • depa Verified\` : 'ThailandCONNEX Certified Partner',
        price: s ? s.price : 1000,
        checkIn: '14:00 น.',
        checkOut: '12:00 น.',
        cancellation: 'ยกเลิกฟรีล่วงหน้า 24-48 ชม.',
        description: s ? \`\${s.title} บริการคุณภาพมาตรฐานระดับสากล ผ่านการรับรองโดยสำนักงานส่งเสริมเศรษฐกิจดิจิทัล (depa) และการท่องเที่ยวแห่งประเทศไทย\` : '',
        gallery: defaultGallery,
        amenities: (s && s.features) ? s.features.map(f => \`✓ \${f}\`) : ['✓ มาตรฐาน SHA Plus', '✓ ประกันอุบัติเหตุ', '✓ ฟรี Wi-Fi']
      };

      // Ensure at least 4 distinct gallery images
      const gal = Array.isArray(detail.gallery) && detail.gallery.length > 0 ? [...detail.gallery] : [...defaultGallery];
      while (gal.length < 4) {
        gal.push(defaultGallery[gal.length % defaultGallery.length]);
      }
      currentGalleryImages = gal;
      currentGalleryIndex = 0;
      currentGalleryTitle = detail.title;

      document.getElementById('hotel-detail-title').textContent = detail.title;
      document.getElementById('hotel-detail-cat').textContent = detail.cat;
      document.getElementById('hotel-detail-rating').textContent = detail.rating;
      document.getElementById('hotel-room-type').textContent = detail.roomType;
      document.getElementById('hotel-room-size').textContent = detail.roomSize;
      document.getElementById('hotel-capacity').textContent = detail.capacity;
      document.getElementById('hotel-allotment').textContent = detail.allotment;
      document.getElementById('hotel-location-text').textContent = detail.location;
      document.getElementById('hotel-provider-text').textContent = detail.provider;
      document.getElementById('hotel-description').textContent = detail.description;
      document.getElementById('hotel-checkin').textContent = detail.checkIn;
      document.getElementById('hotel-checkout').textContent = detail.checkOut;
      document.getElementById('hotel-cancellation').textContent = detail.cancellation;
      document.getElementById('hotel-footer-price').textContent = \`฿\${detail.price.toLocaleString('th-TH')}\`;
      document.getElementById('hotel-reward-token').textContent = \`+\${Math.round(detail.price * 0.05).toLocaleString('th-TH')} TCP Token\`;

      renderHotelDetailGallery();

      // Set Amenities
      const amenitiesContainer = document.getElementById('hotel-amenities-list');
      amenitiesContainer.innerHTML = detail.amenities.map(a => \`
        <div class="amenity-card">\${a}</div>
      \`).join('');

      openModal('modal-accommodation-detail');
    }

    function renderHotelDetailGallery() {
      const mainImg = document.getElementById('hotel-main-img');
      const counterEl = document.getElementById('hotel-hero-counter');
      const thumbsContainer = document.getElementById('hotel-gallery-thumbs');
      if (!mainImg || !currentGalleryImages.length) return;

      const activeUrl = currentGalleryImages[currentGalleryIndex] || currentGalleryImages[0];
      mainImg.style.backgroundImage = \`url('\${activeUrl}')\`;
      if (counterEl) {
        counterEl.textContent = \`(\${currentGalleryIndex + 1}/\${currentGalleryImages.length})\`;
      }

      if (thumbsContainer) {
        thumbsContainer.innerHTML = currentGalleryImages.map((imgUrl, idx) => \`
          <div class="hotel-thumb-item \${idx === currentGalleryIndex ? 'active' : ''}"
               style="background-image:url('\${imgUrl}');"
               onclick="handleThumbClick(\${idx})"
               title="คลิกเพื่อเลือกดูรูป หรือคลิกซ้ำเพื่อขยายเต็มจอ"></div>
        \`).join('');
      }
    }

    function handleThumbClick(idx) {
      if (currentGalleryIndex === idx) {
        openImageLightbox(idx);
      } else {
        currentGalleryIndex = idx;
        renderHotelDetailGallery();
      }
    }

    function stepHotelGallery(delta) {
      if (!currentGalleryImages.length) return;
      currentGalleryIndex = (currentGalleryIndex + delta + currentGalleryImages.length) % currentGalleryImages.length;
      renderHotelDetailGallery();
    }

    function changeHotelHeroImage(url) {
      const idx = currentGalleryImages.indexOf(url);
      if (idx !== -1) {
        currentGalleryIndex = idx;
        renderHotelDetailGallery();
      } else {
        const mainImg = document.getElementById('hotel-main-img');
        if (mainImg) mainImg.style.backgroundImage = \`url('\${url}')\`;
      }
    }

    function openImageLightbox(index = 0) {
      if (!currentGalleryImages || !currentGalleryImages.length) return;
      currentGalleryIndex = index;
      const modal = document.getElementById('modal-image-lightbox');
      const imgEl = document.getElementById('lightbox-main-img');
      if (imgEl) imgEl.classList.remove('zoomed');
      const zoomBtn = document.getElementById('btn-lightbox-zoom');
      if (zoomBtn) zoomBtn.innerHTML = '🔍 ซูมขยาย';
      updateLightboxView();
      if (modal) modal.classList.add('show');
    }

    function closeImageLightbox() {
      const modal = document.getElementById('modal-image-lightbox');
      const imgEl = document.getElementById('lightbox-main-img');
      if (imgEl) imgEl.classList.remove('zoomed');
      if (modal) modal.classList.remove('show');
    }

    function stepLightboxImage(delta) {
      if (!currentGalleryImages.length) return;
      currentGalleryIndex = (currentGalleryIndex + delta + currentGalleryImages.length) % currentGalleryImages.length;
      const imgEl = document.getElementById('lightbox-main-img');
      if (imgEl) imgEl.classList.remove('zoomed');
      const zoomBtn = document.getElementById('btn-lightbox-zoom');
      if (zoomBtn) zoomBtn.innerHTML = '🔍 ซูมขยาย';
      updateLightboxView();
      renderHotelDetailGallery();
    }

    function selectLightboxImage(idx) {
      currentGalleryIndex = idx;
      const imgEl = document.getElementById('lightbox-main-img');
      if (imgEl) imgEl.classList.remove('zoomed');
      const zoomBtn = document.getElementById('btn-lightbox-zoom');
      if (zoomBtn) zoomBtn.innerHTML = '🔍 ซูมขยาย';
      updateLightboxView();
      renderHotelDetailGallery();
    }

    function toggleLightboxZoom() {
      const imgEl = document.getElementById('lightbox-main-img');
      const zoomBtn = document.getElementById('btn-lightbox-zoom');
      if (!imgEl) return;
      const isZoomed = imgEl.classList.toggle('zoomed');
      if (zoomBtn) {
        zoomBtn.innerHTML = isZoomed ? '🔍 ย่อขนาดปกติ' : '🔍 ซูมขยาย';
      }
    }

    function updateLightboxView() {
      const imgEl = document.getElementById('lightbox-main-img');
      const titleEl = document.getElementById('lightbox-title');
      const counterEl = document.getElementById('lightbox-counter');
      const thumbsEl = document.getElementById('lightbox-thumbs');
      const activeUrl = currentGalleryImages[currentGalleryIndex] || currentGalleryImages[0];

      if (imgEl) imgEl.src = activeUrl;
      if (titleEl) titleEl.textContent = currentGalleryTitle || 'ภาพบรรยากาศที่พักและบริการ';
      if (counterEl) counterEl.textContent = \`รูปที่ \${currentGalleryIndex + 1} จาก \${currentGalleryImages.length} (คลิกที่รูปเพื่อซูมขยาย)\`;
      if (thumbsEl) {
        thumbsEl.innerHTML = currentGalleryImages.map((url, idx) => \`
          <div class="lightbox-thumb \${idx === currentGalleryIndex ? 'active' : ''}"
               style="background-image:url('\${url}');"
               onclick="selectLightboxImage(\${idx})"></div>
        \`).join('');
      }
    }

    // Keyboard navigation for Lightbox
    document.addEventListener('keydown', (e) => {
      const lb = document.getElementById('modal-image-lightbox');
      if (lb && lb.classList.contains('show')) {
        if (e.key === 'ArrowRight') stepLightboxImage(1);
        else if (e.key === 'ArrowLeft') stepLightboxImage(-1);
        else if (e.key === 'Escape') closeImageLightbox();
      }
    });`;

if (indexHtml.includes(oldDetailAndBookingJs)) {
  indexHtml = indexHtml.replace(oldDetailAndBookingJs, newDetailAndBookingJs);
  console.log('✓ 1F: Updated openAccommodationDetail and added Lightbox + Date helper functions');
} else {
  console.error('✗ 1F FAILED');
}

// 1G. Update instantBook, openConfirmBookingModal, executeConfirmedBooking
const oldBookingConfirmFlow = `    // Instant booking entry point (Checks login -> Opens confirmation modal)
    function instantBook(serviceId) {
      if (!isUserLoggedIn()) {
        state.pendingBooking = { type: 'service', serviceId: serviceId };
        showToast('⚠️ กรุณาเข้าสู่ระบบก่อนทำการจองห้องพักหรือบริการท่องเที่ยว', true);
        openAuthModal('login');
        return;
      }

      const s = state.services.find(x => x.id === serviceId);
      if (!s) return;

      openConfirmBookingModal({
        type: 'service',
        serviceId: serviceId,
        title: s.title,
        provider: s.provider,
        category: s.categoryName || s.category || 'โรงแรมและที่พัก',
        price: s.price,
        checkin: '2026-11-20',
        checkout: '2026-11-22',
        image: s.image
      });
    }

    // Open booking confirmation modal
    function openConfirmBookingModal(data) {
      state.activeConfirmBooking = data;
      const body = document.getElementById('confirm-booking-body');
      if (!body) return;

      const rewardTCP = Math.round(data.price * 0.05);

      body.innerHTML = \`
        <div style="background:#f0f7ff; border:1px solid #bae6fd; border-radius:12px; padding:14px; margin-bottom:14px; display:flex; gap:12px; align-items:flex-start;">
          \${data.image ? \`<img src="\${data.image}" style="width:72px; height:72px; object-fit:cover; border-radius:8px; flex-shrink:0;" alt="item">\` : '<div style="width:52px; height:52px; border-radius:8px; background:#0284c7; color:#fff; display:grid; place-items:center; font-size:24px; flex-shrink:0;">🏨</div>'}
          <div style="flex:1; min-width:0;">
            <span style="display:inline-block; font-size:10.5px; font-weight:700; color:#0369a1; background:#e0f2fe; padding:2px 7px; border-radius:4px; margin-bottom:4px;">
              \${data.category || 'บริการท่องเที่ยวและที่พัก'}
            </span>
            <div style="font-size:15px; font-weight:700; color:#0f172a; line-height:1.35; margin-bottom:4px;">
              \${data.title}
            </div>
            <div style="font-size:12px; color:#475569;">
              🏢 ผู้ให้บริการ: <b>\${data.provider}</b>
            </div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:14px;">
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 12px;">
            <label style="display:block; font-size:11px; color:#64748b; margin-bottom:4px;">📅 วันที่เช็คอิน</label>
            <input type="date" id="confirm-booking-checkin" value="\${data.checkin || '2026-11-20'}" style="width:100%; padding:6px; border:1px solid #cbd5e1; border-radius:6px; font-size:12px; color:#0f172a; background:#fff; font-family:inherit;">
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 12px;">
            <label style="display:block; font-size:11px; color:#64748b; margin-bottom:4px;">📅 วันที่เช็คเอาท์</label>
            <input type="date" id="confirm-booking-checkout" value="\${data.checkout || '2026-11-22'}" style="width:100%; padding:6px; border:1px solid #cbd5e1; border-radius:6px; font-size:12px; color:#0f172a; background:#fff; font-family:inherit;">
          </div>
        </div>`;

const newBookingConfirmFlow = `    // Instant booking entry point (Checks login -> Opens confirmation modal)
    function instantBook(serviceId) {
      if (!isUserLoggedIn()) {
        state.pendingBooking = { type: 'service', serviceId: serviceId };
        showToast('⚠️ กรุณาเข้าสู่ระบบก่อนทำการจองห้องพักหรือบริการท่องเที่ยว', true);
        openAuthModal('login');
        return;
      }

      const s = state.services.find(x => x.id === serviceId);
      if (!s) return;

      const todayStr = getTodayDateStr();
      const searchDateInput = document.getElementById('booking-checkin');
      const preferredCheckin = (searchDateInput && searchDateInput.value && searchDateInput.value >= todayStr)
        ? searchDateInput.value
        : todayStr;
      const preferredCheckout = getFutureDateStr(2, preferredCheckin);

      openConfirmBookingModal({
        type: 'service',
        serviceId: serviceId,
        title: s.title,
        provider: s.provider,
        category: s.categoryName || s.category || 'โรงแรมและที่พัก',
        price: s.price,
        checkin: preferredCheckin,
        checkout: preferredCheckout,
        image: s.image
      });
    }

    function onConfirmCheckinChange() {
      const todayStr = getTodayDateStr();
      const checkinEl = document.getElementById('confirm-booking-checkin');
      const checkoutEl = document.getElementById('confirm-booking-checkout');
      if (!checkinEl) return;

      if (!checkinEl.value || checkinEl.value < todayStr) {
        checkinEl.value = todayStr;
        showToast('⚠️ ไม่สามารถเลือกวันที่ผ่านมาแล้วได้ จองได้เฉพาะวันนี้ (' + todayStr + ') หรือวันในอนาคตเท่านั้น', true);
      }
      if (checkoutEl) {
        checkoutEl.min = checkinEl.value;
        if (!checkoutEl.value || checkoutEl.value < checkinEl.value) {
          checkoutEl.value = getFutureDateStr(1, checkinEl.value);
        }
      }
    }

    function onConfirmCheckoutChange() {
      const todayStr = getTodayDateStr();
      const checkinEl = document.getElementById('confirm-booking-checkin');
      const checkoutEl = document.getElementById('confirm-booking-checkout');
      if (!checkoutEl) return;

      const minAllowed = (checkinEl && checkinEl.value >= todayStr) ? checkinEl.value : todayStr;
      if (!checkoutEl.value || checkoutEl.value < minAllowed) {
        checkoutEl.value = getFutureDateStr(1, minAllowed);
        showToast('⚠️ วันที่เช็คเอาท์ต้องเป็นวันเดียวกับหรือหลังวันเช็คอินเท่านั้น', true);
      }
    }

    // Open booking confirmation modal
    function openConfirmBookingModal(data) {
      state.activeConfirmBooking = data;
      const body = document.getElementById('confirm-booking-body');
      if (!body) return;

      const todayStr = getTodayDateStr();
      const safeCheckin = (data.checkin && data.checkin >= todayStr) ? data.checkin : todayStr;
      const safeCheckout = (data.checkout && data.checkout >= safeCheckin) ? data.checkout : getFutureDateStr(2, safeCheckin);
      const rewardTCP = Math.round(data.price * 0.05);

      body.innerHTML = \`
        <div style="background:#f0f7ff; border:1px solid #bae6fd; border-radius:12px; padding:14px; margin-bottom:14px; display:flex; gap:12px; align-items:flex-start;">
          \${data.image ? \`<img src="\${data.image}" onclick="currentGalleryImages=['\${data.image}']; currentGalleryTitle='\${(data.title || '').replace(/'/g, '')}'; openImageLightbox(0);" title="คลิกเพื่อดูรูปขยาย" style="width:72px; height:72px; object-fit:cover; border-radius:8px; flex-shrink:0; cursor:zoom-in;" alt="item">\` : '<div style="width:52px; height:52px; border-radius:8px; background:#0284c7; color:#fff; display:grid; place-items:center; font-size:24px; flex-shrink:0;">🏨</div>'}
          <div style="flex:1; min-width:0;">
            <span style="display:inline-block; font-size:10.5px; font-weight:700; color:#0369a1; background:#e0f2fe; padding:2px 7px; border-radius:4px; margin-bottom:4px;">
              \${data.category || 'บริการท่องเที่ยวและที่พัก'}
            </span>
            <div style="font-size:15px; font-weight:700; color:#0f172a; line-height:1.35; margin-bottom:4px;">
              \${data.title}
            </div>
            <div style="font-size:12px; color:#475569;">
              🏢 ผู้ให้บริการ: <b>\${data.provider}</b>
            </div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-bottom:8px;">
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 12px;">
            <label style="display:block; font-size:11px; color:#64748b; margin-bottom:4px;">📅 วันที่เช็คอิน (ตั้งแต่ \${todayStr})</label>
            <input type="date" id="confirm-booking-checkin" min="\${todayStr}" value="\${safeCheckin}" onchange="onConfirmCheckinChange()" style="width:100%; padding:6px; border:1px solid #cbd5e1; border-radius:6px; font-size:12px; color:#0f172a; background:#fff; font-family:inherit;">
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 12px;">
            <label style="display:block; font-size:11px; color:#64748b; margin-bottom:4px;">📅 วันที่เช็คเอาท์</label>
            <input type="date" id="confirm-booking-checkout" min="\${safeCheckin}" value="\${safeCheckout}" onchange="onConfirmCheckoutChange()" style="width:100%; padding:6px; border:1px solid #cbd5e1; border-radius:6px; font-size:12px; color:#0f172a; background:#fff; font-family:inherit;">
          </div>
        </div>
        <div style="font-size:11.5px; color:#059669; font-weight:600; margin-bottom:14px; display:flex; align-items:center; gap:5px;">
          <span>✓</span> ระบบเปิดให้จองเฉพาะวันนี้ (\${todayStr}) และวันในอนาคตเท่านั้น (ไม่อนุญาตให้จองย้อนหลัง)
        </div>`;

if (indexHtml.includes(oldBookingConfirmFlow)) {
  indexHtml = indexHtml.replace(oldBookingConfirmFlow, newBookingConfirmFlow);
  console.log('✓ 1G: Updated instantBook and openConfirmBookingModal with min date constraints');
} else {
  console.error('✗ 1G FAILED');
}

const oldExecuteCheckin = `      const checkinInput = document.getElementById('confirm-booking-checkin');
      const checkoutInput = document.getElementById('confirm-booking-checkout');
      const checkinVal = checkinInput && checkinInput.value ? checkinInput.value : (b.checkin || '2026-11-20');
      const checkoutVal = checkoutInput && checkoutInput.value ? checkoutInput.value : (b.checkout || '2026-11-22');`;

const newExecuteCheckin = `      const todayStr = getTodayDateStr();
      const checkinInput = document.getElementById('confirm-booking-checkin');
      const checkoutInput = document.getElementById('confirm-booking-checkout');
      const checkinVal = checkinInput && checkinInput.value ? checkinInput.value : (b.checkin || todayStr);
      const checkoutVal = checkoutInput && checkoutInput.value ? checkoutInput.value : (b.checkout || getFutureDateStr(2, checkinVal));

      if (checkinVal < todayStr) {
        showToast('⚠️ ไม่สามารถทำการจองในวันที่ผ่านมาแล้วได้ กรุณาเลือกวันนี้ (' + todayStr + ') หรือวันในอนาคตเท่านั้น', true);
        if (checkinInput) {
          checkinInput.value = todayStr;
          checkinInput.focus();
        }
        return;
      }
      if (checkoutVal < checkinVal) {
        showToast('⚠️ วันที่เช็คเอาท์ต้องไม่เป็นวันก่อนหน้าวันที่เช็คอิน', true);
        if (checkoutInput) {
          checkoutInput.value = getFutureDateStr(1, checkinVal);
          checkoutInput.focus();
        }
        return;
      }`;

if (indexHtml.includes(oldExecuteCheckin)) {
  indexHtml = indexHtml.replace(oldExecuteCheckin, newExecuteCheckin);
  console.log('✓ 1H: Added strict date validation in executeConfirmedBooking');
} else {
  console.error('✗ 1H FAILED');
}

indexHtml = indexHtml.replace(
  "checkin: '2026-11-25',\n        checkout: '2026-11-26'",
  "checkin: getTodayDateStr(),\n        checkout: getFutureDateStr(1)"
);

indexHtml = indexHtml.replace(
  "document.addEventListener('DOMContentLoaded', () => {\n      syncStateFromStore();",
  "document.addEventListener('DOMContentLoaded', () => {\n      initDateConstraints();\n      syncStateFromStore();"
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('✓ index.html saved successfully!');

// ============================================================================
// PART 2: UPDATE admin.html
// ============================================================================
const oldAdminMediaCss = `    @media (max-width: 900px) {
      .app-layout { grid-template-columns: 70px 1fr; }
      .brand-section, .sidebar-user, .menu-item-btn span, .menu-arrow, .submenu-list { display: none; }
      .brand-logo { font-size: 0; }
      .brand-logo:after { content: "TC"; font-size: 20px; color: var(--primary-navy); }
      .menu-item-btn { justify-content: center; padding: 14px 0; }
      .kpi-row-3 { grid-template-columns: 1fr; }
      .content-area { padding: 20px 16px; }
    }`;

const newAdminMediaCss = `    /* Mobile / Tablet Sidebar Drawer Toggle & Overlay */
    .admin-mobile-toggle {
      display: none;
      width: 38px;
      height: 38px;
      border-radius: 8px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      color: var(--primary-navy);
      align-items: center;
      justify-content: center;
      font-size: 18px;
      cursor: pointer;
      flex-shrink: 0;
    }
    .admin-sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.55);
      backdrop-filter: blur(3px);
      z-index: 990;
    }
    .admin-sidebar-overlay.show {
      display: block;
    }

    @media (max-width: 1024px) {
      .kpi-row-3 { grid-template-columns: repeat(2, 1fr); }
      .content-area { padding: 22px 20px 50px; }
      .topbar { padding: 0 20px; }
      .sync-status-pill { display: none; }
    }

    @media (max-width: 900px) {
      .app-layout {
        grid-template-columns: 1fr;
      }
      .admin-mobile-toggle {
        display: inline-flex;
      }
      .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 270px;
        height: 100vh;
        z-index: 1000;
        transform: translateX(-100%);
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 10px 0 30px rgba(0,0,0,0.2);
      }
      .sidebar.mobile-open {
        transform: translateX(0);
      }
      .kpi-row-3 {
        grid-template-columns: 1fr;
      }
      .content-area {
        padding: 18px 14px 48px;
      }
      .topbar {
        padding: 0 14px;
        height: auto;
        min-height: 60px;
        flex-wrap: wrap;
        gap: 8px;
        padding-top: 8px;
        padding-bottom: 8px;
      }
      .chart-card-top {
        flex-direction: column;
        gap: 12px;
      }
      .chart-actions-right {
        text-align: left;
        width: 100%;
      }
      .filter-bar {
        flex-direction: column;
        align-items: stretch !important;
      }
      .filter-bar > * {
        width: 100% !important;
      }
      .modal-card {
        width: 95%;
        max-height: 92vh;
        margin: 10px;
      }
    }

    @media (max-width: 480px) {
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

if (adminHtml.includes(oldAdminMediaCss)) {
  adminHtml = adminHtml.replace(oldAdminMediaCss, newAdminMediaCss);
  console.log('✓ 2A: Updated admin.html responsive media queries');
} else {
  console.error('✗ 2A FAILED');
}

adminHtml = adminHtml.replace(
  '<div class="app-layout">',
  '<div class="admin-sidebar-overlay" id="admin-sidebar-overlay" onclick="toggleAdminMobileSidebar()"></div>\n  <div class="app-layout">'
);

adminHtml = adminHtml.replace(
  '<div class="topbar-left">\n          <span>ThailandCONNEX Admin</span>',
  '<div class="topbar-left">\n          <button type="button" class="admin-mobile-toggle" onclick="toggleAdminMobileSidebar()" title="เปิดเมนูผู้ดูแลระบบ">☰</button>\n          <span>ThailandCONNEX Admin</span>'
);

const oldAdminSwitchView = `    function switchView(viewKey, btnEl) {`;
const newAdminSwitchView = `    function toggleAdminMobileSidebar() {
      const sb = document.querySelector('.sidebar');
      const ov = document.getElementById('admin-sidebar-overlay');
      if (sb) sb.classList.toggle('mobile-open');
      if (ov) ov.classList.toggle('show');
    }

    function switchView(viewKey, btnEl) {
      const sb = document.querySelector('.sidebar');
      const ov = document.getElementById('admin-sidebar-overlay');
      if (sb && sb.classList.contains('mobile-open')) sb.classList.remove('mobile-open');
      if (ov && ov.classList.contains('show')) ov.classList.remove('show');`;

if (adminHtml.includes(oldAdminSwitchView)) {
  adminHtml = adminHtml.replace(oldAdminSwitchView, newAdminSwitchView);
  console.log('✓ 2B: Added toggleAdminMobileSidebar to admin.html');
} else {
  console.error('✗ 2B FAILED');
}

fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('✓ admin.html saved successfully!');
