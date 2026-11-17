/**
 * ThailandCONNEX - Shared Real-time Data Store (V3)
 * Full Bi-directional Synchronized Store between Admin and User Portals
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TCStore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEY = 'TC_DATA_STORE_V6';

  const DEFAULT_STATE = {
    version: 6,
    lastUpdated: Date.now(),
    user: {
      name: 'อลิสา ใจดี',
      id: 'TC-849204',
      email: 'alisa.jaidee@thailandconnex.com',
      phone: '082-340-1223',
      walletAddress: '0x5E2D25aca0abA3ad658B3Ac1620F0DAB9733760',
      tokenBalance: 41520.00
    },
    auth: {
      currentUser: {
        isLoggedIn: true,
        name: 'อลิสา ใจดี',
        id: 'TC-849204',
        email: 'alisa.jaidee@thailandconnex.com',
        phone: '082-340-1223',
        walletAddress: '0x5E2D25aca0abA3ad658B3Ac1620F0DAB9733760',
        tokenBalance: 41520.00,
        avatar: 'AJ',
        tier: 'VIP Platinum Traveler',
        registeredDate: '2023-01-15'
      },
      currentAdmin: {
        isLoggedIn: true,
        name: 'ฐาปกรณ์ สันติชาติศักดิ์ (depa)',
        email: 'thapakorn.s@depa.or.th',
        role: 'Super Administrator',
        org: 'depa Central Hub',
        avatar: '👨‍💼',
        badge: 'Super Admin'
      },
      registeredUsers: [
        {
          id: 'TC-849204',
          name: 'คุณอลิสา ใจดี',
          email: 'alisa.jaidee@thailandconnex.com',
          password: 'password123',
          phone: '082-340-1223',
          walletAddress: '0x5E2D25aca0abA3ad658B3Ac1620F0DAB9733760',
          tokenBalance: 41520.00,
          avatar: 'AJ',
          tier: 'VIP Platinum Traveler',
          status: 'Active',
          registeredDate: '2023-01-15'
        },
        {
          id: 'TC-391820',
          name: 'สมชาย ท่องไทย',
          email: 'somchai.t@gmail.com',
          password: 'password123',
          phone: '089-123-4567',
          walletAddress: '0x71C4B92F26c95BfBE8b105A12E83204981Ea1945',
          tokenBalance: 5800.00,
          avatar: 'ST',
          tier: 'Gold Traveler',
          status: 'Active',
          registeredDate: '2023-02-01'
        },
        {
          id: 'TC-512093',
          name: 'Panop Api',
          email: 'panop@inrum.co.th',
          password: 'password123',
          phone: '081-987-6543',
          walletAddress: '0x992B16c3182b8F6aF4f98Da3f9468F635d87bB62',
          tokenBalance: 12450.00,
          avatar: 'PA',
          tier: 'Silver Explorer',
          status: 'Active',
          registeredDate: '2023-02-05'
        },
        {
          id: 'TC-620184',
          name: 'Ahibal Lahiri',
          email: 'ahibal@thailandconnex.com',
          password: 'password123',
          phone: '083-456-7890',
          walletAddress: '0x438A9412F5eA19C08D649216cA96Ea90729783D1',
          tokenBalance: 3200.00,
          avatar: 'AL',
          tier: 'Explorer',
          status: 'Active',
          registeredDate: '2023-02-06'
        }
      ],
      adminAccounts: [
        {
          email: 'thapakorn.s@depa.or.th',
          name: 'ฐาปกรณ์ สันติชาติศักดิ์ (depa)',
          role: 'Super Administrator',
          org: 'depa Central Hub',
          avatar: '👨‍💼',
          badge: 'Super Admin'
        },
        {
          email: 'boonyarit.r@travizgo.com',
          name: 'บุญญฤทธิ์ ฤทธิ์เดช',
          role: 'Platform Operations Admin',
          org: 'TRAVIZGO Platform',
          avatar: '👨‍💻',
          badge: 'Operations'
        },
        {
          email: 'somchai@phuket-tour.co.th',
          name: 'สมชาย ท่องเที่ยว (Hotel Partner)',
          role: 'Merchant / Hotel Manager',
          org: 'Phuket Tour & Partner Hub',
          avatar: '🏨',
          badge: 'Hotel Partner'
        },
        {
          email: 'auditor@tat.or.th',
          name: 'ผู้ตรวจสอบ ททท. (TAT Auditor)',
          role: 'TAT Tourism Data Auditor',
          org: 'Tourism Authority of Thailand',
          avatar: '🏛️',
          badge: 'TAT Auditor'
        }
      ]
    },
    services: [
      {
        id: 'SRV-01',
        category: 'accommodation',
        categoryName: 'โรงแรมและที่พัก',
        title: 'Sukhumvit Park, Bangkok - Marriott Executive Apartments',
        provider: 'Sukhumvit Park Hotel',
        location: 'สุขุมวิท, กรุงเทพมหานคร',
        rating: '4.9 ★',
        features: ['SHA Plus', 'WiFi ฟรี', 'สระว่ายน้ำ', 'ใกล้ BTS'],
        price: 28999,
        unit: 'คืน',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        roomType: 'One Bedroom Suite',
        allotment: 12
      },
      {
        id: 'SRV-02',
        category: 'accommodation',
        categoryName: 'โรงแรมและที่พัก',
        title: 'Cye 428 All Day Hostel @ Sukhumvit',
        provider: 'Cye Hospitality Group',
        location: 'คลองเตย, กรุงเทพมหานคร',
        rating: '4.8 ★',
        features: ['ฟรีอาหารเช้า', 'Co-working Space', 'WiFi ความเร็วสูง'],
        price: 1850,
        unit: 'คืน',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
        roomType: 'Deluxe Dormitory Room',
        allotment: 24
      },
      {
        id: 'SRV-03',
        category: 'accommodation',
        categoryName: 'โรงแรมและที่พัก',
        title: 'เดอะ มยุ สกาย รีสอร์ท แมท หัวหิน (SHA Extra Plus)',
        provider: 'บจก. สวนพักรักไทยโฮมสเตย์',
        location: 'หัวหิน, ประจวบคีรีขันธ์',
        rating: '4.9 ★',
        features: ['วิวทะเลส่วนตัว', 'อาหารเช้า 2 ท่าน', 'สระว่ายน้ำอินฟินิตี้'],
        price: 3994,
        unit: 'คืน',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        roomType: 'Deluxe With Breakfast',
        allotment: 8
      },
      {
        id: 'SRV-04',
        category: 'attraction',
        categoryName: 'แหล่งท่องเที่ยว',
        title: 'บัตรเข้าชมวิว + ดินเนอร์บุฟเฟ่ต์ ตึกใบหยกสกาย',
        provider: 'Bangkok Balcony Baiyoke',
        location: 'ราชเทวี, กรุงเทพมหานคร',
        rating: '4.7 ★',
        features: ['ชมวิวชั้น 77 & 84', 'บุฟเฟ่ต์ซีฟู้ดพรีเมียม', 'Open Air Balcony'],
        price: 1290,
        unit: 'ท่าน',
        image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80',
        roomType: 'Dinner Buffet Ticket',
        allotment: 50
      },
      {
        id: 'SRV-05',
        category: 'wellness',
        categoryName: 'สุขภาพและสปา',
        title: '7 Spa Luxury Health & Wellness - Mud Wrap & Thai Herbal',
        provider: '7 Spa Luxury Group',
        location: 'บางละมุง, ชลบุรี',
        rating: '4.9 ★',
        features: ['นวด 120 นาที', 'อ่างแช่น้ำแร่สมุนไพร', 'Welcome Drink'],
        price: 1400,
        unit: 'คอร์ส',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
        roomType: 'Mud or Clay Body Wrap (120 Mins)',
        allotment: 15
      },
      {
        id: 'SRV-06',
        category: 'tour',
        categoryName: 'แพ็กเกจทัวร์',
        title: 'ล่องเรือสำราญ Chao Phraya Princess Cruise ดินเนอร์ใต้แสงจันทร์',
        provider: 'Chao Phraya Princess',
        location: 'ท่าเรือเอเชียทีค, กรุงเทพมหานคร',
        rating: '4.8 ★',
        features: ['บุฟเฟ่ต์นานาชาติ', 'ดนตรีสด Live Band', 'ล่อง 2 ชั่วโมง'],
        price: 1200,
        unit: 'ท่าน',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
        roomType: 'Dinner Cruise Standard',
        allotment: 40
      },
      {
        id: 'SRV-07',
        category: 'community',
        categoryName: 'ชุมชนท่องเที่ยว',
        title: 'วิถีชุมชนท่องเที่ยวบ้านช้างกลาง & การแสดงช้างแสนรู้',
        provider: 'กลุ่มอนุรักษ์ช้างสุรินทร์',
        location: 'ท่าตูม, สุรินทร์',
        rating: '4.9 ★',
        features: ['อาบน้ำช้าง', 'อาหารพื้นบ้านท้องถิ่น', 'เวิร์กช็อปหัตถกรรม'],
        price: 450,
        unit: 'ท่าน',
        image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80',
        roomType: 'Day Pass + Activity',
        allotment: 30
      },
      {
        id: 'SRV-08',
        category: 'mobility',
        categoryName: 'ขนส่งและยานพาหนะ',
        title: 'Limousine Express รถตู้ VIP สุวรรณภูมิ - พัทยา',
        provider: 'Limousine Express Thailand',
        location: 'กรุงเทพฯ - พัทยา',
        rating: '4.8 ★',
        features: ['เบาะนวดปรับไฟฟ้า', 'คนขับมืออาชีพ', 'น้ำดื่มฟรี'],
        price: 3570,
        unit: 'เที่ยว',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
        roomType: 'Toyota Commuter VIP 9 Seats',
        allotment: 10
      },
      {
        id: 'SRV-09',
        category: 'accommodation',
        categoryName: 'โรงแรมและที่พัก',
        title: 'Andaman Seaview Resort Kata Beach (SHA Extra Plus)',
        provider: 'บจก. กะตะ ซีวิว ภูเก็ต',
        location: 'กะตะ, ภูเก็ต',
        rating: '4.9 ★',
        features: ['ติดหาดกะตะ', 'สระว่ายน้ำ 2 สระ', 'ฟรีอาหารเช้าบุฟเฟ่ต์'],
        price: 2450,
        unit: 'คืน',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
        roomType: 'Deluxe Ocean View Room',
        allotment: 14
      },
      {
        id: 'SRV-10',
        category: 'tour',
        categoryName: 'แพ็กเกจทัวร์',
        title: 'One Day Trip ดำน้ำเกาะพีพี - อ่าวมาหยา Speedboat คาตามารัน',
        provider: 'Phuket Marine Tour Co., Ltd.',
        location: 'ท่าเรือรัษฎา, ภูเก็ต',
        rating: '4.9 ★',
        features: ['อุปกรณ์ดำน้ำครบชุด', 'อาหารกลางวันบุฟเฟ่ต์', 'ประกันอุบัติเหตุ'],
        price: 1890,
        unit: 'ท่าน',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
        roomType: 'Catamaran Speedboat Day Tour',
        allotment: 35
      },
      {
        id: 'SRV-11',
        category: 'accommodation',
        categoryName: 'โรงแรมและที่พัก',
        title: 'Chiang Mai Heritage Boutique Hotel & Lanna Spa',
        provider: 'เฮอริเทจ ลานนา กรุ๊ป',
        location: 'คูเมือง, เชียงใหม่',
        rating: '4.8 ★',
        features: ['สถาปัตยกรรมล้านนา', 'สระน้ำเกลือ', 'ใกล้ถนนคนเดินท่าแพ'],
        price: 1950,
        unit: 'คืน',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
        roomType: 'Lanna Heritage Superior',
        allotment: 9
      },
      {
        id: 'SRV-12',
        category: 'tour',
        categoryName: 'แพ็กเกจทัวร์',
        title: 'ทัวร์ดอยอินทนนท์ เส้นทางศึกษาธรรมชาติกิ่วแม่ปาน + ไกด์ท้องถิ่น',
        provider: 'เชียงใหม่ อีโค่ ทัวร์ริซึ่ม',
        location: 'จอมทอง, เชียงใหม่',
        rating: '4.9 ★',
        features: ['รถตู้ VIP รับส่งโรงแรม', 'ไกด์ม้งท้องถิ่น', 'ชมพระมหาธาตุเจดีย์'],
        price: 1350,
        unit: 'ท่าน',
        image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=80',
        roomType: 'Full Day Eco Tour',
        allotment: 20
      },
      {
        id: 'SRV-13',
        category: 'attraction',
        categoryName: 'แหล่งท่องเที่ยว',
        title: 'บัตรสวนน้ำ Columbia Pictures Aquaverse Pattaya',
        provider: 'Aquaverse Management Ltd.',
        location: 'นาจอมเทียน, ชลบุรี',
        rating: '4.7 ★',
        features: ['เล่นได้ไม่จำกัดเครื่องเล่น', 'โซนเด็กและครอบครัว', 'Cabana ส่วนตัว'],
        price: 990,
        unit: 'ท่าน',
        image: 'https://images.unsplash.com/photo-1582650625119-3a31f841807d?auto=format&fit=crop&w=600&q=80',
        roomType: 'All-Day Pass Ticket',
        allotment: 60
      },
      {
        id: 'SRV-14',
        category: 'accommodation',
        categoryName: 'โรงแรมและที่พัก',
        title: 'Samui Sunset Bay Private Pool Villa',
        provider: 'สมุย ซันเซ็ท รีสอร์ท กรุ๊ป',
        location: 'บ่อผุด, สุราษฎร์ธานี',
        rating: '4.9 ★',
        features: ['วิลล่าพร้อมสระส่วนตัว', 'วิวทะเลพาโนรามา', 'Floating Breakfast'],
        price: 4890,
        unit: 'คืน',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
        roomType: 'Oceanfront Pool Villa',
        allotment: 6
      }
    ],
    reservations: [
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
    ],
    tokenLogs: [
      {
        time: '2026-11-17 10:15:00',
        action: 'Token Minting',
        actionCode: '+',
        detail: 'Earned from booking #128669226 (Sealife Bangkok)',
        amount: 21.50,
        balance: 41520.00,
        txHash: '0x19969313908271dfcc89100293847a98b',
        block: '8481515',
        status: 'Confirmed'
      },
      {
        time: '2026-11-16 13:33:36',
        action: 'Token Minting',
        actionCode: '+',
        detail: 'Earned from booking #215983224 (ตึกใบหยกสกาย)',
        amount: 43.00,
        balance: 41498.50,
        txHash: '0x3f98a213908271dfcc89100293847b71c',
        block: '8481480',
        status: 'Confirmed'
      },
      {
        time: '2026-11-15 16:40:12',
        action: 'Token Burning',
        actionCode: '-',
        detail: 'Redeemed for voucher discount (ศูนย์อนุรักษ์ช้างไทย)',
        amount: -95.00,
        balance: 41455.50,
        txHash: '0x0c4a9cea7a1efde4e8194017583920194',
        block: '8481443',
        status: 'Confirmed'
      },
      {
        time: '2026-11-14 11:22:00',
        action: 'Transfer Out',
        actionCode: 'T',
        detail: 'โอนคะแนนให้ TC-992100',
        amount: -100.00,
        balance: 41550.50,
        txHash: '0x88f219213908271dfcc89100293849921a',
        block: '8481390',
        status: 'Confirmed'
      }
    ],
    vouchers: [
      {
        id: 'VOUCH-01',
        name: 'Voucher เข้าชมศูนย์อนุรักษ์ช้างไทย 1 รอบ',
        category: 'บัตรเข้าชมและกิจกรรม',
        points: 95,
        rating: '4.9 ★★★★★',
        validUntil: '12/03/2567',
        remaining: 365,
        desc: 'การแสดงของช้างในวันธรรมดา มี 2 รอบ เวลา 08.00 น. และ 11.00 น. วันหยุดนักขัตฤกษ์เพิ่มรอบ 13.30 น. มีบริการนั่งช้างรอบบริเวณ',
        image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'VOUCH-02',
        name: 'นวดน้ำมันอุ่นทองคำแบบไทยดั้งเดิม 120 นาที',
        category: 'สุขภาพและสปา',
        points: 70,
        rating: '4.8 ★★★★★',
        validUntil: '30/04/2567',
        remaining: 120,
        desc: 'ผ่อนคลายด้วยเทคนิคการนวดแบบไทยผสมผสานเข้ากับการนวดน้ำมันอุ่นกลิ่นอโรมาทองคำ ช่วยฟื้นฟูความเหนื่อยล้าจากการเดินทาง',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'VOUCH-03',
        name: 'เซ็ตอาหารไทยรสชาติดั้งเดิมสำหรับ 3 ท่าน พร้อมเครื่องดื่ม',
        category: 'ร้านอาหาร',
        points: 120,
        rating: '4.9 ★★★★★',
        validUntil: '02/07/2567',
        remaining: 85,
        desc: 'ชุดเซ็ตอาหารไทยสำรับเอก ประกอบด้วยต้มยำกุ้งแม่น้ำ แกงเขียวหวานเนื้อน่องลาย ปลากะพงทอดน้ำปลา เสิร์ฟพร้อมข้าวหอมมะลิและเครื่องดื่มสมุนไพร',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'VOUCH-04',
        name: 'กิจกรรมไหว้พระ 9 วัด กรุงเทพมหานคร ใน 1 วัน',
        category: 'ทัวร์และท่องเที่ยว',
        points: 150,
        rating: '4.7 ★★★★☆',
        validUntil: '20/12/2567',
        remaining: 200,
        desc: 'เที่ยวชมและไหว้พระ 9 วัดดังของกรุงเทพฯ เสริมสิริมงคล พร้อมมัคคุเทศก์ผู้เชี่ยวชาญบรรยายประวัติศาสตร์และเรือรับส่งปรับอากาศ',
        image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'VOUCH-05',
        name: 'แพ็กเกจที่พัก 3 วัน 2 คืน รีสอร์ทริมทะเลบรรยากาศเงียบสงบ',
        category: 'ที่พักและโรงแรม',
        points: 350,
        rating: '5.0 ★★★★★',
        validUntil: '30/09/2567',
        remaining: 45,
        desc: 'พักผ่อนริมทะเลหัวหิน ห้อง Deluxe Sea View พร้อมอาหารเช้า 2 ท่าน และกิจกรรมพายซับบอร์ดชมพระอาทิตย์ขึ้น',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'VOUCH-06',
        name: 'คูปองอาหารเช้าบุฟเฟต์นานาชาติ สำหรับ 2 ท่าน',
        category: 'ร้านอาหาร',
        points: 45,
        rating: '4.6 ★★★★☆',
        validUntil: '15/06/2567',
        remaining: 300,
        desc: 'อิ่มอร่อยกับบุฟเฟต์มื้อเช้า ณ โรงแรมเครือ ThailandCONNEX พรีเมียม ทั้งเมนูตะวันตก ติ่มซำ และอาหารไทยเลิศรส',
        image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=500&q=80'
      }
    ],
    myCoupons: [
      {
        id: 'CPN-1001',
        name: 'บัตรเข้าชมศูนย์อนุรักษ์ช้างไทย 1 วัน พร้อมคูปองอาหารกลางวัน',
        detail: 'การแสดงของช้างในวันธรรมดา มี 2 รอบ เวลา 8.00 น. และ 11.00 น. สำหรับวันเสาร์-อาทิตย์ วันหยุดนักขัตฤกษ์ เพิ่มรอบ 13.30 น. บริการนั่งช้างรอบบริเวณ',
        expDate: '20/05/2567',
        barcode: '4534 3452 235 56867 678',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'CPN-1002',
        name: 'เซ็ตอาหารไทยสำหรับ 3 ท่าน พร้อมเครื่องดื่มสมุนไพร',
        detail: 'ชุดเซ็ตอาหารไทยรสชาติดั้งเดิมเสิร์ฟพร้อมเครื่องดื่มชาไทย 3 ท่าน ณ ห้องอาหารเรือนขวัญ',
        expDate: '02/07/2567',
        barcode: '8852 9182 341 90283 119',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'CPN-1003',
        name: 'กิจกรรมไหว้พระ 9 วัด กรุงเทพมหานคร แบบ VIP เรือด่วนปรับอากาศ',
        detail: 'เที่ยวชมและไหว้พระ 9 วัดดังของกรุงเทพฯ ด้วยเรือท่องเที่ยวและรถนำเที่ยวปรับอากาศ',
        expDate: '20/12/2567',
        barcode: '9182 1029 482 19283 401',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=400&q=80'
      }
    ]
  };

  const getStorage = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
      if (typeof localStorage !== 'undefined' && localStorage && typeof localStorage.getItem === 'function') return localStorage;
    } catch (e) {
      // restricted
    }
    return null;
  };

  function generateHash() {
    return '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  }

  function generateBlock() {
    return (8481520 + Math.floor(Math.random() * 200)).toString();
  }

  function getNowStr() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  class Store {
    constructor() {
      this.listeners = [];
      this._memoryCache = null;
      this.init();
      this.setupStorageListener();
    }

    init() {
      const storage = getStorage();
      if (!storage) {
        this._memoryCache = JSON.parse(JSON.stringify(DEFAULT_STATE));
        return;
      }
      try {
        const raw = storage.getItem(STORAGE_KEY);
        if (!raw) {
          this.save(DEFAULT_STATE, false);
        } else {
          const parsed = JSON.parse(raw);
          if (!parsed.version || parsed.version < DEFAULT_STATE.version) {
            this.save(DEFAULT_STATE, false);
          } else {
            this._memoryCache = parsed;
          }
        }
      } catch (e) {
        this._memoryCache = JSON.parse(JSON.stringify(DEFAULT_STATE));
      }
    }

    getState() {
      const storage = getStorage();
      if (storage) {
        try {
          const raw = storage.getItem(STORAGE_KEY);
          if (raw) {
            this._memoryCache = JSON.parse(raw);
            return this._memoryCache;
          }
        } catch (e) {
          // fallback
        }
      }
      if (!this._memoryCache) {
        this._memoryCache = JSON.parse(JSON.stringify(DEFAULT_STATE));
      }
      return this._memoryCache;
    }

    save(data, notify = true) {
      data.lastUpdated = Date.now();
      this._memoryCache = data;
      const storage = getStorage();
      if (storage) {
        try {
          storage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
          console.warn('LocalStorage write failed:', e);
        }
      }
      if (notify) {
        this.emit('local', data);
      }
      return data;
    }

    setupStorageListener() {
      if (typeof window !== 'undefined') {
        window.addEventListener('storage', (e) => {
          if (e.key === STORAGE_KEY && e.newValue) {
            try {
              const fresh = JSON.parse(e.newValue);
              this._memoryCache = fresh;
              this.emit('storage', fresh);
            } catch (err) {
              console.error('Failed to parse storage update', err);
            }
          }
        });
      }
    }

    emit(source, data) {
      this.listeners.forEach(fn => {
        try {
          fn(data, source);
        } catch (err) {
          console.error('Error in TCStore listener:', err);
        }
      });
    }

    subscribe(fn) {
      if (typeof fn === 'function') {
        this.listeners.push(fn);
      }
      return () => {
        this.listeners = this.listeners.filter(l => l !== fn);
      };
    }

    // Reservation actions
    addReservation(res) {
      const state = this.getState();
      const id = res.id || ('128' + Math.floor(100000 + Math.random() * 900000));
      const refNo = res.refNo || ('1675' + Math.floor(100000000000 + Math.random() * 900000000000));
      const now = getNowStr();
      const amount = parseFloat(res.amount) || 0;
      const commission = res.commission !== undefined ? res.commission : Math.round(amount * 0.05);

      const curUser = (state.auth && state.auth.currentUser) ? state.auth.currentUser : (state.user || {});
      const newBooking = {
        id: String(id),
        refNo: String(refNo),
        userId: res.userId || curUser.id || state.user.id || 'TC-849204',
        guest: res.guest || curUser.name || state.user.name,
        email: res.email || curUser.email || state.user.email,
        phone: res.phone || curUser.phone || state.user.phone,
        agent: res.agent || 'User Direct (Portal)',
        serviceName: res.serviceName || 'ThailandCONNEX Service',
        property: res.property || 'Partner Provider',
        checkin: res.checkin || '2026-11-20',
        checkout: res.checkout || '2026-11-21',
        bookedOn: res.bookedOn || now,
        amount: amount,
        commission: commission,
        status: res.status || 'Confirmed',
        notes: res.notes || `จองออนไลน์ผ่าน ThailandCONNEX Platform (Earned ${(amount * 0.05).toFixed(1)} TCP)`
      };

      state.reservations.unshift(newBooking);

      // Earn tokens (5% of booking value as TCP)
      const earnedPoints = Math.round(amount * 0.05 * 100) / 100;
      if (earnedPoints > 0) {
        state.user.tokenBalance = Math.round((state.user.tokenBalance + earnedPoints) * 100) / 100;
        if (state.auth && state.auth.currentUser) state.auth.currentUser.tokenBalance = state.user.tokenBalance;
        this.syncUserBalanceToRegistered(state.user);
        state.tokenLogs.unshift({
          time: now,
          action: 'Token Minting',
          actionCode: '+',
          detail: `Earned from booking #${newBooking.id} (${newBooking.property})`,
          amount: earnedPoints,
          balance: state.user.tokenBalance,
          txHash: generateHash(),
          block: generateBlock(),
          status: 'Confirmed'
        });
      }

      this.save(state);
      return newBooking;
    }

    updateReservationStatus(id, newStatus) {
      const state = this.getState();
      const cleanId = String(id).replace('BK-', '');
      const res = state.reservations.find(r => String(r.id).replace('BK-', '') === cleanId);
      if (res) {
        res.status = newStatus;
        this.save(state);
        return res;
      }
      return null;
    }

    // Voucher & Coupon actions
    redeemVoucher(voucherId) {
      const state = this.getState();
      const v = state.vouchers.find(x => x.id === voucherId);
      if (!v) return { success: false, message: 'ไม่พบรหัส Voucher' };

      if (state.user.tokenBalance < v.points) {
        return { success: false, message: 'คะแนน TCP ไม่เพียงพอสำหรับการแลก' };
      }

      state.user.tokenBalance = Math.round((state.user.tokenBalance - v.points) * 100) / 100;
      if (v.remaining > 0) v.remaining -= 1;

      const randomBarcode = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('').replace(/(\d{4})/g, '$1 ').trim();
      const newCoupon = {
        id: 'CPN-' + (1000 + state.myCoupons.length + 1),
        name: v.name,
        detail: v.desc,
        expDate: v.validUntil,
        barcode: randomBarcode,
        status: 'active',
        image: v.image
      };
      state.myCoupons.unshift(newCoupon);

      // Token Burning on blockchain
      state.tokenLogs.unshift({
        time: getNowStr(),
        action: 'Token Burning',
        actionCode: '-',
        detail: `Redeemed for voucher: ${v.name.substring(0, 32)}...`,
        amount: -v.points,
        balance: state.user.tokenBalance,
        txHash: generateHash(),
        block: generateBlock(),
        status: 'Confirmed'
      });

      this.save(state);
      return { success: true, coupon: newCoupon, balance: state.user.tokenBalance };
    }

    useCoupon(couponId) {
      const state = this.getState();
      const c = state.myCoupons.find(x => x.id === couponId);
      if (c) {
        c.status = 'used';
        this.save(state);
        return { success: true, coupon: c };
      }
      return { success: false };
    }

    // Token Transfer
    transferTokens(target, amount) {
      const state = this.getState();
      amount = parseFloat(amount);
      if (isNaN(amount) || amount <= 0) return { success: false, message: 'ระบุจำนวนที่ถูกต้อง' };
      if (state.user.tokenBalance < amount) return { success: false, message: 'ยอดคงเหลือไม่เพียงพอ' };

      state.user.tokenBalance = Math.round((state.user.tokenBalance - amount) * 100) / 100;
      state.tokenLogs.unshift({
        time: getNowStr(),
        action: 'Transfer Out',
        actionCode: 'T',
        detail: `โอนคะแนนให้ ${target}`,
        amount: -amount,
        balance: state.user.tokenBalance,
        txHash: generateHash(),
        block: generateBlock(),
        status: 'Confirmed'
      });

      this.save(state);
      return { success: true, balance: state.user.tokenBalance };
    }

        // Authentication & User Management (V4)
    loginUser(emailOrId, password) {
      const state = this.getState();
      const users = (state.auth && state.auth.registeredUsers) ? state.auth.registeredUsers : [];
      const q = String(emailOrId).trim().toLowerCase();
      
      const found = users.find(u => 
        (u.email && u.email.toLowerCase() === q) || 
        (u.id && u.id.toLowerCase() === q) || 
        (u.name && u.name.toLowerCase().includes(q))
      );

      if (!found) {
        return { success: false, message: 'ไม่พบบัญชีผู้ใช้งานนี้ในระบบ กรุณาตรวจสอบอีเมลหรือรหัสสมาชิก' };
      }

      if (found.status === 'Disabled' || found.status === 'Blocked') {
        return { success: false, message: 'บัญชีนี้ถูกปิดกั้นการเข้าถึงชั่วคราวโดยผู้ดูแลระบบ' };
      }

      // Validate password if provided (master demo pass: password123 or 123456)
      const userPass = found.password || 'password123';
      if (password && password !== userPass && password !== 'password123' && password !== '123456') {
        return { success: false, message: 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง' };
      }

      const activeUser = { ...found, isLoggedIn: true };
      if (!state.auth) state.auth = {};
      state.auth.currentUser = activeUser;
      state.user = activeUser;

      this.save(state);
      return { success: true, user: activeUser };
    }

    logoutUser() {
      const state = this.getState();
      const guest = {
        isLoggedIn: false,
        name: 'ผู้เยี่ยมชม (Guest)',
        id: 'TC-GUEST',
        email: '',
        phone: '',
        walletAddress: '',
        tokenBalance: 0,
        avatar: '👤',
        tier: 'Guest'
      };
      if (!state.auth) state.auth = {};
      state.auth.currentUser = guest;
      state.user = guest;

      this.save(state);
      return { success: true };
    }

    registerUser(info) {
      const state = this.getState();
      if (!state.auth) state.auth = { registeredUsers: [], adminAccounts: [] };
      if (!state.auth.registeredUsers) state.auth.registeredUsers = [];

      const name = (info.name || 'ผู้ใช้งานใหม่').trim();
      const email = (info.email || 'user@example.com').trim();
      const phone = (info.phone || '080-000-0000').trim();

      // Check if email already exists
      const existing = state.auth.registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return { success: false, message: 'อีเมลนี้มีผู้ลงทะเบียนใช้งานในระบบแล้ว' };
      }

      const newId = 'TC-' + Math.floor(100000 + Math.random() * 900000);
      const hex = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const wallet = '0x' + hex;
      const initialBonus = 500.00;

      // Extract initials for avatar
      let initials = 'TC';
      const parts = name.split(' ');
      if (parts.length >= 2 && parts[0] && parts[1]) {
        initials = (parts[0][0] + parts[1][0]).toUpperCase();
      } else if (name.length >= 2) {
        initials = name.slice(0, 2).toUpperCase();
      }

      const newUser = {
        id: newId,
        name: name,
        email: email,
        phone: phone,
        password: info.password || 'password123',
        walletAddress: wallet,
        tokenBalance: initialBonus,
        avatar: initials,
        tier: 'Silver Explorer (Welcome Bonus)',
        status: 'Active',
        registeredDate: getNowStr().split(' ')[0],
        isLoggedIn: true
      };

      state.auth.registeredUsers.unshift(newUser);

      // Welcome bonus minting on blockchain
      state.tokenLogs.unshift({
        time: getNowStr(),
        action: 'Token Minting',
        actionCode: '+',
        detail: `🎉 Welcome Bonus 500 TCP สมัครสมาชิกใหม่ (${newUser.name})`,
        amount: initialBonus,
        balance: initialBonus,
        txHash: generateHash(),
        block: generateBlock(),
        status: 'Confirmed'
      });

      state.auth.currentUser = newUser;
      state.user = newUser;

      this.save(state);
      return { success: true, user: newUser };
    }

    loginAdmin(emailOrRole) {
      const state = this.getState();
      if (!state.auth) state.auth = {};
      const admins = state.auth.adminAccounts || [];
      const q = String(emailOrRole).trim().toLowerCase();

      const found = admins.find(a => 
        (a.email && a.email.toLowerCase() === q) || 
        (a.role && a.role.toLowerCase().includes(q)) ||
        (a.name && a.name.toLowerCase().includes(q))
      );

      if (!found) {
        return { success: false, message: 'ไม่พบบัญชีผู้ดูแลระบบนี้' };
      }

      state.auth.currentAdmin = { ...found, isLoggedIn: true };
      this.save(state);
      return { success: true, admin: state.auth.currentAdmin };
    }

    logoutAdmin() {
      const state = this.getState();
      if (state.auth && state.auth.currentAdmin) {
        state.auth.currentAdmin.isLoggedIn = false;
        this.save(state);
      }
      return { success: true };
    }

    syncUserBalanceToRegistered(user) {
      const state = this.getState();
      if (state.auth && state.auth.registeredUsers && user && user.id) {
        const u = state.auth.registeredUsers.find(x => x.id === user.id);
        if (u) {
          u.tokenBalance = user.tokenBalance;
        }
      }
    }

    // Reset Defaults
    getServiceById(id) {
      const state = this.getState();
      return (state.services || []).find(s => s.id === id) || null;
    }

    resetDefaults() {
      const fresh = JSON.parse(JSON.stringify(DEFAULT_STATE));
      this.save(fresh);
      return fresh;
    }
  }

  return new Store();
});
