const fs = require('fs');

console.log('--- Step 2: Update admin.html with comprehensive National Tourism Data Bank ---');
let admin = fs.readFileSync('admin.html', 'utf8').replace(/\r\n/g, '\n');

// 1. Update menu button
const menuBtnOld = `<button class="menu-item-btn" id="btn-databank" onclick="switchView('databank-kpi', this)">
          <div class="menu-label-wrap">
            <span class="menu-icon">🗄️</span>
            <span>Master Data (Data Bank 108k)</span>
          </div>
        </button>`;

const menuBtnNew = `<button class="menu-item-btn" id="btn-databank" onclick="switchView('databank-kpi', this)">
          <div class="menu-label-wrap">
            <span class="menu-icon">🗄️</span>
            <span>National Tourism Data Bank</span>
          </div>
          <span class="badge badge-info" style="font-size:10px; background:rgba(22,141,225,0.15); color:var(--primary-blue);">108k / 201k</span>
        </button>`;

if (admin.includes(menuBtnOld)) {
  admin = admin.replace(menuBtnOld, menuBtnNew);
  console.log('Updated btn-databank menu label & badge');
} else {
  console.log('WARNING: menuBtnOld not matched');
}

// 2. Prepare the enhanced view-databank-kpi
const oldViewStart = '<!-- VIEW 16: Master Data > Data Bank 108k (หน้า 175 / PDF 177) -->';
const oldViewEnd = '<!-- VIEW 17: Log > Blockchain & Audit (หน้า 148 / PDF 150) -->';

const startIndex = admin.indexOf(oldViewStart);
const endIndex = admin.indexOf(oldViewEnd);

