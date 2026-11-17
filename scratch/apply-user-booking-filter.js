const fs = require('fs');

console.log('--- Step 1: Update shared-store.js with version 6 & user IDs on reservations ---');
let store = fs.readFileSync('shared-store.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Update version to 6
store = store.replace("STORAGE_KEY = 'TC_DATA_STORE_V5';", "STORAGE_KEY = 'TC_DATA_STORE_V6';");
store = store.replace("version: 5,", "version: 6,");

// 2. Update default reservations with userId and guest matching users
const oldResBlock = `reservations: [
      {
        id: '128669226',
        refNo: '1675671128669657',
        guest: 'อลิสา ใจดี (User Portal)',
        email: 'alisa.jaidee@thailandconnex.com',
        phone: '082-340-1223',
        agent: 'User Direct (Portal)',
        serviceName: 'Sealife Bangkok - SLBK Aquarium Admission Only',
        property: 'Sealife Bangkok',
        checkin: '2026-11-20',
        checkout: '2026-11-20',
        bookedOn: '2026-11-17 10:15:00',
        amount: 430,
        commission: 22,
        status: 'Confirmed',
        notes: 'จองผ่านระบบ ThailandCONNEX Portal (ได้รับ 21.50 TCP)'
      },
      {
        id: '215983224',
        refNo: '1675670860215983',
        guest: 'Snow Witch',
        email: 'snow.witch@travizgo.com',
        phone: '086-111-2233',
        agent: 'TVG Agent',
        serviceName: 'บัตรเข้าชมวิว + บุฟเฟ่ต์มื้อค่ำ Bangkok Balcony',
        property: 'ตึกใบหยกสกาย',
        checkin: '2026-11-23',
        checkout: '2026-11-23',
        bookedOn: '2026-11-16 13:33:36',
        amount: 860,
        commission: 43,
        status: 'Confirmed',
        notes: 'ตั๋วเด็กและผู้ใหญ่ รวม 2 ใบ'
      },
      {
        id: '436181225',
        refNo: '1675670436181950',
        guest: 'Canabis Fly',
        email: 'flycan@outlook.com',
        phone: '084-555-0192',
        agent: 'TVG Agent',
        serviceName: 'ล่องเรือสำราญ Chao Phraya Princess Cruise',
        property: 'Chao Phraya Princess',
        checkin: '2026-11-25',
        checkout: '2026-11-25',
        bookedOn: '2026-11-16 15:00:36',
        amount: 1200,
        commission: 60,
        status: 'Confirmed',
        notes: 'โต๊ะริมน้ำ 2 ท่าน'
      },
      {
        id: '100101',
        refNo: '1675670100101889',
        guest: 'Hikikaya Hachiman',
        email: 'hikikaya@traveler.com',
        phone: '095-809-8123',
        agent: 'Gianttick OTA',
        serviceName: 'Basic Room With Fan / Shared Bath',
        property: 'Digital Valley Hotel',
        checkin: '2026-11-28',
        checkout: '2026-12-03',
        bookedOn: '2026-11-15 11:20:00',
        amount: 9000,
        commission: 450,
        status: 'Confirmed',
        notes: 'ขอห้องชั้นบน ไม่สูบบุหรี่'
      },
      {
        id: '100102',
        refNo: '1675670100102441',
        guest: 'Hippo Potamus',
        email: 'hippo.p@gmail.com',
        phone: '081-234-5678',
        agent: 'User Direct',
        serviceName: 'Basic Room Shared Bath room',
        property: 'Digital Valley Hotel',
        checkin: '2026-12-01',
        checkout: '2026-12-05',
        bookedOn: '2026-11-14 09:45:00',
        amount: 6400,
        commission: 320,
        status: 'Cancelled',
        notes: 'ยกเลิกเนื่องจากเที่ยวบินล่าช้า'
      },
      {
        id: '100103',
        refNo: '1675670100103552',
        guest: 'Cat Meow',
        email: 'catmeow@yahoo.com',
        phone: '089-987-6543',
        agent: 'Traveloka Partner',
        serviceName: 'Basic Room Shared Bath room',
        property: 'Digital Valley Hotel',
        checkin: '2026-12-02',
        checkout: '2026-12-07',
        bookedOn: '2026-11-13 14:10:00',
        amount: 7500,
        commission: 375,
        status: 'PendingConfirm',
        notes: 'รอเอกสารยืนยันจากเอเจนต์'
      },
      {
        id: '100104',
        refNo: '1675670100104882',
        guest: 'Need Sleep',
        email: 'sleepnow@gmail.com',
        phone: '092-441-2300',
        agent: 'User Direct',
        serviceName: 'Basic Room Shared Bath room',
        property: 'Digital Valley Hotel',
        checkin: '2026-12-20',
        checkout: '2026-12-24',
        bookedOn: '2026-11-12 16:30:00',
        amount: 5600,
        commission: 280,
        status: 'Confirmed',
        notes: 'ต้องการเตียงคู่'
      }
    ]`;

const newResBlock = `reservations: [
      {
        id: '128669226',
        refNo: '1675671128669657',
        userId: 'TC-849204',
        guest: 'คุณอลิสา ใจดี',
        email: 'alisa.jaidee@thailandconnex.com',
        phone: '082-340-1223',
        agent: 'User Direct (Portal)',
        serviceName: 'Sealife Bangkok - SLBK Aquarium Admission Only',
        property: 'Sealife Bangkok',
        checkin: '2026-11-20',
        checkout: '2026-11-20',
        bookedOn: '2026-11-17 10:15:00',
        amount: 430,
        commission: 22,
        status: 'Confirmed',
        notes: 'จองผ่านระบบ ThailandCONNEX Portal (ได้รับ 21.50 TCP)'
      },
      {
        id: '955397221',
        refNo: '1675421955398332',
        userId: 'TC-849204',
        guest: 'คุณอลิสา ใจดี',
        email: 'alisa.jaidee@thailandconnex.com',
        phone: '082-340-1223',
        agent: 'User Direct (Portal)',
        serviceName: 'Sukhumvit Park, Bangkok - Executive Suite',
        property: 'Marriott Executive Apartments',
        checkin: '2026-11-25',
        checkout: '2026-11-27',
        bookedOn: '2026-11-16 14:20:00',
        amount: 8500,
        commission: 425,
        status: 'Confirmed',
        notes: 'จองห้องพักประเภท 1 Bedroom พร้อมอาหารเช้า'
      },
      {
        id: '436181225',
        refNo: '1675670436181950',
        userId: 'TC-391820',
        guest: 'สมชาย ท่องไทย',
        email: 'somchai.t@gmail.com',
        phone: '089-123-4567',
        agent: 'User Direct (Portal)',
        serviceName: 'ล่องเรือสำราญ Chao Phraya Princess Cruise',
        property: 'Chao Phraya Princess',
        checkin: '2026-11-25',
        checkout: '2026-11-25',
        bookedOn: '2026-11-16 15:00:36',
        amount: 1200,
        commission: 60,
        status: 'Confirmed',
        notes: 'โต๊ะริมน้ำ 2 ท่าน'
      },
      {
        id: '801188222',
        refNo: '1675664801188094',
        userId: 'TC-512093',
        guest: 'Panop Api',
        email: 'panop@inrum.co.th',
        phone: '081-987-6543',
        agent: 'TVG Agent',
        serviceName: '7 Spa Luxury - Mud or Clay Body Wrap (120 min)',
        property: '7 Spa Luxury Health & Wellness',
        checkin: '2026-11-28',
        checkout: '2026-11-28',
        bookedOn: '2026-11-15 13:26:41',
        amount: 1400,
        commission: 70,
        status: 'Confirmed',
        notes: 'นัดหมายรอบบ่าย 14:00 น.'
      },
      {
        id: '215983224',
        refNo: '1675670860215983',
        userId: 'TC-991001',
        guest: 'Snow Witch',
        email: 'snow.witch@travizgo.com',
        phone: '086-111-2233',
        agent: 'TVG Agent',
        serviceName: 'บัตรเข้าชมวิว + บุฟเฟ่ต์มื้อค่ำ Bangkok Balcony',
        property: 'ตึกใบหยกสกาย',
        checkin: '2026-11-23',
        checkout: '2026-11-23',
        bookedOn: '2026-11-16 13:33:36',
        amount: 860,
        commission: 43,
        status: 'Confirmed',
        notes: 'ตั๋วเด็กและผู้ใหญ่ รวม 2 ใบ'
      },
      {
        id: '100101',
        refNo: '1675670100101889',
        userId: 'TC-991002',
        guest: 'Hikikaya Hachiman',
        email: 'hikikaya@traveler.com',
        phone: '095-809-8123',
        agent: 'Gianttick OTA',
        serviceName: 'Basic Room With Fan / Shared Bath',
        property: 'Digital Valley Hotel',
        checkin: '2026-11-28',
        checkout: '2026-12-03',
        bookedOn: '2026-11-15 11:20:00',
        amount: 9000,
        commission: 450,
        status: 'Confirmed',
        notes: 'ขอห้องชั้นบน ไม่สูบบุหรี่'
      },
      {
        id: '100102',
        refNo: '1675670100102441',
        userId: 'TC-991003',
        guest: 'Hippo Potamus',
        email: 'hippo.p@gmail.com',
        phone: '081-234-5678',
        agent: 'User Direct',
        serviceName: 'Basic Room Shared Bath room',
        property: 'Digital Valley Hotel',
        checkin: '2026-12-01',
        checkout: '2026-12-05',
        bookedOn: '2026-11-14 09:45:00',
        amount: 6400,
        commission: 320,
        status: 'Cancelled',
        notes: 'ยกเลิกเนื่องจากเที่ยวบินล่าช้า'
      },
      {
        id: '100103',
        refNo: '1675670100103552',
        userId: 'TC-991004',
        guest: 'Cat Meow',
        email: 'catmeow@yahoo.com',
        phone: '089-987-6543',
        agent: 'Traveloka Partner',
        serviceName: 'Basic Room Shared Bath room',
        property: 'Digital Valley Hotel',
        checkin: '2026-12-02',
        checkout: '2026-12-07',
        bookedOn: '2026-11-13 14:10:00',
        amount: 7500,
        commission: 375,
        status: 'PendingConfirm',
        notes: 'รอเอกสารยืนยันจากเอเจนต์'
      },
      {
        id: '100104',
        refNo: '1675670100104882',
        userId: 'TC-991005',
        guest: 'Need Sleep',
        email: 'sleepnow@gmail.com',
        phone: '092-441-2300',
        agent: 'User Direct',
        serviceName: 'Basic Room Shared Bath room',
        property: 'Digital Valley Hotel',
        checkin: '2026-12-20',
        checkout: '2026-12-24',
        bookedOn: '2026-11-12 16:30:00',
        amount: 5600,
        commission: 280,
        status: 'Confirmed',
        notes: 'ต้องการเตียงคู่'
      }
    ]`;

if (store.includes(oldResBlock)) {
  store = store.replace(oldResBlock, newResBlock);
  console.log('Updated reservations in shared-store.js with user-specific mappings');
} else {
  console.log('WARNING: oldResBlock not matched in shared-store.js');
}

// 3. Update addReservation to always attach currentUser.id
const oldAddRes = `      const newBooking = {
        id: String(id),
        refNo: String(refNo),
        guest: res.guest || state.user.name,
        email: res.email || state.user.email,
        phone: res.phone || state.user.phone,`;

const newAddRes = `      const curUser = (state.auth && state.auth.currentUser) ? state.auth.currentUser : (state.user || {});
      const newBooking = {
        id: String(id),
        refNo: String(refNo),
        userId: res.userId || curUser.id || state.user.id || 'TC-849204',
        guest: res.guest || curUser.name || state.user.name,
        email: res.email || curUser.email || state.user.email,
        phone: res.phone || curUser.phone || state.user.phone,`;

if (store.includes(oldAddRes)) {
  store = store.replace(oldAddRes, newAddRes);
  console.log('Updated addReservation with userId in shared-store.js');
}

fs.writeFileSync('shared-store.js', store, 'utf8');
console.log('shared-store.js saved successfully!');
