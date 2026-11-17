const fs = require('fs');

console.log('=== Step 1: Update index.html ===');
let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Ensure Global Font CSS covers all elements, form controls, and pseudo elements
const oldFontRule = `    *, *::before, *::after {
      box-sizing: border-box;
      font-family: 'IBM Plex Sans Thai', sans-serif !important;
    }`;

const newFontRule = `    *, *::before, *::after, input, button, select, textarea, optgroup {
      box-sizing: border-box;
      font-family: 'IBM Plex Sans Thai', sans-serif !important;
    }`;

if (indexHtml.includes(oldFontRule)) {
  indexHtml = indexHtml.replace(oldFontRule, newFontRule);
  console.log('Updated index.html font-family rule to include all form elements');
}

// 2. Update destination search box to support both text typing (like Image 1) and datalist suggestions
const oldSearchInput = `<select id="service-search-input" class="form-control" onchange="filterServices()">
                <option value="all">📍 ทุกจุดหมายปลายทาง (ทั่วประเทศไทย)</option>
                <option value="กรุงเทพ" selected>📍 กรุงเทพมหานคร (Bangkok)</option>
                <option value="ภูเก็ต">📍 ภูเก็ต (Phuket)</option>
                <option value="เชียงใหม่">📍 เชียงใหม่ (Chiang Mai)</option>
                <option value="ชลบุรี">📍 พัทยา / ชลบุรี (Pattaya)</option>
                <option value="หัวหิน">📍 หัวหิน / ประจวบคีรีขันธ์ (Hua Hin)</option>
                <option value="กระบี่">📍 กระบี่ (Krabi)</option>
                <option value="สุราษฎร์ธานี">📍 เกาะสมุย / สุราษฎร์ธานี (Koh Samui)</option>
              </select>`;

const newSearchInput = `<input type="text" id="service-search-input" class="form-control" placeholder="เช่น Bangkok, Thailand หรือ กรุงเทพฯ, ภูเก็ต, เชียงใหม่..." value="Bangkok, Thailand" list="destination-suggestions" oninput="filterServices()" style="font-family:'IBM Plex Sans Thai', sans-serif !important;">
              <datalist id="destination-suggestions">
                <option value="Bangkok, Thailand">กรุงเทพมหานคร (Bangkok)</option>
                <option value="ภูเก็ต (Phuket)">ภูเก็ต - ทะเล ป่าตอง กะตะ</option>
                <option value="เชียงใหม่ (Chiang Mai)">เชียงใหม่ - คูเมือง แม่ริม</option>
                <option value="พัทยา / ชลบุรี (Pattaya)">พัทยา ชลบุรี</option>
                <option value="หัวหิน (Hua Hin)">หัวหิน ชะอำ ประจวบฯ</option>
                <option value="กระบี่ (Krabi)">กระบี่ อ่าวนาง เกาะพีพี</option>
                <option value="เกาะสมุย (Koh Samui)">เกาะสมุย สุราษฎร์ธานี</option>
                <option value="ทั้งหมด (All Thailand)">ทุกจุดหมายปลายทาง ทั่วประเทศ</option>
              </datalist>`;

if (indexHtml.includes(oldSearchInput)) {
  indexHtml = indexHtml.replace(oldSearchInput, newSearchInput);
  console.log('Updated service-search-input with datalist and Bangkok, Thailand prefill');
} else {
  console.log('Notice: oldSearchInput pattern not matched directly; will check alternative');
}

// 3. Update reservations table toolbar header to show user badge
const oldResHeader = `<h3 class="table-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              รายการจองทั้งหมด
            </h3>`;

const newResHeader = `<div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <h3 class="table-title" style="margin:0;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                ประวัติการจองของฉัน (My Bookings)
              </h3>
              <span id="res-table-owner-badge" style="font-size:12px; font-weight:600; background:#e0f2fe; color:#0369a1; padding:4px 12px; border-radius:9999px; border:1px solid #bae6fd; font-family:'IBM Plex Sans Thai', sans-serif;">
                บัญชี: คุณอลิสา ใจดี (TC-849204)
              </span>
            </div>`;

if (indexHtml.includes(oldResHeader)) {
  indexHtml = indexHtml.replace(oldResHeader, newResHeader);
  console.log('Updated reservation table header with user badge');
}