if (startIndex !== -1 && endIndex !== -1) {
  console.log('Found view-databank-kpi block:', startIndex, 'to', endIndex);

  const enhancedDataBankView = `<!-- VIEW 16: Master Data > National Digital Tourism Data Bank (หน้า 157-243 / PDF) -->
        <!-- ======================================================== -->
        <div class="view-section" id="view-databank-kpi">
          
          <!-- Data Bank Header Card -->
          <div class="table-card" style="margin-bottom: 20px;">
            <div class="table-card-head" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div>
                <span style="font-size:18px; font-weight:700; color:var(--text-main);">🏛️ ฐานข้อมูลสินค้าและบริการท่องเที่ยวแห่งชาติ (National Digital Tourism Data Bank)</span>
                <div style="font-size:12.5px; color:var(--text-muted); margin-top:4px;">
                  ศูนย์กลางรวบรวม Big Data อุตสาหกรรมท่องเที่ยวระดับชาติ ตามนโยบายขับเคลื่อนเศรษฐกิจด้วยข้อมูล (Data-Driven Economy) ภายใต้การส่งเสริมของ depa
                </div>
              </div>
              <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                <span class="badge badge-success" style="padding:6px 12px; font-size:12px;">depa Official Certified</span>
                <span class="badge badge-info" style="padding:6px 12px; font-size:12px;">Big Data & AI/ML Platform</span>
              </div>
            </div>

            <!-- Sub Navigation Tabs for Data Bank -->
            <div style="display:flex; gap:8px; margin-top:16px; border-bottom:1px solid #e2e8f0; padding-bottom:12px; flex-wrap:wrap;">
              <button id="tab-btn-suppliers" class="btn-action" style="padding:8px 16px; font-size:13px; font-weight:600;" onclick="switchDataBankSubTab('suppliers')">
                🏢 1. สถิติผู้ประกอบการ (108,659 ราย)
              </button>
              <button id="tab-btn-packages" class="btn-secondary" style="padding:8px 16px; font-size:13px; font-weight:600;" onclick="switchDataBankSubTab('packages')">
                📦 2. สารบบสินค้าและบริการ (201,764 รายการ)
              </button>
              <button id="tab-btn-analytics" class="btn-secondary" style="padding:8px 16px; font-size:13px; font-weight:600;" onclick="switchDataBankSubTab('analytics')">
                📈 3. สถาปัตยกรรม Big Data & มูลค่าเศรษฐกิจ (1.2 หมื่นล้าน)
              </button>
            </div>
          </div>

          <!-- ============================================== -->
          <!-- SUB-TAB 1: SUPPLIERS DIRECTORY & KPI (PDF หน้า 175) -->
          <!-- ============================================== -->
          <div id="databank-subtab-suppliers">
            <div class="table-card">
              <div class="table-card-head" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <span>สถิติผู้ประกอบการในอุตสาหกรรมท่องเที่ยว (Target: 100,000 ราย | ผลสำเร็จ: 108,659 ราย)</span>
                <button class="btn-action" style="font-size:11.5px;" onclick="exportTableToCSV('table-databank', 'ThailandConnex_Suppliers_108k.csv')">
                  Export สถิติผู้ประกอบการ CSV 📥
                </button>
              </div>

              <!-- Interactive Province Filter -->
              <div style="background:#f8fafc; padding:14px 18px; border-radius:10px; margin-top:14px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; border:1px solid #e2e8f0;">
                <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                  <span style="font-size:13px; font-weight:700; color:var(--text-dark);">📍 กรองตามพื้นที่ / จังหวัด:</span>
                  <select id="databank-prov-filter" class="input-clean" onchange="filterDataBankProvince(this.value)" style="font-weight:600; min-width:280px;">
                    <option value="all">ทั่วประเทศไทย (77 จังหวัด - 108,659 ราย)</option>
                    <option value="bkk">กรุงเทพมหานคร (Bangkok - 28,450 ราย)</option>
                    <option value="phuket">ภูเก็ต (Phuket - 18,420 ราย)</option>
                    <option value="cm">เชียงใหม่ (Chiang Mai - 14,890 ราย)</option>
                    <option value="chonburi">ชลบุรี / พัทยา (Chonburi - 12,310 ราย)</option>
                    <option value="surat">สุราษฎร์ธานี / เกาะสมุย (Surat Thani - 8,950 ราย)</option>
                  </select>
                </div>
                <span style="font-size:12px; color:var(--text-muted)">ข้อมูลยืนยันผลการดำเนินงานโครงการ รหัส IF-65-0018</span>
              </div>

              <!-- 4 Highlight KPI Boxes -->
              <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin: 16px 0 24px;">
                <div style="background:#e0f2fe; padding:16px; border-radius:10px; border-left:4px solid #0284c7;">
                  <small style="color:#0369a1; font-weight:600;">1. โรงแรมและที่พัก (Accommodation)</small>
                  <h3 id="db-kpi-hotel" style="margin:6px 0 0; color:#0c4a6e; font-size:24px; font-weight:800;">35,962</h3>
                  <div style="font-size:11px; color:#0284c7; margin-top:4px;">สัดส่วน 33.10%</div>
                </div>
                <div style="background:#fce7f3; padding:16px; border-radius:10px; border-left:4px solid #db2777;">
                  <small style="color:#be185d; font-weight:600;">2. ร้านอาหารและเครื่องดื่ม (F&B)</small>
                  <h3 id="db-kpi-food" style="margin:6px 0 0; color:#831843; font-size:24px; font-weight:800;">23,783</h3>
                  <div style="font-size:11px; color:#db2777; margin-top:4px;">สัดส่วน 21.89%</div>
                </div>
                <div style="background:#dbeafe; padding:16px; border-radius:10px; border-left:4px solid #2563eb;">
                  <small style="color:#1d4ed8; font-weight:600;">3. ตัวแทนนำเที่ยวและมัคคุเทศก์</small>
                  <h3 id="db-kpi-agent" style="margin:6px 0 0; color:#1e3a8a; font-size:24px; font-weight:800;">22,439</h3>
                  <div style="font-size:11px; color:#2563eb; margin-top:4px;">สัดส่วน 20.65%</div>
                </div>
                <div style="background:#dcfce7; padding:16px; border-radius:10px; border-left:4px solid #16a34a;">
                  <small style="color:#15803d; font-weight:600;">4. สุขภาพและสันทนาการ (Wellness)</small>
                  <h3 id="db-kpi-wellness" style="margin:6px 0 0; color:#14532d; font-size:24px; font-weight:800;">10,059</h3>
                  <div style="font-size:11px; color:#16a34a; margin-top:4px;">สัดส่วน 9.26%</div>
                </div>
              </div>

              <!-- Full 8 Sectors Table (PDF Page 175) -->
              <table class="clean-table" id="table-databank">
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>ประเภทผู้ประกอบการในอุตสาหกรรมท่องเที่ยว</th>
                    <th>จำนวนผู้ประกอบการ (ราย)</th>
                    <th>สัดส่วนร้อยละ (%)</th>
                    <th style="text-align: right;">สถานะความพร้อมข้อมูล (Status)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td><b>ผู้ประกอบการโรงแรมและที่พัก (Accommodation)</b></td>
                    <td><b>35,962.00</b></td>
                    <td>33.10%</td>
                    <td style="text-align: right;"><span class="badge badge-success">เชื่อมโยงระบบสมบูรณ์ 100%</span></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td><b>ผู้ประกอบการร้านอาหารและเครื่องดื่ม (Food and Beverage)</b></td>
                    <td><b>23,783.00</b></td>
                    <td>21.89%</td>
                    <td style="text-align: right;"><span class="badge badge-success">เชื่อมโยงระบบสมบูรณ์ 100%</span></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td><b>ผู้ประกอบการตัวแทนการท่องเที่ยว (Tour Service Provider & Guide)</b></td>
                    <td><b>22,439.00</b></td>
                    <td>20.65%</td>
                    <td style="text-align: right;"><span class="badge badge-success">เชื่อมโยงระบบสมบูรณ์ 100%</span></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td><b>ผู้ประกอบการด้านสุขภาพ และสันทนาการ (Wellness and Recreation)</b></td>
                    <td><b>10,059.00</b></td>
                    <td>9.26%</td>
                    <td style="text-align: right;"><span class="badge badge-success">เชื่อมโยงระบบสมบูรณ์ 100%</span></td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td><b>ผู้ประกอบการร้านค้าปลีก (Retails Shop)</b></td>
                    <td><b>7,673.00</b></td>
                    <td>7.06%</td>
                    <td style="text-align: right;"><span class="badge badge-success">เชื่อมโยงระบบสมบูรณ์ 100%</span></td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td><b>ผู้ประกอบการสถานที่ท่องเที่ยว (Attraction)</b></td>
                    <td><b>3,647.00</b></td>
                    <td>3.36%</td>
                    <td style="text-align: right;"><span class="badge badge-success">เชื่อมโยงระบบสมบูรณ์ 100%</span></td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td><b>ผู้ประกอบการขนส่งผู้โดยสาร (Mobility Service Provider - Passenger)</b></td>
                    <td><b>3,445.00</b></td>
                    <td>3.17%</td>
                    <td style="text-align: right;"><span class="badge badge-success">เชื่อมโยงระบบสมบูรณ์ 100%</span></td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td><b>ชุมชนท่องเที่ยวท้องถิ่น (Local Tourism Community)</b></td>
                    <td><b>1,651.00</b></td>
                    <td>1.52%</td>
                    <td style="text-align: right;"><span class="badge badge-success">เชื่อมโยงระบบสมบูรณ์ 100%</span></td>
                  </tr>
                  <tr style="background:#f1f5f9; font-weight:800;">
                    <td>-</td>
                    <td><b>รวมทั้งสิ้น (Total Tourism Ecosystem)</b></td>
                    <td style="color:#0284c7; font-size:15px;"><b>108,659.00 ราย</b></td>
                    <td><b>100.00%</b></td>
                    <td style="text-align: right; color:#10b981;"><b>บรรลุเป้าหมายตามเกณฑ์ (108.66%)</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ============================================== -->
          <!-- SUB-TAB 2: PACKAGES & SERVICES DIRECTORY (PDF หน้า 208-240) -->
          <!-- ============================================== -->
          <div id="databank-subtab-packages" style="display:none;">
            <div class="table-card">
              <div class="table-card-head" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <span>สารบบสินค้าและบริการด้านการท่องเที่ยว (Target: 200,000 | ผลสำเร็จ: 201,764 รายการ)</span>
                <button class="btn-action" style="font-size:11.5px;" onclick="exportAdminDirectoryCSV()">
                  Export สารบบสินค้าและบริการ CSV 📥
                </button>
              </div>

              <!-- Packages Breakdown Mini-Grid (8 Sectors) -->
              <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin: 14px 0 20px;">
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px;">
                  <div style="font-size:11.5px; color:#64748b;">1. ที่พัก & โรงแรม</div>
                  <b style="font-size:17px; color:#0f172a;">143,035</b> <span style="font-size:11px; color:#64748b;">รายการ</span>
                </div>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px;">
                  <div style="font-size:11.5px; color:#64748b;">2. ตัวแทนนำเที่ยว & ทัวร์</div>
                  <b style="font-size:17px; color:#0f172a;">30,948</b> <span style="font-size:11px; color:#64748b;">รายการ</span>
                </div>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px;">
                  <div style="font-size:11.5px; color:#64748b;">3. สุขภาพ & สันทนาการ</div>
                  <b style="font-size:17px; color:#0f172a;">8,386</b> <span style="font-size:11px; color:#64748b;">รายการ</span>
                </div>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px;">
                  <div style="font-size:11.5px; color:#64748b;">4. แหล่งท่องเที่ยว</div>
                  <b style="font-size:17px; color:#0f172a;">6,652</b> <span style="font-size:11px; color:#64748b;">รายการ</span>
                </div>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px;">
                  <div style="font-size:11.5px; color:#64748b;">5. ร้านอาหาร & คาเฟ่</div>
                  <b style="font-size:17px; color:#0f172a;">6,044</b> <span style="font-size:11px; color:#64748b;">รายการ</span>
                </div>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px;">
                  <div style="font-size:11.5px; color:#64748b;">6. ขนส่งผู้โดยสาร</div>
                  <b style="font-size:17px; color:#0f172a;">5,172</b> <span style="font-size:11px; color:#64748b;">รายการ</span>
                </div>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px;">
                  <div style="font-size:11.5px; color:#64748b;">7. ร้านค้าปลีก / OTOP</div>
                  <b style="font-size:17px; color:#0f172a;">974</b> <span style="font-size:11px; color:#64748b;">รายการ</span>
                </div>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px;">
                  <div style="font-size:11.5px; color:#64748b;">8. ชุมชนท่องเที่ยว</div>
                  <b style="font-size:17px; color:#0f172a;">553</b> <span style="font-size:11px; color:#64748b;">รายการ</span>
                </div>
              </div>

              <!-- Filter Toolbar -->
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
                <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                  <select id="admin-dir-category" class="input-clean" onchange="filterAdminDirectoryTable()" style="font-weight:600;">
                    <option value="all">ทุกหมวดหมู่ (201,764 รายการ)</option>
                    <option value="Accommodation">1. โรงแรมและที่พัก (143,035)</option>
                    <option value="Mobility">2. ขนส่งผู้โดยสาร (5,172)</option>
                    <option value="Attraction">3. สถานที่ท่องเที่ยว (6,652)</option>
                    <option value="Wellness">4. สุขภาพและสปา (8,386)</option>
                    <option value="Tour">5. ตัวแทนท่องเที่ยวและไกด์ (30,948)</option>
                    <option value="Community">6. ชุมชนท่องเที่ยว (553)</option>
                    <option value="Food">7. ร้านอาหารและเครื่องดื่ม (6,044)</option>
                    <option value="Retail">8. ร้านค้าปลีกและของที่ระลึก (974)</option>
                  </select>
                  <input type="text" id="admin-dir-search" class="input-clean" placeholder="🔍 ค้นหาชื่อแพ็กเกจ / ผู้ประกอบการ / จังหวัด..." style="width:280px;" oninput="filterAdminDirectoryTable()">
                </div>
                <span id="admin-dir-count" style="font-size:12.5px; color:var(--text-muted); font-weight:600;">แสดง 21 รายการ (ตัวอย่างอ้างอิงตรงตามเล่มรายงาน)</span>
              </div>

              <!-- Packages Directory Table -->
              <table class="clean-table" id="table-admin-directory">
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>หมวดหมู่อุตสาหกรรม</th>
                    <th>ชื่อผู้ประกอบการ (Supplier)</th>
                    <th>ชื่อสินค้า / แพ็กเกจบริการ</th>
                    <th>จังหวัด / พื้นที่</th>
                    <th>ราคาจำหน่าย (THB)</th>
                    <th>Allotment คงเหลือ</th>
                    <th style="text-align: right;">สถานะการขาย</th>
                  </tr>
                </thead>
                <tbody id="admin-directory-tbody">
                  <!-- Dynamically populated via JavaScript -->
                </tbody>
              </table>
            </div>
          </div>

          <!-- ============================================== -->
          <!-- SUB-TAB 3: BIG DATA ANALYTICS & ECONOMIC VALUE -->
          <!-- ============================================== -->
          <div id="databank-subtab-analytics" style="display:none;">
            <div class="table-card">
              <div class="table-card-head">
                <span>สถาปัตยกรรมข้อมูลกลางและการสร้างมูลค่าทางเศรษฐกิจ (Big Data & Economic Impact)</span>
                <span class="badge badge-success">เป้าหมาย: 12,000 ล้านบาท/ปี</span>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:16px;">
                <!-- Economic Impact Card -->
                <div style="background:linear-gradient(135deg, #f0fdf4, #dcfce7); border:1px solid #bbf7d0; border-radius:12px; padding:20px;">
                  <h4 style="margin:0 0 10px; color:#166534; font-size:16px; display:flex; align-items:center; gap:8px;">
                    <span>💰</span> การสร้างมูลค่าทางเศรษฐกิจ (Economic Value Generated)
                  </h4>
                  <div style="font-size:32px; font-weight:800; color:#14532d; font-family:'IBM Plex Sans Thai';">
                    12,000,000,000+ <span style="font-size:18px; font-weight:600;">บาท/ปี</span>
                  </div>
                  <p style="font-size:13px; color:#166534; line-height:1.6; margin:10px 0 0;">
                    อ้างอิงรายงานสมบูรณ์หน้า 241–243: คำนวณจากผู้ประกอบการในอุตสาหกรรมท่องเที่ยวที่เข้าร่วมโครงการ <b>100,000 ราย</b> มีรายได้เพิ่มขึ้นเฉลี่ย <b>120,000 บาท/ราย/ปี</b> ผ่านช่องทาง Wholesales B2B และการเชื่อมต่อ OTA ระดับสากล
                  </p>
                </div>

                <!-- Big Data Architecture Card -->
                <div style="background:linear-gradient(135deg, #f0f9ff, #e0f2fe); border:1px solid #bae6fd; border-radius:12px; padding:20px;">
                  <h4 style="margin:0 0 10px; color:#0369a1; font-size:16px; display:flex; align-items:center; gap:8px;">
                    <span>☁️</span> Google Cloud Data Foundation Architecture
                  </h4>
                  <p style="font-size:13px; color:#0c4a6e; line-height:1.6; margin:0 0 12px;">
                    อ้างอิงรายงานสมบูรณ์หน้า 158–174: การประมวลผล Big Data ตลอดห่วงโซ่อุปทานการท่องเที่ยว (Tourism Supply Chain) ประกอบด้วย 4 เลเยอร์หลัก:
                  </p>
                  <ul style="margin:0; padding-left:20px; font-size:12.5px; color:#0369a1; line-height:1.7;">
                    <li><b>Data Ingestion:</b> Cloud Storage, Pub/Sub, Dataflow (Batch & Real-time Stream)</li>
                    <li><b>Data Warehouse & Lake:</b> Google BigQuery (Data Preparation, Curated Data)</li>
                    <li><b>Machine Learning:</b> Google Vertex AI (Classification, Regression, Recommendation)</li>
                    <li><b>Visualization & Serving:</b> Looker Studio Dashboard & Cloud Endpoints Open API</li>
                  </ul>
                </div>
              </div>

              <!-- Integration & Open API Policy Card -->
              <div style="margin-top:20px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:18px;">
                <div style="font-weight:700; color:var(--text-main); font-size:14px; margin-bottom:6px;">
                  🔒 นโยบายการคุ้มครองข้อมูลส่วนบุคคล (PDPA) และ Open API Gateway
                </div>
                <div style="font-size:12.5px; color:var(--text-muted); line-height:1.6;">
                  Data Bank ให้บริการข้อมูลในรูปแบบ Open API สำหรับหน่วยงานรัฐและเอกชน (Data Consumers) โดยผ่านกระบวนการ Data Anonymization และ Data Aggregation เพื่อปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) อย่างเคร่งครัด
                </div>
              </div>

            </div>
          </div>

        </div>\n\n        `;

  admin = admin.slice(0, startIndex) + enhancedDataBankView + admin.slice(endIndex);
  console.log('Successfully replaced view-databank-kpi with 3-in-1 Data Bank suite!');
} else {
  console.log('ERROR: oldViewStart or oldViewEnd not found in admin.html');
}

