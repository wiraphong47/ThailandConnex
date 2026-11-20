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

  const STORAGE_KEY = 'TC_DATA_STORE_V9';

  const DEFAULT_STATE = {
    version: 9,
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
        roleCode: 'SUPER_ADMIN',
        org: 'depa Central Hub',
        avatar: '👨‍💼',
        badge: 'Super Admin',
        scope: 'national'
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
        },
        {
          id: 'TC-718293',
          name: 'ธนภัทร สุวรรณภูมิ',
          email: 'thanapat.s@outlook.com',
          password: 'password123',
          phone: '085-112-9900',
          walletAddress: '0x88F1B3cA1099bE5A33D72091eE2b014F9B3aC711',
          tokenBalance: 28900.00,
          avatar: 'TS',
          tier: 'VIP Platinum Traveler',
          status: 'Active',
          registeredDate: '2023-01-20'
        },
        {
          id: 'TC-829104',
          name: 'วรัญญา รัตนากุล',
          email: 'waranya.r@gmail.com',
          password: 'password123',
          phone: '086-455-7812',
          walletAddress: '0x22Da4901Fec8A69931bC2038749aB3410f9921E9',
          tokenBalance: 9400.00,
          avatar: 'WR',
          tier: 'Gold Traveler',
          status: 'Active',
          registeredDate: '2023-01-28'
        },
        {
          id: 'TC-904128',
          name: 'Johnathan Davis',
          email: 'j.davis@globaltravel.com',
          password: 'password123',
          phone: '+1-415-555-0199',
          walletAddress: '0x6198F0D3a72BbE20199fA5104E90B0F3aC789012',
          tokenBalance: 15200.00,
          avatar: 'JD',
          tier: 'VIP International',
          status: 'Active',
          registeredDate: '2023-02-02'
        },
        {
          id: 'TC-194820',
          name: 'Lin Wei (林伟)',
          email: 'lin.wei@ctrip-partner.cn',
          password: 'password123',
          phone: '+86-138-0013-8000',
          walletAddress: '0x448aB091fCe89A1209B039aB271F8890A9811C90',
          tokenBalance: 8600.00,
          avatar: 'LW',
          tier: 'Inbound Traveler',
          status: 'Active',
          registeredDate: '2023-02-03'
        },
        {
          id: 'TC-302918',
          name: 'กิตติพงษ์ เกียรติสกุล',
          email: 'kittipong.k@thai-tourist.or.th',
          password: 'password123',
          phone: '081-332-9011',
          walletAddress: '0x992B16c3182b8F6aF4f98Da3f9468F635d87bB62',
          tokenBalance: 1500.00,
          avatar: 'KK',
          tier: 'Explorer',
          status: 'Active',
          registeredDate: '2023-02-04'
        },
        {
          id: 'TC-483920',
          name: 'ชลิตา ว่องไว',
          email: 'chalita.w@hotmail.com',
          password: 'password123',
          phone: '089-771-2299',
          walletAddress: '0x772Bca90192eA988B310f882190BbA901F099201',
          tokenBalance: 6700.00,
          avatar: 'CW',
          tier: 'Silver Explorer',
          status: 'Active',
          registeredDate: '2023-02-05'
        },
        {
          id: 'TC-592019',
          name: 'David Miller',
          email: 'david.miller@bkk-expat.com',
          password: 'password123',
          phone: '082-901-4433',
          walletAddress: '0x103BaF89201e89bF41029cBA789120BbF0923145',
          tokenBalance: 11300.00,
          avatar: 'DM',
          tier: 'Gold Traveler',
          status: 'Active',
          registeredDate: '2023-02-06'
        },
        {
          id: 'TC-694012',
          name: 'นภัสสร สันติสุข',
          email: 'naphatsorn.s@gmail.com',
          password: 'password123',
          phone: '084-221-8899',
          walletAddress: '0x33B109a887bF1209e89b01289124Bc9908FcaB12',
          tokenBalance: 500.00,
          avatar: 'NS',
          tier: 'New Member (Bonus)',
          status: 'Active',
          registeredDate: '2023-02-07'
        }
      ],
      adminAccounts: [
        {
          email: 'thapakorn.s@depa.or.th',
          name: 'ฐาปกรณ์ สันติชาติศักดิ์ (depa)',
          role: 'Super Administrator',
          roleCode: 'SUPER_ADMIN',
          org: 'depa Central Hub',
          avatar: '👨‍💼',
          badge: 'Super Admin',
          scope: 'national'
        },
        {
          email: 'boonyarit.r@travizgo.com',
          name: 'บุญญฤทธิ์ ฤทธิ์เดช',
          role: 'Platform Operations Admin',
          roleCode: 'OPS_ADMIN',
          org: 'TRAVIZGO Platform',
          avatar: '👨‍💻',
          badge: 'Operations',
          scope: 'operational'
        },
        {
          email: 'somchai@phuket-tour.co.th',
          name: 'สมชาย ท่องเที่ยว (Hotel Partner)',
          role: 'Merchant / Hotel Manager',
          roleCode: 'PARTNER',
          org: 'Phuket Tour & Partner Hub',
          avatar: '🏨',
          badge: 'Hotel Partner',
          scope: 'partner',
          partnerKey: 'phuket'
        },
        {
          email: 'auditor@tat.or.th',
          name: 'ผู้ตรวจสอบ ททท. (TAT Auditor)',
          role: 'TAT Tourism Data Auditor',
          roleCode: 'AUDITOR',
          org: 'Tourism Authority of Thailand',
          avatar: '🏛️',
          badge: 'TAT Auditor',
          scope: 'auditor'
        }
      ]
    },
    services: (typeof DEPA_REAL_DATA !== 'undefined' && DEPA_REAL_DATA.allServices && DEPA_REAL_DATA.allServices.length > 0)
      ? DEPA_REAL_DATA.allServices
      : ((typeof DEPA_REAL_DATA !== 'undefined' && DEPA_REAL_DATA.featuredServices && DEPA_REAL_DATA.featuredServices.length > 0)
        ? DEPA_REAL_DATA.featuredServices
        : [
      {
            "id": "SRV-01",
            "category": "accommodation",
            "categoryName": "โรงแรมและที่พัก",
            "title": "DNA Resort & Spa - Deluxe With Breakfast",
            "provider": "DNA Resort & Spa",
            "location": "ปากช่อง, นครราชสีมา",
            "rating": "4.7 ★",
            "features": [
                  "SHA Plus",
                  "WiFi ฟรี",
                  "ที่จอดรถ",
                  "ใกล้แหล่งท่องเที่ยว"
            ],
            "price": 3994.27,
            "unit": "คืน",
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
            "allotment": 28
      },
      {
            "id": "SRV-02",
            "category": "accommodation",
            "categoryName": "โรงแรมและที่พัก",
            "title": "เรืองศรีศิริ เกสท์เฮาส์ - Duplex Villa With Breakfast",
            "provider": "เรืองศรีศิริ เกสท์เฮาส์",
            "location": "เมืองสุโขทัย, สุโขทัย",
            "rating": "4.7 ★",
            "features": [
                  "SHA Plus",
                  "WiFi ฟรี",
                  "ที่จอดรถ",
                  "ใกล้แหล่งท่องเที่ยว"
            ],
            "price": 6595.79,
            "unit": "คืน",
            "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80",
            "allotment": 11
      },
      {
            "id": "SRV-03",
            "category": "accommodation",
            "categoryName": "โรงแรมและที่พัก",
            "title": "Tt Resident - Deluxe Studio",
            "provider": "Tt Resident",
            "location": "เขตบางนา, กรุงเทพมหานคร",
            "rating": "4.9 ★",
            "features": [
                  "SHA Plus",
                  "WiFi ฟรี",
                  "ที่จอดรถ",
                  "ใกล้แหล่งท่องเที่ยว"
            ],
            "price": 825.29,
            "unit": "คืน",
            "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80",
            "allotment": 8
      },
      {
            "id": "SRV-04",
            "category": "accommodation",
            "categoryName": "โรงแรมและที่พัก",
            "title": "เดอะ เฮเว่น กระบี่ (SHA Extra Plus) - Standard Room",
            "provider": "เดอะ เฮเว่น กระบี่ (SHA Extra Plus)",
            "location": "เมืองกระบี่, กระบี่",
            "rating": "4.9 ★",
            "features": [
                  "SHA Plus",
                  "WiFi ฟรี",
                  "ที่จอดรถ",
                  "ใกล้แหล่งท่องเที่ยว"
            ],
            "price": 3500.0,
            "unit": "คืน",
            "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
            "allotment": 16
      },
      {
            "id": "SRV-05",
            "category": "accommodation",
            "categoryName": "โรงแรมและที่พัก",
            "title": "เดอะ สตาร์ฮิล คอนโด เชียงใหม่ - Standard Room With Breakfast",
            "provider": "เดอะ สตาร์ฮิล คอนโด เชียงใหม่",
            "location": "เมืองเชียงใหม่, เชียงใหม่",
            "rating": "4.8 ★",
            "features": [
                  "SHA Plus",
                  "WiFi ฟรี",
                  "ที่จอดรถ",
                  "ใกล้แหล่งท่องเที่ยว"
            ],
            "price": 4000.0,
            "unit": "คืน",
            "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&auto=format&fit=crop&q=80",
            "allotment": 15
      },
      {
            "id": "SRV-06",
            "category": "tour",
            "categoryName": "แพ็กเกจทัวร์ & มัคคุเทศก์",
            "title": "Dave Malhotra - Half Day (4-5 hrs. with out meal)",
            "provider": "Dave Malhotra",
            "location": "Klong toei, Bangkok",
            "rating": "4.7 ★",
            "features": [
                  "รวมไกด์มืออาชีพ",
                  "รวมอาหาร/เครื่องดื่ม",
                  "ประกันอุบัติเหตุ"
            ],
            "price": 1200,
            "unit": "ท่าน",
            "image": "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80",
            "allotment": 45
      },
      {
            "id": "SRV-07",
            "category": "tour",
            "categoryName": "แพ็กเกจทัวร์ & มัคคุเทศก์",
            "title": "Dave Malhotra - Full Day",
            "provider": "Dave Malhotra",
            "location": "Klong toei, Bangkok",
            "rating": "4.8 ★",
            "features": [
                  "รวมไกด์มืออาชีพ",
                  "รวมอาหาร/เครื่องดื่ม",
                  "ประกันอุบัติเหตุ"
            ],
            "price": 1800,
            "unit": "ท่าน",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
            "allotment": 20
      },
      {
            "id": "SRV-08",
            "category": "tour",
            "categoryName": "แพ็กเกจทัวร์ & มัคคุเทศก์",
            "title": "Dave Malhotra - Overnight (Rate per day)",
            "provider": "Dave Malhotra",
            "location": "Klong toei, Bangkok",
            "rating": "4.7 ★",
            "features": [
                  "รวมไกด์มืออาชีพ",
                  "รวมอาหาร/เครื่องดื่ม",
                  "ประกันอุบัติเหตุ"
            ],
            "price": 2000,
            "unit": "ท่าน",
            "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80",
            "allotment": 22
      },
      {
            "id": "SRV-09",
            "category": "tour",
            "categoryName": "แพ็กเกจทัวร์ & มัคคุเทศก์",
            "title": "Dave Malhotra - MICE (Rate per day)",
            "provider": "Dave Malhotra",
            "location": "Klong toei, Bangkok",
            "rating": "4.9 ★",
            "features": [
                  "รวมไกด์มืออาชีพ",
                  "รวมอาหาร/เครื่องดื่ม",
                  "ประกันอุบัติเหตุ"
            ],
            "price": 4000,
            "unit": "ท่าน",
            "image": "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80",
            "allotment": 33
      },
      {
            "id": "SRV-10",
            "category": "attraction",
            "categoryName": "แหล่งท่องเที่ยวและบัตรเข้าชม",
            "title": "Bangkok Fight Lab - All Access Membership - one month",
            "provider": "Bangkok Fight Lab",
            "location": "Ratchthavee, Bangkok",
            "rating": "4.8 ★",
            "features": [
                  "Fast Track",
                  "e-Ticket ทันที",
                  "เข้าชมได้ทุกโซน"
            ],
            "price": 6200,
            "unit": "ท่าน",
            "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
            "allotment": 47
      },
      {
            "id": "SRV-11",
            "category": "attraction",
            "categoryName": "แหล่งท่องเที่ยวและบัตรเข้าชม",
            "title": "Bangkok Fight Lab - All Access Membership - 6 months",
            "provider": "Bangkok Fight Lab",
            "location": "Ratchthavee, Bangkok",
            "rating": "4.7 ★",
            "features": [
                  "Fast Track",
                  "e-Ticket ทันที",
                  "เข้าชมได้ทุกโซน"
            ],
            "price": 36000,
            "unit": "ท่าน",
            "image": "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop&q=80",
            "allotment": 42
      },
      {
            "id": "SRV-12",
            "category": "attraction",
            "categoryName": "แหล่งท่องเที่ยวและบัตรเข้าชม",
            "title": "Bangkok Fight Lab - All Access Membership - one year",
            "provider": "Bangkok Fight Lab",
            "location": "Ratchthavee, Bangkok",
            "rating": "4.9 ★",
            "features": [
                  "Fast Track",
                  "e-Ticket ทันที",
                  "เข้าชมได้ทุกโซน"
            ],
            "price": 67000,
            "unit": "ท่าน",
            "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=80",
            "allotment": 41
      },
      {
            "id": "SRV-13",
            "category": "attraction",
            "categoryName": "แหล่งท่องเที่ยวและบัตรเข้าชม",
            "title": "Bangkok Fight Lab - Hardcore Grappling - one month",
            "provider": "Bangkok Fight Lab",
            "location": "Ratchthavee, Bangkok",
            "rating": "4.7 ★",
            "features": [
                  "Fast Track",
                  "e-Ticket ทันที",
                  "เข้าชมได้ทุกโซน"
            ],
            "price": 4400,
            "unit": "ท่าน",
            "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
            "allotment": 38
      },
      {
            "id": "SRV-14",
            "category": "wellness",
            "categoryName": "สุขภาพและสปา",
            "title": "7 Spa Luxury - Signature Aromatherapy Massage",
            "provider": "7 Spa Luxury",
            "location": "บางละมุง, ชลบุรี",
            "rating": "4.8 ★",
            "features": [
                  "ผู้เชี่ยวชาญ",
                  "ผลิตภัณฑ์ธรรมชาติ",
                  "ห้องส่วนตัว"
            ],
            "price": 1450,
            "unit": "แพ็กเกจ",
            "image": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=80",
            "allotment": 48
      },
      {
            "id": "SRV-15",
            "category": "wellness",
            "categoryName": "สุขภาพและสปา",
            "title": "7 Spa Luxury - Diamond Infusion Facial",
            "provider": "7 Spa Luxury",
            "location": "บางละมุง, ชลบุรี",
            "rating": "4.9 ★",
            "features": [
                  "ผู้เชี่ยวชาญ",
                  "ผลิตภัณฑ์ธรรมชาติ",
                  "ห้องส่วนตัว"
            ],
            "price": 1300,
            "unit": "แพ็กเกจ",
            "image": "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&auto=format&fit=crop&q=80",
            "allotment": 39
      },
      {
            "id": "SRV-16",
            "category": "wellness",
            "categoryName": "สุขภาพและสปา",
            "title": "7 Spa Luxury - Champagne and Roses Couple's Retreat",
            "provider": "7 Spa Luxury",
            "location": "บางละมุง, ชลบุรี",
            "rating": "4.7 ★",
            "features": [
                  "ผู้เชี่ยวชาญ",
                  "ผลิตภัณฑ์ธรรมชาติ",
                  "ห้องส่วนตัว"
            ],
            "price": 1250,
            "unit": "แพ็กเกจ",
            "image": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80",
            "allotment": 26
      },
      {
            "id": "SRV-17",
            "category": "wellness",
            "categoryName": "สุขภาพและสปา",
            "title": "7 Spa Luxury - 24K Gold Body Wrap",
            "provider": "7 Spa Luxury",
            "location": "บางละมุง, ชลบุรี",
            "rating": "4.7 ★",
            "features": [
                  "ผู้เชี่ยวชาญ",
                  "ผลิตภัณฑ์ธรรมชาติ",
                  "ห้องส่วนตัว"
            ],
            "price": 1100,
            "unit": "แพ็กเกจ",
            "image": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=80",
            "allotment": 6
      },
      {
            "id": "SRV-18",
            "category": "mobility",
            "categoryName": "ยานพาหนะและรถรับส่ง",
            "title": "Limousine Express - Benz S-Class",
            "provider": "Limousine Express",
            "location": "Muang, Bangkok",
            "rating": "4.8 ★",
            "features": [
                  "รับ-ส่งตรงเวลา",
                  "คนขับมืออาชีพ",
                  "ประกันภัยผู้โดยสาร"
            ],
            "price": 5200,
            "unit": "คัน",
            "image": "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&auto=format&fit=crop&q=80",
            "allotment": 47
      },
      {
            "id": "SRV-19",
            "category": "mobility",
            "categoryName": "ยานพาหนะและรถรับส่ง",
            "title": "Limousine Express - BMW Series 7",
            "provider": "Limousine Express",
            "location": "Muang, Bangkok",
            "rating": "4.8 ★",
            "features": [
                  "รับ-ส่งตรงเวลา",
                  "คนขับมืออาชีพ",
                  "ประกันภัยผู้โดยสาร"
            ],
            "price": 5200,
            "unit": "คัน",
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "allotment": 35
      },
      {
            "id": "SRV-20",
            "category": "mobility",
            "categoryName": "ยานพาหนะและรถรับส่ง",
            "title": "Limousine Express - Benz E-Class",
            "provider": "Limousine Express",
            "location": "Muang, Bangkok",
            "rating": "4.8 ★",
            "features": [
                  "รับ-ส่งตรงเวลา",
                  "คนขับมืออาชีพ",
                  "ประกันภัยผู้โดยสาร"
            ],
            "price": 1950,
            "unit": "คัน",
            "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
            "allotment": 40
      },
      {
            "id": "SRV-21",
            "category": "food",
            "categoryName": "ร้านอาหารและเครื่องดื่ม",
            "title": "คาเฟ่ดำเนินสะดวก - โกโก้",
            "provider": "คาเฟ่ดำเนินสะดวก",
            "location": "Muang, Amnat Charoen",
            "rating": "4.9 ★",
            "features": [
                  "วัตถุดิบพรีเมียม",
                  "อาหารปรุงสด",
                  "วิวสวย"
            ],
            "price": 45,
            "unit": "เซ็ต",
            "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
            "allotment": 8
      },
      {
            "id": "SRV-22",
            "category": "food",
            "categoryName": "ร้านอาหารและเครื่องดื่ม",
            "title": "คาเฟ่ดำเนินสะดวก - ชานม",
            "provider": "คาเฟ่ดำเนินสะดวก",
            "location": "Muang, Amnat Charoen",
            "rating": "4.9 ★",
            "features": [
                  "วัตถุดิบพรีเมียม",
                  "อาหารปรุงสด",
                  "วิวสวย"
            ],
            "price": 45,
            "unit": "เซ็ต",
            "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
            "allotment": 40
      },
      {
            "id": "SRV-23",
            "category": "food",
            "categoryName": "ร้านอาหารและเครื่องดื่ม",
            "title": "คาเฟ่ดำเนินสะดวก - ชาเขียว",
            "provider": "คาเฟ่ดำเนินสะดวก",
            "location": "Muang, Amnat Charoen",
            "rating": "4.8 ★",
            "features": [
                  "วัตถุดิบพรีเมียม",
                  "อาหารปรุงสด",
                  "วิวสวย"
            ],
            "price": 45,
            "unit": "เซ็ต",
            "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
            "allotment": 23
      },
      {
            "id": "SRV-24",
            "category": "community",
            "categoryName": "ชุมชนท่องเที่ยว",
            "title": "ชุมชนท่องเที่ยวบ้านสันป่าเหียง จ.เชียงราย - Package Art therapy 1 Day trip",
            "provider": "ชุมชนท่องเที่ยวบ้านสันป่าเหียง จ.เชียงราย",
            "location": "กรุงเทพมหานคร",
            "rating": "4.9 ★",
            "features": [
                  "วิถีชุมชนแท้",
                  "Workshop ทำมือ",
                  "สนับสนุนชุมชน"
            ],
            "price": 1380,
            "unit": "ท่าน",
            "image": "https://images.unsplash.com/photo-1609137144822-263c9b7447c2?w=800&auto=format&fit=crop&q=80",
            "allotment": 9
      },
      {
            "id": "SRV-25",
            "category": "community",
            "categoryName": "ชุมชนท่องเที่ยว",
            "title": "ชุมชนท่องเที่ยวบ้านสันป่าเหียง จ.เชียงราย (Package Art therapy & Communitites Activities 1 Day trip)",
            "provider": "ชุมชนท่องเที่ยวบ้านสันป่าเหียง จ.เชียงราย",
            "location": "กรุงเทพมหานคร",
            "rating": "4.7 ★",
            "features": [
                  "วิถีชุมชนแท้",
                  "Workshop ทำมือ",
                  "สนับสนุนชุมชน"
            ],
            "price": 2380,
            "unit": "ท่าน",
            "image": "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop&q=80",
            "allotment": 37
      },
      {
            "id": "SRV-26",
            "category": "community",
            "categoryName": "ชุมชนท่องเที่ยว",
            "title": "ชุมชนท่องเที่ยวบ้านสันป่าเหียง จ.เชียงราย (Package Art therapy & Communitites Activities 2 Day 1 Night)",
            "provider": "ชุมชนท่องเที่ยวบ้านสันป่าเหียง จ.เชียงราย",
            "location": "กรุงเทพมหานคร",
            "rating": "4.8 ★",
            "features": [
                  "วิถีชุมชนแท้",
                  "Workshop ทำมือ",
                  "สนับสนุนชุมชน"
            ],
            "price": 3420,
            "unit": "ท่าน",
            "image": "https://images.unsplash.com/photo-1609137144822-263c9b7447c2?w=800&auto=format&fit=crop&q=80",
            "allotment": 46
      },
      {
            "id": "SRV-27",
            "category": "retail",
            "categoryName": "ร้านค้าปลีกและของที่ระลึก",
            "title": "Ananya Koh Chang coconut oil - น้ำมันมะพร้าวสกัดเย็น 100 มล.",
            "provider": "Ananya Koh Chang coconut oil",
            "location": "Muang, 56/4 ม.2 ต.เกาะช้างใต้, Amphoe Ko Chang, Thailand, Trat",
            "rating": "4.9 ★",
            "features": [
                  "OTOP 5 ดาว",
                  "ของแท้ 100%",
                  "จัดส่งปลอดภัย"
            ],
            "price": 100,
            "unit": "ชิ้น",
            "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80",
            "allotment": 47
      },
      {
            "id": "SRV-28",
            "category": "retail",
            "categoryName": "ร้านค้าปลีกและของที่ระลึก",
            "title": "Ananya Koh Chang coconut oil - น้ำมันมะพร้าวสกัดเย็น 200 มล.",
            "provider": "Ananya Koh Chang coconut oil",
            "location": "Muang, 56/4 ม.2 ต.เกาะช้างใต้, Amphoe Ko Chang, Thailand, Trat",
            "rating": "4.9 ★",
            "features": [
                  "OTOP 5 ดาว",
                  "ของแท้ 100%",
                  "จัดส่งปลอดภัย"
            ],
            "price": 180,
            "unit": "ชิ้น",
            "image": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80",
            "allotment": 11
      },
      {
            "id": "SRV-29",
            "category": "retail",
            "categoryName": "ร้านค้าปลีกและของที่ระลึก",
            "title": "Ananya Koh Chang coconut oil - น้ำมันมะพร้าวสกัดเย็น 500 มล.",
            "provider": "Ananya Koh Chang coconut oil",
            "location": "Muang, 56/4 ม.2 ต.เกาะช้างใต้, Amphoe Ko Chang, Thailand, Trat",
            "rating": "4.8 ★",
            "features": [
                  "OTOP 5 ดาว",
                  "ของแท้ 100%",
                  "จัดส่งปลอดภัย"
            ],
            "price": 330,
            "unit": "ชิ้น",
            "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80",
            "allotment": 15
      }
    ]),
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
        checkin: '2026-11-22',
        checkout: '2026-11-22',
        bookedOn: '2026-11-20 10:15:00',
        amount: 430,
        commission: 22,
        status: 'Confirmed',
        paymentMethod: 'SabuyPay Wallet',
        paymentStatus: 'Paid',
        invoiceNo: 'INV-2026-128669226',
        invoiceDate: '2026-11-20',
        transferDate: '2026-11-21',
        bankAccountNo: 'KBank •••-•-8824-1',
        notes: 'จองผ่านระบบ ThailandCONNEX Portal (ได้รับ 21.50 TCN)'
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
        bookedOn: '2026-11-19 14:20:00',
        amount: 8500,
        commission: 425,
        status: 'Confirmed',
        paymentMethod: 'PromptPay QR',
        paymentStatus: 'Paid',
        invoiceNo: 'INV-2026-955397221',
        invoiceDate: '2026-11-19',
        transferDate: '2026-11-20',
        bankAccountNo: 'SCB •••-•-4190-5',
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
        paymentMethod: 'Credit / Debit Card',
        paymentStatus: 'Paid',
        invoiceNo: 'INV-2026-436181225',
        invoiceDate: '2026-11-16',
        transferDate: '2026-11-17',
        bankAccountNo: 'BBL •••-•-7302-9',
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
        paymentMethod: 'Bank Transfer (B2B)',
        paymentStatus: 'Paid',
        invoiceNo: 'INV-2026-801188222',
        invoiceDate: '2026-11-15',
        transferDate: '2026-11-16',
        bankAccountNo: 'KBank •••-•-3910-4',
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
        paymentMethod: 'SabuyPay Wallet',
        paymentStatus: 'Paid',
        invoiceNo: 'INV-2026-215983224',
        invoiceDate: '2026-11-16',
        transferDate: '2026-11-17',
        bankAccountNo: 'SCB •••-•-9044-2',
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
        paymentMethod: 'Bank Transfer (B2B)',
        paymentStatus: 'Paid',
        invoiceNo: 'INV-2026-100101',
        invoiceDate: '2026-11-15',
        transferDate: '2026-11-16',
        bankAccountNo: 'KTB •••-•-5518-7',
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
        paymentMethod: 'Credit / Debit Card',
        paymentStatus: 'Refunded',
        invoiceNo: 'INV-2026-100102',
        invoiceDate: '2026-11-14',
        transferDate: '-',
        bankAccountNo: 'KTB •••-•-5518-7',
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
        paymentMethod: 'Pay at Property / Invoice',
        paymentStatus: 'Pending',
        invoiceNo: 'INV-2026-100103',
        invoiceDate: '2026-11-13',
        transferDate: '-',
        bankAccountNo: 'KTB •••-•-5518-7',
        notes: 'รอเอกสารยืนยันจากเอเจนต์และรอชำระเงิน'
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
        paymentMethod: 'PromptPay QR',
        paymentStatus: 'Paid',
        invoiceNo: 'INV-2026-100104',
        invoiceDate: '2026-11-12',
        transferDate: '2026-11-13',
        bankAccountNo: 'KTB •••-•-5518-7',
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
    ],
    directory: (typeof DEPA_REAL_DATA !== 'undefined' && DEPA_REAL_DATA.directory && DEPA_REAL_DATA.directory.length > 0)
      ? DEPA_REAL_DATA.directory
      : [],
    apiKeys: [
      {
        id: 'KEY-001',
        client: 'TVG Global OTA Service',
        org: 'TRAVIZGO Platform Co., Ltd.',
        environment: 'Production',
        keyPrefix: 'tk_live_9a71bf08d4...',
        fullKey: 'tk_live_9a71bf08d4924c5bb980d908271dfcc891',
        rateLimit: '10,000 req/min',
        whitelistedIps: '203.144.144.22, 203.144.144.23',
        status: 'Active',
        totalCalls: 489210,
        lastActive: '1 นาทีที่แล้ว',
        scope: 'read:packages,write:bookings,read:allotment'
      },
      {
        id: 'KEY-002',
        client: 'Gianttick Channel Distribution',
        org: 'Gianttick Technology Pte.',
        environment: 'Production',
        keyPrefix: 'tk_live_38bf8c99e1...',
        fullKey: 'tk_live_38bf8c99e19a4d8aa71f02847128669226',
        rateLimit: '5,000 req/min',
        whitelistedIps: '128.199.200.15',
        status: 'Active',
        totalCalls: 312450,
        lastActive: '3 นาทีที่แล้ว',
        scope: 'read:packages,read:inventory'
      },
      {
        id: 'KEY-003',
        client: 'Agoda Global Connectivity Gateway',
        org: 'Agoda Services Co., Ltd.',
        environment: 'Production',
        keyPrefix: 'tk_live_agoda_7721...',
        fullKey: 'tk_live_agoda_7721fd88910b429188210fe9921bc089',
        rateLimit: '15,000 req/min',
        whitelistedIps: '104.18.25.190, 104.18.26.190',
        status: 'Active',
        totalCalls: 284100,
        lastActive: '5 นาทีที่แล้ว',
        scope: 'read:packages,write:bookings,read:rates'
      },
      {
        id: 'KEY-004',
        client: 'Trip.com Group Partner Sync',
        org: 'Ctrip / Trip.com Travel Singapore',
        environment: 'Production',
        keyPrefix: 'tk_live_trip_5510...',
        fullKey: 'tk_live_trip_5510ae9910bf410291823901fbc0991a',
        rateLimit: '12,000 req/min',
        whitelistedIps: '47.91.120.48',
        status: 'Active',
        totalCalls: 198200,
        lastActive: '12 นาทีที่แล้ว',
        scope: 'read:packages,write:bookings'
      },
      {
        id: 'KEY-005',
        client: 'National Tourism Data Bank Open API',
        org: 'Digital Economy Promotion Agency (depa)',
        environment: 'Sandbox / Public B2B',
        keyPrefix: 'tk_sandbox_databank...',
        fullKey: 'tk_sandbox_databank_108k_201k_depa_gov_th',
        rateLimit: '25,000 req/min',
        whitelistedIps: 'Any (0.0.0.0/0)',
        status: 'Active',
        totalCalls: 154800,
        lastActive: '2 นาทีที่แล้ว',
        scope: 'read:suppliers_108k,read:packages_201k'
      },
      {
        id: 'KEY-006',
        client: 'Blockchain Webhook & Token Minting',
        org: 'ThailandCONNEX EVM Bridge Core',
        environment: 'Production',
        keyPrefix: 'tk_live_evm_bridge...',
        fullKey: 'tk_live_evm_bridge_99210bfca189201bc8901aef',
        rateLimit: 'Unlimited (Internal VPC)',
        whitelistedIps: '10.0.4.0/24 (VPC Peering)',
        status: 'Active',
        totalCalls: 44150,
        lastActive: 'สดทันที (Realtime)',
        scope: 'write:token_mint,write:token_burn,read:ledger'
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

    normalizeReservations(list) {
      if (!Array.isArray(list)) return false;
      const bankPool = ['KBank •••-•-8824-1', 'SCB •••-•-4190-5', 'BBL •••-•-7302-9', 'KTB •••-•-5518-7'];
      const methodPool = ['SabuyPay Wallet', 'PromptPay QR', 'Credit / Debit Card', 'Bank Transfer (B2B)'];
      let changed = false;
      list.forEach((r, idx) => {
        if (!r || typeof r !== 'object') return;
        const cleanId = String(r.id || (100100 + idx)).replace(/^BK-/i, '');
        const invDate = (r.bookedOn || '2026-11-20').slice(0, 10);
        if (!r.invoiceNo) {
          r.invoiceNo = `INV-${invDate.slice(0, 4)}-${cleanId}`;
          changed = true;
        }
        if (!r.invoiceDate) {
          r.invoiceDate = invDate;
          changed = true;
        }
        if (!r.paymentStatus) {
          r.paymentStatus = r.status === 'Cancelled' ? 'Refunded' : (r.status === 'PendingConfirm' || r.status === 'Pending' ? 'Pending' : 'Paid');
          changed = true;
        }
        if (!r.paymentMethod) {
          r.paymentMethod = r.paymentStatus === 'Pending' ? 'Pay at Property / Invoice' : methodPool[idx % methodPool.length];
          changed = true;
        }
        if (r.transferDate === undefined) {
          r.transferDate = r.paymentStatus === 'Paid' ? invDate : '-';
          changed = true;
        }
        if (!r.bankAccountNo) {
          r.bankAccountNo = bankPool[idx % bankPool.length];
          changed = true;
        }
      });
      return changed;
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
          if (!parsed.version || parsed.version < DEFAULT_STATE.version || !parsed.services || parsed.services.length < 50) {
            this.save(DEFAULT_STATE, false);
          } else {
            if (typeof DEPA_REAL_DATA !== 'undefined') {
              if (DEPA_REAL_DATA.allServices && (!parsed.services || parsed.services.length < 100)) {
                parsed.services = DEPA_REAL_DATA.allServices;
              }
              if (DEPA_REAL_DATA.directory && (!parsed.directory || parsed.directory.length < 100)) {
                parsed.directory = DEPA_REAL_DATA.directory;
              }
            }
            this.normalizeReservations(parsed.reservations);
            this._memoryCache = parsed;
            this.save(parsed, false);
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
            const parsed = JSON.parse(raw);
            if (this.normalizeReservations(parsed.reservations)) {
              try { storage.setItem(STORAGE_KEY, JSON.stringify(parsed)); } catch (e) {}
            }
            this._memoryCache = parsed;
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
      const cleanId = String(id).replace(/^BK-/i, '');
      const refNo = res.refNo || ('1675' + Math.floor(100000000000 + Math.random() * 900000000000));
      const now = getNowStr();
      const todayDate = now.slice(0, 10);
      const originalAmount = parseFloat(res.originalAmount !== undefined ? res.originalAmount : res.amount) || 0;
      const amount = parseFloat(res.amount) || 0;
      const tokenUsed = Math.max(0, parseFloat(res.tokenUsed) || 0);
      const tokenDiscount = Math.max(0, parseFloat(res.tokenDiscount) || 0);
      const commission = res.commission !== undefined ? res.commission : Math.round(amount * 0.05);
      const status = res.status || 'Confirmed';
      const paymentStatus = res.paymentStatus || (status === 'Cancelled' ? 'Refunded' : (status === 'PendingConfirm' || status === 'Pending' ? 'Pending' : 'Paid'));
      const paymentMethod = res.paymentMethod || (paymentStatus === 'Pending' ? 'Pay at Property / Invoice' : 'SabuyPay Wallet');
      const bankPool = ['KBank •••-•-8824-1', 'SCB •••-•-4190-5', 'BBL •••-•-7302-9', 'KTB •••-•-5518-7'];
      const bankAccountNo = res.bankAccountNo || bankPool[Math.floor(Math.random() * bankPool.length)];
      const curUser = (state.auth && state.auth.currentUser) ? state.auth.currentUser : (state.user || {});

      // Deduct redeemed TCN discount if used during checkout
      if (tokenUsed > 0 && state.user && state.user.tokenBalance >= tokenUsed) {
        state.user.tokenBalance = Math.round((state.user.tokenBalance - tokenUsed) * 100) / 100;
        if (state.auth && state.auth.currentUser) state.auth.currentUser.tokenBalance = state.user.tokenBalance;
        this.syncUserBalanceToRegistered(state.user);
        state.tokenLogs.unshift({
          time: now,
          userId: res.userId || curUser.id || state.user.id || 'TC-849204',
          userName: res.guest || curUser.name || state.user.name,
          action: 'Token Burning',
          actionCode: '-',
          detail: `ใช้ส่วนลดค่าจอง #${cleanId} (${tokenUsed.toLocaleString()} TCN = -฿${tokenDiscount.toLocaleString()})`,
          amount: tokenUsed,
          balance: state.user.tokenBalance,
          txHash: generateHash(),
          block: generateBlock(),
          status: 'Confirmed'
        });
      }

      const earnedPoints = Math.round(amount * 0.05 * 100) / 100;
      const newBooking = {
        id: cleanId,
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
        checkinTime: res.checkinTime || '14:00',
        checkoutTime: res.checkoutTime || '12:00',
        bookedOn: res.bookedOn || now,
        originalAmount: originalAmount,
        tokenUsed: tokenUsed,
        tokenDiscount: tokenDiscount,
        amount: amount,
        commission: commission,
        status: status,
        paymentMethod: paymentMethod,
        paymentStatus: paymentStatus,
        invoiceNo: res.invoiceNo || `INV-${todayDate.slice(0, 4)}-${cleanId}`,
        invoiceDate: res.invoiceDate || todayDate,
        transferDate: res.transferDate !== undefined ? res.transferDate : (paymentStatus === 'Paid' ? todayDate : '-'),
        bankAccountNo: bankAccountNo,
        rewardMinted: paymentStatus === 'Paid',
        notes: res.notes || `จองออนไลน์ผ่าน ThailandCONNEX (${paymentMethod} • ${paymentStatus === 'Paid' ? 'ชำระแล้ว' : 'รอชำระเงิน'})`
      };

      state.reservations.unshift(newBooking);

      // Earn tokens (5% of paid value as TCN) when payment is Paid
      if (paymentStatus === 'Paid' && earnedPoints > 0) {
        state.user.tokenBalance = Math.round((state.user.tokenBalance + earnedPoints) * 100) / 100;
        if (state.auth && state.auth.currentUser) state.auth.currentUser.tokenBalance = state.user.tokenBalance;
        this.syncUserBalanceToRegistered(state.user);
        state.tokenLogs.unshift({
          time: now,
          userId: newBooking.userId || state.user.id || 'TC-849204',
          userName: newBooking.guest || state.user.name || 'คุณอลิสา ใจดี',
          action: 'Token Minting',
          actionCode: '+',
          detail: `Earned from booking #${newBooking.id} (${newBooking.property}) [${paymentMethod}]`,
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

    markReservationPaid(id, method) {
      const state = this.getState();
      const cleanId = String(id).replace('BK-', '');
      const res = state.reservations.find(r => String(r.id).replace('BK-', '') === cleanId);
      if (!res) return null;

      const now = getNowStr();
      const todayDate = now.slice(0, 10);
      res.paymentStatus = 'Paid';
      if (method) res.paymentMethod = method;
      if (res.status === 'PendingConfirm' || res.status === 'Pending') {
        res.status = 'Confirmed';
      }
      res.transferDate = todayDate;

      const earnedPoints = Math.round((parseFloat(res.amount) || 0) * 0.05 * 100) / 100;
      if (!res.rewardMinted && earnedPoints > 0) {
        res.rewardMinted = true;
        state.user.tokenBalance = Math.round((state.user.tokenBalance + earnedPoints) * 100) / 100;
        if (state.auth && state.auth.currentUser) state.auth.currentUser.tokenBalance = state.user.tokenBalance;
        this.syncUserBalanceToRegistered(state.user);
        state.tokenLogs.unshift({
          time: now,
          userId: res.userId || state.user.id || 'TC-849204',
          userName: res.guest || state.user.name || 'คุณอลิสา ใจดี',
          action: 'Token Minting',
          actionCode: '+',
          detail: `Earned after payment #${res.id} (${res.property}) [${res.paymentMethod}]`,
          amount: earnedPoints,
          balance: state.user.tokenBalance,
          txHash: generateHash(),
          block: generateBlock(),
          status: 'Confirmed'
        });
      }

      this.save(state);
      return res;
    }

    updateReservationStatus(id, newStatus) {
      const state = this.getState();
      const cleanId = String(id).replace('BK-', '');
      const res = state.reservations.find(r => String(r.id).replace('BK-', '') === cleanId);
      if (res) {
        res.status = newStatus;
        if (newStatus === 'Cancelled') {
          res.paymentStatus = 'Refunded';
          res.transferDate = '-';
        } else if (newStatus === 'Confirmed' && res.paymentStatus === 'Pending') {
          res.paymentStatus = 'Paid';
          res.transferDate = getNowStr().slice(0, 10);
        }
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
        return { success: false, message: 'คะแนน TCN ไม่เพียงพอสำหรับการแลก' };
      }

      state.user.tokenBalance = Math.round((state.user.tokenBalance - v.points) * 100) / 100;
      if (state.auth && state.auth.currentUser) state.auth.currentUser.tokenBalance = state.user.tokenBalance;
      this.syncUserBalanceToRegistered(state.user);
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

      const curUser = (state.auth && state.auth.currentUser) ? state.auth.currentUser : (state.user || {});
      // Token Burning on blockchain
      state.tokenLogs.unshift({
        time: getNowStr(),
        userId: curUser.id || state.user.id || 'TC-849204',
        userName: curUser.name || state.user.name || 'คุณอลิสา ใจดี',
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
      if (state.auth && state.auth.currentUser) state.auth.currentUser.tokenBalance = state.user.tokenBalance;
      this.syncUserBalanceToRegistered(state.user);
      const curUser = (state.auth && state.auth.currentUser) ? state.auth.currentUser : (state.user || {});
      state.tokenLogs.unshift({
        time: getNowStr(),
        userId: curUser.id || state.user.id || 'TC-849204',
        userName: curUser.name || state.user.name || 'คุณอลิสา ใจดี',
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
        userId: newUser.id,
        userName: newUser.name,
        action: 'Token Minting',
        actionCode: '+',
        detail: `Welcome Bonus 500 TCN สมัครสมาชิกใหม่ (${newUser.name})`,
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

    // API Key & Partner Integration Management
    getApiKeys() {
      const state = this.getState();
      return state.apiKeys || (DEFAULT_STATE.apiKeys ? [...DEFAULT_STATE.apiKeys] : []);
    }

    addApiKey(keyData) {
      const state = this.getState();
      if (!state.apiKeys) state.apiKeys = DEFAULT_STATE.apiKeys ? [...DEFAULT_STATE.apiKeys] : [];
      state.apiKeys.unshift(keyData);
      this.save(state);
      return { success: true, key: keyData };
    }

    toggleApiKey(id) {
      const state = this.getState();
      if (!state.apiKeys) state.apiKeys = DEFAULT_STATE.apiKeys ? [...DEFAULT_STATE.apiKeys] : [];
      const item = state.apiKeys.find(k => k.id === id || k.fullKey === id);
      if (item) {
        item.status = item.status === 'Active' ? 'Disabled' : 'Active';
        this.save(state);
        return { success: true, status: item.status };
      }
      return { success: false };
    }

    deleteApiKey(id) {
      const state = this.getState();
      if (!state.apiKeys) state.apiKeys = DEFAULT_STATE.apiKeys ? [...DEFAULT_STATE.apiKeys] : [];
      const idx = state.apiKeys.findIndex(k => k.id === id || k.fullKey === id);
      if (idx !== -1) {
        state.apiKeys.splice(idx, 1);
        this.save(state);
        return { success: true };
      }
      return { success: false };
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