// 4. Update renderServices search logic to handle free text (Bangkok, Thailand, etc.)
const oldRenderServicesDest = `        // Destination filter
        if (selectedDest && selectedDest !== 'all') {
          const matchLoc = (s.location || '').includes(selectedDest);
          const matchTitle = (s.title || '').includes(selectedDest);
          const matchProvider = (s.provider || '').includes(selectedDest);
          if (!matchLoc && !matchTitle && !matchProvider) {
            return false;
          }
        }`;

const newRenderServicesDest = `        // Destination filter (Supports free text like "Bangkok, Thailand", "ภูเก็ต", etc.)
        if (selectedDest && selectedDest.trim() !== '' && selectedDest !== 'all' && !selectedDest.includes('ทั้งหมด')) {
          const q = selectedDest.toLowerCase().replace(', thailand', '').trim();
          const loc = (s.location || '').toLowerCase();
          const title = (s.title || '').toLowerCase();
          const prov = (s.provider || '').toLowerCase();
          const matchLoc = loc.includes(q) || (q.includes('bangkok') && (loc.includes('กรุงเทพ') || loc.includes('bangkok')));
          const matchTitle = title.includes(q);
          const matchProv = prov.includes(q);
          if (!matchLoc && !matchTitle && !matchProv) {
            return false;
          }
        }`;

if (indexHtml.includes(oldRenderServicesDest)) {
  indexHtml = indexHtml.replace(oldRenderServicesDest, newRenderServicesDest);
  console.log('Updated renderServices destination filtering for text search');
}

// 5. Update renderReservations to strictly filter by logged-in user
const oldRenderReservations = `    // Render Reservations Table
    function renderReservations() {
      const tbody = document.getElementById('reservations-tbody');
      const search = (document.getElementById('res-search')?.value || '').toLowerCase();
      const statusFilter = document.getElementById('res-status-filter')?.value || 'all';

      const filtered = state.reservations.filter(r => {
        if (statusFilter !== 'all' && r.status !== statusFilter) return false;
        if (search && !r.id.toLowerCase().includes(search) && !r.guest.toLowerCase().includes(search) && !r.serviceName.toLowerCase().includes(search)) return false;
        return true;
      });

      tbody.innerHTML = filtered.map(r => \`
        <tr>
          <td><b style="color:var(--blue); font-family: 'IBM Plex Sans Thai', sans-serif;">BK-\${r.id}</b></td>
          <td><b>\${r.guest}</b><br><small style="color:var(--muted);">\${r.phone}</small></td>
          <td>\${r.serviceName}<br><small style="color:var(--muted);">\${r.property}</small></td>
          <td>\${r.checkin}</td>
          <td>\${r.checkout}</td>
          <td><b style="font-family:'IBM Plex Sans Thai';">฿\${r.amount.toLocaleString('th-TH')}</b></td>
          <td><small style="color:var(--muted);">\${r.bookedOn}</small></td>
          <td>
            <span class="status-badge \${r.status.toLowerCase()}">
              \${r.status === 'Confirmed' ? 'ยืนยันแล้ว' : r.status === 'PendingConfirm' ? 'รอตรวจสอบ' : r.status === 'Completed' ? 'เสร็จสิ้น' : 'ยกเลิก'}
            </span>
          </td>
          <td style="text-align:right;">
            <button class="btn-export" style="height:30px; padding:0 10px; font-size:11px;" onclick="viewBookingDetail('\${r.id}')">
              รายละเอียด
            </button>
          </td>
        </tr>
      \`).join('');

      document.getElementById('res-table-summary').textContent = \`แสดงรายการที่ 1 ถึง \${filtered.length} จากทั้งหมด \${state.reservations.length} รายการ\`;
    }`;