// 3. Add JS functions for Data Bank sub-tabs and directory rendering
const adminDirectoryData = `
    // National Tourism Data Bank Directory Data (อ้างอิงตามรายงานสมบูรณ์ หน้า 176-240)
    const adminDataBankDirectory = [
      { no: 1, cat: 'Accommodation', supplier: 'DNA Resort & Spa', name: 'Deluxe Suite with Jacuzzi', province: 'นครราชสีมา (ปากช่อง)', price: 3990, allotment: 15, status: 'Active' },
      { no: 2, cat: 'Accommodation', supplier: 'เรือนศรีสิริ เกสท์เฮาส์', name: 'Standard Twin Room', province: 'สุโขทัย (เมือง)', price: 850, allotment: 8, status: 'Active' },
      { no: 3, cat: 'Accommodation', supplier: 'เดอะ เซเว่น กระบี่ (SHA Extra Plus)', name: 'Deluxe Sea View Balcony', province: 'กระบี่ (อ่าวนาง)', price: 2450, allotment: 20, status: 'Active' },
      { no: 4, cat: 'Accommodation', supplier: 'โรงแรมชลจันทร์ พัทยา รีสอร์ท', name: 'Superior Ocean Wing', province: 'ชลบุรี (พัทยา)', price: 1890, allotment: 35, status: 'Active' },
      { no: 5, cat: 'Mobility', supplier: 'Limousine Express Saraburi', name: 'Toyota Commuter BKK-Saraburi', province: 'กรุงเทพฯ - สระบุรี', price: 3570, allotment: 5, status: 'Active' },
      { no: 6, cat: 'Mobility', supplier: 'Thai Smile Airways', name: 'Round Trip BKK - CNX (Chiang Mai)', province: 'กรุงเทพฯ - เชียงใหม่', price: 9112, allotment: 12, status: 'Active' },
      { no: 7, cat: 'Mobility', supplier: 'Chic Car Rent Chiang Mai', name: 'Toyota Fortuner SUV 2.4 (Day)', province: 'เชียงใหม่ (สนามบิน)', price: 2273, allotment: 10, status: 'Active' },
      { no: 8, cat: 'Attraction', supplier: 'Chao Phraya Princess Cruise', name: 'Dinner Cruise Ticket at Asiatique', province: 'กรุงเทพฯ (แม่น้ำเจ้าพระยา)', price: 1200, allotment: 100, status: 'Active' },
      { no: 9, cat: 'Attraction', supplier: 'Escape Room Bangkok', name: 'Standard Escape 50 mins - 3 People', province: 'กรุงเทพฯ (สยามสแควร์)', price: 2370, allotment: 25, status: 'Active' },
      { no: 10, cat: 'Attraction', supplier: 'Siam Serpentarium', name: 'Ticket Foreigner / Thai (Children & Adult)', province: 'กรุงเทพฯ (ลาดกระบัง)', price: 250, allotment: 80, status: 'Active' },
      { no: 11, cat: 'Wellness', supplier: '7 Spa Luxury Health & Wellness', name: 'Mud or Clay Body Wrap (120 min)', province: 'ชลบุรี (พัทยา)', price: 1400, allotment: 15, status: 'Active' },
      { no: 12, cat: 'Wellness', supplier: 'ราชาธรา สปา แอนด์ มาสซาจ', name: 'นวดไทยโบราณคลายกล้ามเนื้อ 90 นาที', province: 'สงขลา (หาดใหญ่)', price: 350, allotment: 30, status: 'Active' },
      { no: 13, cat: 'Wellness', supplier: 'โอเอซิส บิวตี้ แอนด์ เวลเนส', name: 'Aromatherapy Massage Candle Experience', province: 'ชลบุรี (บางแสน)', price: 1350, allotment: 12, status: 'Active' },
      { no: 14, cat: 'Tour', supplier: 'Dave Malhotra Thailand Tour', name: 'Half Day (4-5 hrs) VIP Guide English', province: 'กรุงเทพฯ', price: 1700, allotment: 10, status: 'Active' },
      { no: 15, cat: 'Tour', supplier: 'สมพร แอนด์ ที ออลลิเดย์ ทัวร์', name: 'MICE Business Travel Package (Full Day)', province: 'กรุงเทพฯ / นนทบุรี', price: 6000, allotment: 8, status: 'Active' },
      { no: 16, cat: 'Community', supplier: 'กลุ่มท่องเที่ยวบ้านช้างกลาง', name: 'Elephant Show & Bathing Community Tour', province: 'สุรินทร์ (ท่าตูม)', price: 200, allotment: 40, status: 'Active' },
      { no: 17, cat: 'Community', supplier: 'ชุมชนท่องเที่ยวบ้านสันป่าเหียง', name: 'Art Therapy & Eco-Nature Workshop 2D1N', province: 'เชียงราย', price: 3420, allotment: 6, status: 'Active' },
      { no: 18, cat: 'Food', supplier: 'คาเฟ่ดำเนินสะดวก', name: 'เซ็ตอาหารไทยโบราณพร้อมเครื่องดื่มเย็น', province: 'ราชบุรี (ดำเนินสะดวก)', price: 280, allotment: 50, status: 'Active' },
      { no: 19, cat: 'Food', supplier: 'Benihana The Japanese Steakhouse', name: 'Teppanyaki Seafood & Beef Set', province: 'กรุงเทพฯ (เจริญนคร)', price: 2150, allotment: 20, status: 'Active' },
      { no: 20, cat: 'Retail', supplier: 'Ananya Koh Chang Coconut Oil', name: 'Pure Organic Virgin Coconut Oil 500ml', province: 'ตราด (เกาะช้าง)', price: 250, allotment: 100, status: 'Active' },
      { no: 21, cat: 'Retail', supplier: 'OTOP Outlet สระแก้ว', name: 'กระเป๋าผ้าไหมทอมือลายโบราณ', province: 'สระแก้ว', price: 750, allotment: 30, status: 'Active' }
    ];

    function switchDataBankSubTab(tabName) {
      const tabs = ['suppliers', 'packages', 'analytics'];
      tabs.forEach(t => {
        const btn = document.getElementById('tab-btn-' + t);
        const sec = document.getElementById('databank-subtab-' + t);
        if (btn) {
          if (t === tabName) {
            btn.className = 'btn-action';
          } else {
            btn.className = 'btn-secondary';
          }
        }
        if (sec) {
          sec.style.display = (t === tabName) ? 'block' : 'none';
        }
      });
      if (tabName === 'packages') {
        renderAdminDirectory();
      }
    }

    function renderAdminDirectory() {
      const tbody = document.getElementById('admin-directory-tbody');
      if (!tbody) return;
      const cat = document.getElementById('admin-dir-category') ? document.getElementById('admin-dir-category').value : 'all';
      const search = (document.getElementById('admin-dir-search') ? document.getElementById('admin-dir-search').value : '').toLowerCase();

      const filtered = adminDataBankDirectory.filter(d => {
        if (cat !== 'all' && d.cat !== cat) return false;
        if (search && !d.supplier.toLowerCase().includes(search) && !d.name.toLowerCase().includes(search) && !d.province.toLowerCase().includes(search)) return false;
        return true;
      });

      tbody.innerHTML = filtered.map(d => \`
        <tr>
          <td>\${d.no}</td>
          <td><span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:600;">\${d.cat}</span></td>
          <td><b>\${d.supplier}</b></td>
          <td>\${d.name}</td>
          <td>\${d.province}</td>
          <td><b style="font-family:'IBM Plex Sans Thai'; color:#0f172a;">฿\${d.price.toLocaleString('th-TH')}</b></td>
          <td><span style="color:#08b99d; font-weight:700;">\${d.allotment} หน่วย</span></td>
          <td style="text-align: right;"><span class="badge badge-success">พร้อมจำหน่าย</span></td>
        </tr>
      \`).join('');

      const countEl = document.getElementById('admin-dir-count');
      if (countEl) countEl.textContent = \`แสดง \${filtered.length} รายการ (จากสารบบสินค้าโครงการ 201,764 รายการ)\`;
    }

    function filterAdminDirectoryTable() {
      renderAdminDirectory();
    }

    function exportAdminDirectoryCSV() {
      const headers = ['ลำดับ', 'หมวดหมู่', 'ผู้ประกอบการ', 'สินค้า/บริการ', 'จังหวัด', 'ราคา', 'โควตา', 'สถานะ'];
      const rows = adminDataBankDirectory.map(d => [
        d.no, d.cat, \`"\${d.supplier}"\`, \`"\${d.name}"\`, \`"\${d.province}"\`, d.price, d.allotment, d.status
      ]);
      const bom = '\\uFEFF';
      const content = bom + [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ThailandConnex_Packages_201k_DataBank.csv';
      a.click();
      URL.revokeObjectURL(url);
      showToast('📥 ดาวน์โหลดสารบบสินค้า Data Bank เรียบร้อยแล้ว');
    }
`;

// Insert the new functions before DOMContentLoaded
admin = admin.replace(
  "document.addEventListener('DOMContentLoaded', () => {",
  adminDirectoryData + "\n    document.addEventListener('DOMContentLoaded', () => {\n      // Check URL hash for direct tab navigation\n      if (window.location.hash === '#databank') {\n        switchView('databank-kpi', document.getElementById('btn-databank'));\n      }\n      renderAdminDirectory();\n"
);

fs.writeFileSync('admin.html', admin, 'utf8');
console.log('admin.html updated successfully with complete Data Bank!');
