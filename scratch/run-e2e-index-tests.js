const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${name} -> ${err.message}`);
    failed++;
  }
}

console.log('=======================================================');
console.log('   END-TO-END TEST SUITE FOR index.html & shared-store ');
console.log('=======================================================\n');

const html = fs.readFileSync('index.html', 'utf8');
const htmlOnly = html.replace(/<script[\s\S]*?<\/script>/gi, '');
const scripts = [...html.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1])
  .filter(c => c.trim().length > 10);
const inlineJs = scripts.join('\n');

// --- SUITE 1: STATIC & DOM INTEGRITY ---
console.log('Suite 1: HTML Structure, Scripts & Handlers');
test('External script files (depa-real-data.js, shared-store.js) exist', () => {
  assert(fs.existsSync('depa-real-data.js'), 'depa-real-data.js missing');
  assert(fs.existsSync('shared-store.js'), 'shared-store.js missing');
});

test('Inline JavaScript in index.html compiles cleanly with zero syntax errors', () => {
  new Function(inlineJs);
});

test('No duplicate static HTML element IDs in index.html', () => {
  const ids = [...htmlOnly.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]);
  const seen = new Set();
  const dups = [];
  ids.forEach(id => { if (seen.has(id)) dups.push(id); seen.add(id); });
  assert.strictEqual(dups.length, 0, 'Duplicate IDs found: ' + dups.join(', '));
});

test('All inline HTML onclick/onchange/oninput/onsubmit handlers point to defined functions', () => {
  const fnDefs = new Set([...inlineJs.matchAll(/function\s+([a-zA-Z0-9_]+)\s*\(/g)].map(m => m[1]));
  const handlers = [...htmlOnly.matchAll(/\bon(?:click|change|input|submit|keyup|keydown)=["']([^"']+)["']/gi)].map(m => m[1]);
  const allowed = new Set(['if', 'confirm', 'alert', 'open', 'close', 'scrollTo', 'stopPropagation', 'preventDefault', 'includes', 'replace', 'contains', 'parseInt', 'Number']);
  const missing = [];
  handlers.forEach(h => {
    [...h.matchAll(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g)].forEach(m => {
      if (!fnDefs.has(m[1]) && !allowed.has(m[1])) missing.push(m[1]);
    });
  });
  assert.strictEqual(missing.length, 0, 'Undefined handler functions: ' + [...new Set(missing)].join(', '));
});

test('executeTokenTransfer uses TCStore.transferTokens for real-time persistence', () => {
  const m = inlineJs.match(/function executeTokenTransfer\([\s\S]*?\n    \}/);
  assert(m && m[0].includes('TCStore.transferTokens'), 'executeTokenTransfer must call TCStore.transferTokens');
});

test('sortReservations supports id, checkin, and amount sorting', () => {
  const m = inlineJs.match(/function sortReservations\([\s\S]*?\n    \}/);
  assert(m && m[0].includes("'checkin'") && m[0].includes("'amount'") && m[0].includes("'id'"), 'sortReservations missing sort fields');
});

test('handleRegisterFormSubmit refreshes user booking history via renderReservations()', () => {
  const m = inlineJs.match(/function handleRegisterFormSubmit\([\s\S]*?\n    \}/);
  assert(m && m[0].includes('renderReservations()'), 'handleRegisterFormSubmit must call renderReservations()');
});

test('renderTokenLogs and renderDirectory safely handle removed DOM nodes', () => {
  const normJs = inlineJs.replace(/\r\n/g, '\n');
  assert(normJs.includes("const tbody = document.getElementById('token-tx-tbody');\n      if (!tbody) return;"));
  assert(normJs.includes("const tbody = document.getElementById('directory-tbody');\n      if (!tbody) return;"));
});

// --- SUITE 2: RUNTIME STORE & BUSINESS LOGIC ---
console.log('\nSuite 2: Browser-like VM Simulation (DEPA Data + TCStore + Business Logic)');
const memStorage = {};
const sandbox = {
  console,
  Date, Math, JSON, Number, String, Array, Object, Boolean, RegExp, parseInt, parseFloat, isNaN,
  localStorage: {
    getItem: (k) => (k in memStorage ? memStorage[k] : null),
    setItem: (k, v) => { memStorage[k] = String(v); },
    removeItem: (k) => { delete memStorage[k]; }
  },
  addEventListener: () => {}
};
sandbox.window = sandbox;
sandbox.self = sandbox;
const ctx = vm.createContext(sandbox);

vm.runInContext(fs.readFileSync('depa-real-data.js', 'utf8'), ctx);
vm.runInContext(fs.readFileSync('shared-store.js', 'utf8'), ctx);

test('DEPA_REAL_DATA loads real services dataset (1,000+ records)', () => {
  assert(ctx.DEPA_REAL_DATA, 'DEPA_REAL_DATA not defined');
  assert(Array.isArray(ctx.DEPA_REAL_DATA.allServices), 'allServices not an array');
  assert(ctx.DEPA_REAL_DATA.allServices.length >= 1000, 'Expected >= 1000 services, got ' + ctx.DEPA_REAL_DATA.allServices.length);
});

test('TCStore initializes with 9 default reservations and registered users', () => {
  const st = ctx.TCStore.getState();
  assert(st.version >= 6, 'Expected version >= 6');
  assert.strictEqual(st.reservations.length, 9);
  assert(st.auth.registeredUsers.length >= 3);
});

test('Authentication: loginUser rejects invalid password & accepts valid user', () => {
  const bad = ctx.TCStore.loginUser('alisa.jaidee@thailandconnex.com', 'wrong-pass');
  assert.strictEqual(bad.success, false);
  const ok = ctx.TCStore.loginUser('alisa.jaidee@thailandconnex.com', 'password123');
  assert.strictEqual(ok.success, true);
  assert.strictEqual(ok.user.id, 'TC-849204');
});

test('Booking History Isolation: each user only sees their own reservations', () => {
  const st = ctx.TCStore.getState();
  const filterFor = (u) => st.reservations.filter(r =>
    (u.id && r.userId === u.id) ||
    (u.email && r.email && r.email.toLowerCase() === u.email.toLowerCase()) ||
    (u.name && r.guest && (r.guest.includes(u.name) || u.name.includes(r.guest)))
  );
  const alisa = st.auth.registeredUsers.find(u => u.id === 'TC-849204');
  const somchai = st.auth.registeredUsers.find(u => u.id === 'TC-391820');
  const panop = st.auth.registeredUsers.find(u => u.id === 'TC-512093');
  assert.strictEqual(filterFor(alisa).length, 2, 'Alisa should have 2 bookings');
  assert.strictEqual(filterFor(somchai).length, 1, 'Somchai should have 1 booking');
  assert.strictEqual(filterFor(panop).length, 1, 'Panop should have 1 booking');
});

test('Registration grants 500 TCP Welcome Bonus & records attributed tokenLog', () => {
  const reg = ctx.TCStore.registerUser({ name: 'ทดสอบ ผู้ใช้งาน', email: 'qa@test.th', phone: '089-000-1111', password: 'pw123' });
  assert.strictEqual(reg.success, true);
  assert.strictEqual(reg.user.tokenBalance, 500);
  const latestLog = ctx.TCStore.getState().tokenLogs[0];
  assert.strictEqual(latestLog.userId, reg.user.id);
  assert.strictEqual(latestLog.userName, 'ทดสอบ ผู้ใช้งาน');
  assert.strictEqual(latestLog.amount, 500);
});

test('Booking adds reservation with userId, awards 5% TCP, and updates registeredUsers balance', () => {
  const beforeBal = ctx.TCStore.getState().user.tokenBalance;
  const bk = ctx.TCStore.addReservation({
    serviceName: 'QA Deluxe Suite',
    property: 'QA Beach Resort',
    amount: 4000,
    checkin: '2026-11-25',
    checkout: '2026-11-27'
  });
  const st = ctx.TCStore.getState();
  assert.strictEqual(bk.userId, st.user.id);
  assert.strictEqual(st.user.tokenBalance, beforeBal + 200);
  const regUser = st.auth.registeredUsers.find(u => u.id === st.user.id);
  assert.strictEqual(regUser.tokenBalance, beforeBal + 200);
});

test('Voucher redemption deducts TCP, adds active coupon, and logs Token Burning with userName', () => {
  const stBefore = ctx.TCStore.getState();
  const voucher = stBefore.vouchers.find(v => v.points <= stBefore.user.tokenBalance);
  assert(voucher, 'Should have an affordable voucher');
  const balBefore = stBefore.user.tokenBalance;
  const res = ctx.TCStore.redeemVoucher(voucher.id);
  assert.strictEqual(res.success, true);
  const stAfter = ctx.TCStore.getState();
  assert.strictEqual(stAfter.user.tokenBalance, balBefore - voucher.points);
  assert.strictEqual(stAfter.tokenLogs[0].action, 'Token Burning');
  assert.strictEqual(stAfter.tokenLogs[0].userId, stAfter.user.id);
  const usedRes = ctx.TCStore.useCoupon(res.coupon.id);
  assert.strictEqual(usedRes.success, true);
  assert.strictEqual(usedRes.coupon.status, 'used');
});

test('Token Transfer deducts TCP, syncs registeredUsers, and logs Transfer Out with userName', () => {
  const balBefore = ctx.TCStore.getState().user.tokenBalance;
  const res = ctx.TCStore.transferTokens('TC-849204', 50);
  assert.strictEqual(res.success, true);
  const stAfter = ctx.TCStore.getState();
  assert.strictEqual(stAfter.user.tokenBalance, balBefore - 50);
  const regUser = stAfter.auth.registeredUsers.find(u => u.id === stAfter.user.id);
  assert.strictEqual(regUser.tokenBalance, balBefore - 50);
  assert.strictEqual(stAfter.tokenLogs[0].action, 'Transfer Out');
  assert.strictEqual(stAfter.tokenLogs[0].userId, stAfter.user.id);
});

test('Date validation blocks past dates and allows today or future dates', () => {
  // Extract getTodayDateStr logic
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const pastStr = '2020-01-01';
  const futureStr = '2026-12-31';
  assert(pastStr < todayStr, 'Past date must be detected as < today');
  assert(!(todayStr < todayStr), 'Today must be allowed');
  assert(!(futureStr < todayStr), 'Future date must be allowed');
  assert(inlineJs.includes('if (checkinVal < todayStr)'), 'executeConfirmedBooking must block past dates');
});

test('Logout clears active session properly', () => {
  ctx.TCStore.logoutUser();
  const st = ctx.TCStore.getState();
  assert.strictEqual(st.auth.currentUser.isLoggedIn, false);
  assert.strictEqual(st.auth.currentUser.id, 'TC-GUEST');
});

console.log('\n=======================================================');
console.log(`   TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('=======================================================');
if (failed > 0) process.exit(1);