const newRenderReservations = `    // Render Reservations Table (Strictly filtered by Active Logged-in User)
    function renderReservations() {
      const tbody = document.getElementById('reservations-tbody');
      if (!tbody) return;

      const badgeEl = document.getElementById('res-table-owner-badge');
      const summaryEl = document.getElementById('res-table-summary');
      const search = (document.getElementById('res-search')?.value || '').toLowerCase().trim();
      const statusFilter = document.getElementById('res-status-filter')?.value || 'all';

      // 1. Check Login Status
      const loggedIn = isUserLoggedIn();
      const curUser = state.user || {};

      if (badgeEl) {
        if (loggedIn) {
          badgeEl.textContent = \`บัญชี: \${curUser.name || 'สมาชิก'} (\${curUser.id || 'TC-849204'})\`;
          badgeEl.style.background = '#e0f2fe';
          badgeEl.style.color = '#0369a1';
          badgeEl.style.borderColor = '#bae6fd';
        } else {
          badgeEl.textContent = '🔒 ยังไม่ได้เข้าสู่ระบบ';
          badgeEl.style.background = '#fee2e2';
          badgeEl.style.color = '#b91c1c';
          badgeEl.style.borderColor = '#fca5a5';
        }
      }

      // If user is NOT logged in, show security login lock banner in table
      if (!loggedIn) {
        tbody.innerHTML = \`
          <tr>
            <td colspan="9" style="text-align:center; padding: 50px 20px;">
              <div style="max-width: 440px; margin: 0 auto; text-align: center;">
                <div style="width: 56px; height: 56px; border-radius: 50%; background: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 26px;">🔒</div>
                <h4 style="margin: 0 0 8px; color: var(--navy); font-size: 18px; font-weight:700;">กรุณาเข้าสู่ระบบเพื่อดูประวัติการจองของคุณ</h4>
                <p style="color: var(--muted); font-size: 13px; margin: 0 0 20px; line-height: 1.6;">
                  ข้อมูลประวัติการจองห้องพักและบริการผูกกับบัญชีสมาชิกเฉพาะบุคคล เพื่อความปลอดภัยและเป็นส่วนตัวตามมาตรฐาน PDPA
                </p>
                <div style="display:flex; gap:10px; justify-content:center;">
                  <button class="btn-search" style="padding: 10px 24px; font-size: 13.5px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; cursor:pointer;" onclick="openAuthModal('login')">
                    🔑 เข้าสู่ระบบเพื่อดูรายการจอง
                  </button>
                  <button class="btn-export" style="padding: 10px 20px; font-size: 13.5px; border-radius: 8px; cursor:pointer;" onclick="switchTab('view-booking', 'จองบริการท่องเที่ยว')">
                    ค้นหาบริการท่องเที่ยว
                  </button>
                </div>
              </div>
            </td>
          </tr>
        \`;
        if (summaryEl) summaryEl.textContent = 'กรุณาเข้าสู่ระบบเพื่อดูประวัติการจองส่วนตัวของคุณ';
        return;
      }

      // 2. Filter reservations STRICTLY to this user's account
      const curId = curUser.id || '';
      const curEmail = (curUser.email || '').trim().toLowerCase();
      const curPhoneClean = (curUser.phone || '').replace(/[^0-9]/g, '');
      const curName = (curUser.name || '').trim();

      const userReservations = state.reservations.filter(r => {
        // Direct userId match
        if (curId && r.userId && r.userId === curId) return true;
        // Email match
        if (curEmail && r.email && r.email.trim().toLowerCase() === curEmail) return true;
        // Phone match
        if (curPhoneClean && r.phone) {
          const rPhoneClean = r.phone.replace(/[^0-9]/g, '');
          if (rPhoneClean && rPhoneClean === curPhoneClean) return true;
        }
        // Name partial match
        if (curName && r.guest && (r.guest.includes(curName) || curName.includes(r.guest))) return true;
        return false;
      });

      // 3. Apply search and status filters to user's reservations
      const filtered = userReservations.filter(r => {
        if (statusFilter !== 'all' && r.status !== statusFilter) return false;
        if (search) {
          const matchId = (r.id || '').toLowerCase().includes(search);
          const matchGuest = (r.guest || '').toLowerCase().includes(search);
          const matchService = (r.serviceName || '').toLowerCase().includes(search);
          const matchProp = (r.property || '').toLowerCase().includes(search);
          if (!matchId && !matchGuest && !matchService && !matchProp) return false;
        }
        return true;
      });

      // 4. If no reservations found for this user
      if (userReservations.length === 0) {
        tbody.innerHTML = \`
          <tr>
            <td colspan="9" style="text-align:center; padding: 50px 20px;">
              <div style="max-width: 440px; margin: 0 auto; text-align: center;">
                <div style="width: 56px; height: 56px; border-radius: 50%; background: #f8fafc; color: var(--muted); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 26px;">📋</div>
                <h4 style="margin: 0 0 8px; color: var(--navy); font-size: 16px; font-weight:700;">ยังไม่มีประวัติการจองสำหรับบัญชีคุณ \${curUser.name || ''}</h4>
                <p style="color: var(--muted); font-size: 13px; margin: 0 0 20px; line-height: 1.6;">
                  เมื่อคุณทำการจองห้องพัก ตั๋วท่องเที่ยว หรือแพ็กเกจสปา รายการยืนยันการจองและแต้มสะสมจะบันทึกที่นี่โดยอัตโนมัติ
                </p>
                <button class="btn-search" style="padding: 10px 22px; font-size: 13.5px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; margin: 0 auto; cursor:pointer;" onclick="switchTab('view-booking', 'จองบริการท่องเที่ยว')">
                  🔍 เริ่มเลือกดูบริการและทำการจอง
                </button>
              </div>
            </td>
          </tr>
        \`;
        if (summaryEl) summaryEl.textContent = \`บัญชีคุณ \${curUser.name || ''} ยังไม่มีรายการจอง\`;
        return;
      }

      // If user has bookings but search filter yielded 0
      if (filtered.length === 0) {
        tbody.innerHTML = \`
          <tr>
            <td colspan="9" style="text-align:center; padding: 40px 20px; color: var(--muted);">
              🔍 ไม่พบรายการจองที่ตรงกับเงื่อนไขการค้นหาในบัญชีของคุณ
            </td>
          </tr>
        \`;
        if (summaryEl) summaryEl.textContent = \`แสดง 0 รายการ จากประวัติการจองของคุณทั้งหมด \${userReservations.length} รายการ\`;
        return;
      }

      // 5. Render user's bookings
      tbody.innerHTML = filtered.map(r => \`
        <tr>
          <td><b style="color:var(--blue); font-family: 'IBM Plex Sans Thai', sans-serif;">BK-\${r.id}</b></td>
          <td><b>\${r.guest}</b><br><small style="color:var(--muted);">\${r.phone || '-'}</small></td>
          <td>\${r.serviceName}<br><small style="color:var(--muted);">\${r.property}</small></td>
          <td>\${r.checkin}</td>
          <td>\${r.checkout}</td>
          <td><b style="font-family:'IBM Plex Sans Thai';">฿\${Number(r.amount).toLocaleString('th-TH')}</b></td>
          <td><small style="color:var(--muted);">\${r.bookedOn}</small></td>
          <td>
            <span class="status-badge \${r.status ? r.status.toLowerCase() : 'confirmed'}">
              \${r.status === 'Confirmed' ? 'ยืนยันแล้ว' : r.status === 'PendingConfirm' ? 'รอตรวจสอบ' : r.status === 'Completed' ? 'เสร็จสิ้น' : 'ยกเลิก'}
            </span>
          </td>
          <td style="text-align:right;">
            <button class="btn-export" style="height:30px; padding:0 12px; font-size:11px; cursor:pointer;" onclick="viewBookingDetail('\${r.id}')">
              รายละเอียด
            </button>
          </td>
        </tr>
      \`).join('');

      if (summaryEl) {
        summaryEl.textContent = \`แสดงรายการที่ 1 ถึง \${filtered.length} จากประวัติการจองของคุณทั้งหมด \${userReservations.length} รายการ\`;
      }
    }`;

