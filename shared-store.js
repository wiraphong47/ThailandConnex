/**
 * ThailandCONNEX - Shared Real-time Data Store
 * Provides bi-directional live data synchronization between Admin Portal (admin.html)
 * and User/Traveler Portal (index.html) using Web Storage and Storage Events.
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

  const STORAGE_KEY = 'TC_DATA_STORE_V2';

  const DEFAULT_STATE = {
    version: 2,
    lastUpdated: Date.now(),
    user: {
      name: 'อลิสา ใจดี',
      id: 'TC-849204',
      email: 'alisa.jaidee@thailandconnex.com',
      phone: '082-340-1223',
      walletAddress: '0x5E2D25aca0abA3ad658B3Ac1620F0DAB9733760',
      tokenBalance: 41520.00
    },
    reservations: [
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
          // fallback to memory cache
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

      const newBooking = {
        id: String(id),
        refNo: String(refNo),
        guest: res.guest || state.user.name,
        email: res.email || state.user.email,
        phone: res.phone || state.user.phone,
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
      const res = state.reservations.find(r => String(r.id) === String(id));
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

    // Reset Defaults
    resetDefaults() {
      const fresh = JSON.parse(JSON.stringify(DEFAULT_STATE));
      this.save(fresh);
      return fresh;
    }
  }

  return new Store();
});
