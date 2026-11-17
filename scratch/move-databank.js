const fs = require('fs');

console.log('--- Step 1: Update index.html ---');
let idx = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

// 1. Remove the side-nav-item for view-directory
const navRegex = /<button class="side-nav-item" data-target="view-directory"[\s\S]*?<\/button>/;
if (navRegex.test(idx)) {
  console.log('Found and removing side-nav-item for view-directory');
  idx = idx.replace(navRegex, '');
} else {
  console.log('WARNING: side-nav-item for view-directory not found');
}

// 2. In sidebar under Administration, add direct link to Data Bank in Admin
const adminNavGroup = '<div class="menu-group-label" style="margin-top: 14px;">ระบบผู้ดูแล (Administration)</div>';
const adminNavGroupNew = `<div class="menu-group-label" style="margin-top: 14px;">ระบบส่วนกลางและฐานข้อมูล (Administration)</div>
        <a href="admin.html#databank" class="side-nav-item" style="text-decoration: none;" title="เปิดดูฐานข้อมูลบริการและการท่องเที่ยวแห่งชาติ (National Tourism Data Bank 108k/201k)">
          <div class="side-item-left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><line x1="2" y1="10" x2="22" y2="10"></line></svg>
            <span>ฐานข้อมูลท่องเที่ยวแห่งชาติ (Data Bank)</span>
          </div>
          <span style="font-size:11px; color:var(--teal); font-weight:700;">108k ➔</span>
        </a>`;

if (idx.includes(adminNavGroup)) {
  console.log('Updated Administration sidebar label with Data Bank direct link');
  idx = idx.replace(adminNavGroup, adminNavGroupNew);
}

// 3. Remove <section id="view-directory"> from index.html
const sectionRegex = /<!-- =+ -->\s*<!-- VIEW 6: NATIONAL DATA DIRECTORY[\s\S]*?<\/section>/;
if (sectionRegex.test(idx)) {
  console.log('Found and removing section view-directory');
  idx = idx.replace(sectionRegex, `<!-- VIEW 6: MOVED TO ADMIN PORTAL (National Tourism Data Bank) -->`);
} else {
  console.log('WARNING: section view-directory not found by regex, checking fallback');
  const fallbackSec = /<section id="view-directory" class="view-panel">[\s\S]*?<\/section>/;
  if (fallbackSec.test(idx)) {
    console.log('Found section via fallback regex');
    idx = idx.replace(fallbackSec, `<!-- VIEW 6: MOVED TO ADMIN PORTAL (National Tourism Data Bank) -->`);
  }
}

// 4. In index.html, update switchTab and handleMenuClick to guard against view-directory
if (idx.includes("tabId === 'view-directory'")) {
  idx = idx.replace("tabId === 'view-directory'", "false");
}

// Add a redirection guard in handleMenuClick
idx = idx.replace(
  "function handleMenuClick(viewId, viewTitle, el) {",
  `function handleMenuClick(viewId, viewTitle, el) {
      if (viewId === 'view-directory') {
        window.location.href = 'admin.html#databank';
        return;
      }`
);

// 5. In index.html, add an informative Data Bank banner at the bottom of the booking view (view-booking)
const bookingEnd = '</section>'; // First section end is view-booking
const databankBanner = `
        <!-- National Tourism Data Bank Gateway Card -->
        <div style="background: linear-gradient(135deg, #083b7c, #0c4a6e); border-radius: 14px; padding: 20px 24px; color: #fff; margin-top: 32px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; box-shadow: 0 4px 15px rgba(8,59,124,0.15);">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 52px; height: 52px; border-radius: 12px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 26px;">
              🗄️
            </div>
            <div>
              <div style="font-weight: 700; font-size: 15px; margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
                <span>ฐานข้อมูลสินค้าและบริการท่องเที่ยวแห่งชาติ (National Tourism Data Bank)</span>
                <span style="font-size: 10.5px; background: var(--teal); color: #fff; padding: 2px 8px; border-radius: 20px;">ศูนย์ข้อมูลกลาง depa</span>
              </div>
              <div style="font-size: 12.5px; color: #bae6fd; max-width: 650px; line-height: 1.5;">
                ศูนย์กลาง Big Data รวบรวมผู้ประกอบการท่องเที่ยว <b>108,659 ราย</b> และสินค้า/บริการ <b>201,764 รายการ</b> ทั่วประเทศ 77 จังหวัด จัดการและวิเคราะห์ผ่านระบบส่วนกลางที่ Admin Portal
              </div>
            </div>
          </div>
          <a href="admin.html#databank" style="display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #083b7c; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; text-decoration: none; transition: transform 0.2s; white-space: nowrap;">
            <span>เปิดดู Data Bank ที่ Admin Portal</span>
            <span>➔</span>
          </a>
        </div>
      </section>`;

// Insert the banner inside view-booking before its closing </section>
const viewBookingClose = /<\/div>\s*<\/section>\s*<!-- =+\s*-->\s*<!-- VIEW 2: REWARDS/;
if (viewBookingClose.test(idx)) {
  console.log('Inserted Data Bank banner at the end of view-booking');
  idx = idx.replace(viewBookingClose, `</div>\n${databankBanner}\n\n      <!-- ============================================== -->\n      <!-- VIEW 2: REWARDS`);
} else {
  console.log('WARNING: viewBookingClose pattern not matched');
}

fs.writeFileSync('index.html', idx, 'utf8');
console.log('index.html updated successfully!');