if (indexHtml.includes(oldRenderReservations)) {
  indexHtml = indexHtml.replace(oldRenderReservations, newRenderReservations);
  console.log('Updated renderReservations with strict user login filtering');
} else {
  console.log('WARNING: oldRenderReservations not matched');
}

// 6. Update exportReservationsCSV to only export current user's bookings
const oldExportRes = `    function exportReservationsCSV() {
      const headers = ['Booking ID', 'Guest Name', 'Phone', 'Service', 'Property', 'CheckIn', 'CheckOut', 'Amount', 'Status'];
      const rows = state.reservations.map(r => [
        \`BK-\${r.id}\`, \`"\${r.guest}"\`, r.phone, \`"\${r.serviceName}"\`, \`"\${r.property}"\`, r.checkin, r.checkout, r.amount, r.status
      ]);
      downloadCSV('thailandconnex_reservations.csv', headers, rows);
    }`;

const newExportRes = `    function exportReservationsCSV() {
      if (!isUserLoggedIn()) {
        showToast('⚠️ กรุณาเข้าสู่ระบบก่อนดาวน์โหลดประวัติการจองของคุณ', true);
        openAuthModal('login');
        return;
      }
      const curUser = state.user || {};
      const curId = curUser.id || '';
      const curEmail = (curUser.email || '').trim().toLowerCase();
      const curName = (curUser.name || '').trim();

      const userReservations = state.reservations.filter(r => {
        if (curId && r.userId && r.userId === curId) return true;
        if (curEmail && r.email && r.email.trim().toLowerCase() === curEmail) return true;
        if (curName && r.guest && (r.guest.includes(curName) || curName.includes(r.guest))) return true;
        return false;
      });

      if (userReservations.length === 0) {
        showToast('ℹ️ ไม่พบประวัติการจองในบัญชีของคุณสำหรับส่งออกไฟล์', true);
        return;
      }

      const headers = ['Booking ID', 'Guest Name', 'Phone', 'Email', 'Service', 'Property', 'CheckIn', 'CheckOut', 'Amount', 'Status'];
      const rows = userReservations.map(r => [
        \`BK-\${r.id}\`, \`"\${r.guest}"\`, r.phone || '', r.email || '', \`"\${r.serviceName}"\`, \`"\${r.property}"\`, r.checkin, r.checkout, r.amount, r.status
      ]);
      downloadCSV(\`thailandconnex_my_reservations_\${curUser.id || 'export'}.csv\`, headers, rows);
    }`;

