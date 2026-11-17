const fs = require('fs');

let idx = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

// 1. Guard renderDirectory
const oldRender = `function renderDirectory() {
      const tbody = document.getElementById('directory-tbody');`;

const newRender = `function renderDirectory() {
      const tbody = document.getElementById('directory-tbody');
      if (!tbody) return;`;

if (idx.includes(oldRender)) {
  idx = idx.replace(oldRender, newRender);
  console.log('Guarded renderDirectory against null tbody');
}

// 2. Add Data Bank Gateway Banner at the bottom of view-booking
const targetOld = `        <!-- Service Cards Grid -->
        <div class="grid-3" id="services-grid">
          <!-- Dynamically populated via JS from PDF exact dataset -->
        </div>
      </section>`;

const databankGatewayBanner = `        <!-- Service Cards Grid -->
        <div class="grid-3" id="services-grid">
          <!-- Dynamically populated via JS from PDF exact dataset -->
        </div>

        <!-- National Digital Tourism Data Bank Gateway Card -->
        <div style="background: linear-gradient(135deg, #083b7c, #0c4a6e); border-radius: 14px; padding: 22px 26px; color: #fff; margin-top: 36px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 18px; box-shadow: 0 4px 18px rgba(8,59,124,0.18);">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 52px; height: 52px; border-radius: 12px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 26px;">
              🗄️
            </div>
            <div>
              <div style="font-weight: 700; font-size: 15px; margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
                <span>ฐานข้อมูลสินค้าและบริการท่องเที่ยวแห่งชาติ (National Tourism Data Bank)</span>
                <span style="font-size: 11px; background: #08b99d; color: #fff; padding: 2px 8px; border-radius: 20px; font-weight:600;">ศูนย์ข้อมูลกลาง depa</span>
              </div>
              <div style="font-size: 12.5px; color: #bae6fd; max-width: 680px; line-height: 1.5;">
                ศูนย์กลาง Big Data รวบรวมผู้ประกอบการท่องเที่ยว <b>108,659 ราย</b> และสินค้า/บริการ <b>201,764 รายการ</b> ทั่วประเทศ 77 จังหวัด ได้รับการย้ายไปบริหารจัดการและวิเคราะห์ข้อมูลผ่านระบบส่วนกลางที่ <b>Admin Portal</b>
              </div>
            </div>
          </div>
          <a href="admin.html#databank" style="display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #083b7c; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none; transition: transform 0.2s; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            <span>เข้าสู่ระบบ Data Bank ที่ Admin Portal</span>
            <span>➔</span>
          </a>
        </div>
      </section>`;

if (idx.includes(targetOld)) {
  idx = idx.replace(targetOld, databankGatewayBanner);
  console.log('Inserted Data Bank Gateway Banner in view-booking');
} else {
  console.log('WARNING: targetOld not matched');
}

fs.writeFileSync('index.html', idx, 'utf8');
console.log('index.html patch completed!');