if (indexHtml.includes(oldExportRes)) {
  indexHtml = indexHtml.replace(oldExportRes, newExportRes);
  console.log('Updated exportReservationsCSV to export only active user bookings');
}

// 7. Update executeConfirmedBooking to attach userId
const oldNewBooking = `      const newBooking = {
        id: newId,
        refNo: '1675' + Math.floor(100000000000 + Math.random() * 900000000000),
        guest: state.user.name,
        email: state.user.email,
        phone: state.user.phone,`;

const newNewBooking = `      const newBooking = {
        id: newId,
        refNo: '1675' + Math.floor(100000000000 + Math.random() * 900000000000),
        userId: state.user.id || 'TC-849204',
        guest: state.user.name,
        email: state.user.email,
        phone: state.user.phone,`;

if (indexHtml.includes(oldNewBooking)) {
  indexHtml = indexHtml.replace(oldNewBooking, newNewBooking);
  console.log('Updated executeConfirmedBooking with userId');
}

// 8. Update logoutUser to refresh reservations table immediately
const oldLogoutCall = `      updateHeaderBadges();
      showToast('🚪 ออกจากระบบเรียบร้อยแล้ว (คุณสามารถเข้าสู่ระบบใหม่ได้ตลอดเวลา)');`;

const newLogoutCall = `      updateHeaderBadges();
      renderReservations();
      showToast('🚪 ออกจากระบบเรียบร้อยแล้ว (คุณสามารถเข้าสู่ระบบใหม่ได้ตลอดเวลา)');`;

if (indexHtml.includes(oldLogoutCall)) {
  indexHtml = indexHtml.replace(oldLogoutCall, newLogoutCall);
  console.log('Updated logoutUser to call renderReservations');
}

// 9. Update handleLoginQuick and handleLoginFormSubmit to refresh reservations table immediately
indexHtml = indexHtml.replace(
  `state.user = res.user;\n          updateHeaderBadges();\n          closeModal('modal-auth');`,
  `state.user = res.user;\n          updateHeaderBadges();\n          renderReservations();\n          closeModal('modal-auth');`
);
indexHtml = indexHtml.replace(
  `state.user = res.user;\n          updateHeaderBadges();\n          closeModal('modal-auth');\n          showToast(\`🎉 เข้าสู่ระบบสำเร็จ`,
  `state.user = res.user;\n          updateHeaderBadges();\n          renderReservations();\n          closeModal('modal-auth');\n          showToast(\`🎉 เข้าสู่ระบบสำเร็จ`
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('index.html saved successfully!');

console.log('=== Step 2: Ensure font rule in admin.html ===');
let adminHtml = fs.readFileSync('admin.html', 'utf8');
const adminOldFont = `*, *::before, *::after { box-sizing: border-box; }`;
const adminNewFont = `*, *::before, *::after, input, button, select, textarea, optgroup { box-sizing: border-box; font-family: 'IBM Plex Sans Thai', sans-serif !important; }`;

if (adminHtml.includes(adminOldFont)) {
  adminHtml = adminHtml.replace(adminOldFont, adminNewFont);
  console.log('Updated admin.html font rule');
  fs.writeFileSync('admin.html', adminHtml, 'utf8');
} else {
  console.log('Checking alternative font rule in admin.html');
  adminHtml = adminHtml.replace(
    `button, input, select { font-family: 'IBM Plex Sans Thai', sans-serif !important; font-size: inherit; }`,
    `*, *::before, *::after, button, input, select, textarea, optgroup { font-family: 'IBM Plex Sans Thai', sans-serif !important; font-size: inherit; }`
  );
  fs.writeFileSync('admin.html', adminHtml, 'utf8');
  console.log('admin.html saved successfully!');
}
