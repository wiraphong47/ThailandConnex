const fs = require('fs');

console.log('=======================================================');
console.log('   THAILANDCONNEX INDEX.HTML COMPREHENSIVE TEST AUDIT  ');
console.log('=======================================================\n');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Check external scripts & stylesheets
const extScripts = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('[1] External Scripts:');
extScripts.forEach(s => {
  const exists = s.startsWith('http') ? 'CDN' : fs.existsSync(s);
  console.log(`   - ${s}: ${exists}`);
});

// 2. Collect all static HTML IDs (outside <script> blocks) and check duplicates
const htmlOnly = html.replace(/<script[\s\S]*?<\/script>/gi, '');
const idMatches = [...htmlOnly.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]);
const idCounts = {};
idMatches.forEach(id => idCounts[id] = (idCounts[id] || 0) + 1);
const dupIds = Object.entries(idCounts).filter(([, c]) => c > 1);
console.log('\n[2] Duplicate Static HTML IDs:', dupIds.length === 0 ? 'NONE (OK)' : dupIds);

// 3. Extract inline JS & check syntax
const scripts = [...html.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1])
  .filter(c => c.trim().length > 10);
const js = scripts.join('\n');

try {
  new Function(js);
  console.log('\n[3] Inline JavaScript Syntax: PASS');
} catch (e) {
  console.log('\n[3] Inline JavaScript Syntax: FAIL ->', e.message);
}

// 4. Check every getElementById call against HTML IDs & dynamic IDs created in JS
const getIdCalls = [...new Set([...js.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]))];
const missingIds = getIdCalls.filter(id =>
  !idCounts[id] &&
  !js.includes('id="' + id + '"') &&
  !js.includes("id='" + id + "'")
);
console.log('\n[4] getElementById() targeting MISSING DOM elements:', missingIds.length === 0 ? 'NONE (OK)' : missingIds);
missingIds.forEach(id => {
  const lines = js.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes(id)) {
      console.log(`   ! JS line ~${idx + 1}: ${line.trim()}`);
    }
  });
});

// 5. Check all inline event handlers (onclick, onchange, oninput, onsubmit, onkeydown)
const fnDefs = new Set([...js.matchAll(/function\s+([a-zA-Z0-9_]+)\s*\(/g)].map(m => m[1]));
const handlerCalls = [...htmlOnly.matchAll(/\bon(?:click|change|input|submit|keyup|keydown)=["']([^"']+)["']/gi)].map(m => m[1]);
const builtins = new Set(['if', 'confirm', 'alert', 'open', 'close', 'scrollTo', 'stopPropagation', 'preventDefault', 'includes', 'replace', 'resetDefaults', 'parseInt', 'Math', 'Number', 'String', 'Boolean', 'openModal', 'closeModal']);
const missingFns = new Set();
handlerCalls.forEach(h => {
  const calls = [...h.matchAll(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g)].map(m => m[1]);
  calls.forEach(fn => {
    if (!fnDefs.has(fn) && !builtins.has(fn)) {
      missingFns.add(fn);
    }
  });
});
console.log('\n[5] HTML Event Handlers calling undefined functions:', missingFns.size === 0 ? 'NONE (OK)' : [...missingFns]);

// Also check dynamic HTML handlers inside JS strings
const jsHandlers = [...js.matchAll(/\bon(?:click|change|input|submit|keyup|keydown)=["']([^"']+)["']/gi)].map(m => m[1]);
const missingJsFns = new Set();
jsHandlers.forEach(h => {
  const calls = [...h.matchAll(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g)].map(m => m[1]);
  calls.forEach(fn => {
    if (!fnDefs.has(fn) && !builtins.has(fn) && !['focus', 'click', 'toLowerCase', 'trim', 'split', 'join'].includes(fn)) {
      missingJsFns.add(fn);
    }
  });
});
console.log('[5b] Dynamic JS Template Handlers calling undefined functions:', missingJsFns.size === 0 ? 'NONE (OK)' : [...missingJsFns]);

// 6. Inspect key functions in index.html for TCStore sync & null-safety
console.log('\n[6] Key Feature & Sync Checks:');
const checkFn = (name) => {
  const m = js.match(new RegExp('function ' + name + '\\([\\s\\S]*?\\n    \\}'));
  return m ? m[0] : null;
};

['renderDirectory', 'executeTokenTransfer', 'redeemVoucher', 'confirmUseCoupon', 'handleRegisterFormSubmit', 'DOMContentLoaded'].forEach(name => {
  if (name === 'DOMContentLoaded') {
    const idx = js.indexOf("addEventListener('DOMContentLoaded'");
    console.log('\n--- DOMContentLoaded ---');
    console.log(js.slice(idx, idx + 700));
  } else {
    const body = checkFn(name);
    if (!body) {
      console.log(`\n--- ${name}: NOT FOUND ---`);
    } else {
      const usesStore = body.includes('TCStore');
      console.log(`\n--- ${name} (uses TCStore: ${usesStore}) ---`);
      console.log(body.slice(0, 600) + (body.length > 600 ? '\n  ...[truncated]' : ''));
    }
  }
});

// 7. Test TCStore & DEPA_REAL_DATA runtime evaluation
console.log('\n[7] Runtime Data & Store Simulation:');
global.window = global;
const memStorage = {};
global.localStorage = {
  getItem: (k) => memStorage[k] || null,
  setItem: (k, v) => { memStorage[k] = String(v); },
  removeItem: (k) => { delete memStorage[k]; }
};
global.addEventListener = () => {};

if (fs.existsSync('depa-real-data.js')) {
  require('../depa-real-data.js');
  console.log('   - depa-real-data.js loaded: services =', global.DEPA_REAL_DATA?.allServices?.length, ', directory =', global.DEPA_REAL_DATA?.directory?.length);
}
require('../shared-store.js');
const store = global.TCStore;
const st0 = store.getState();
console.log('   - TCStore initialized: version =', st0.version, ', reservations =', st0.reservations.length, ', users =', st0.auth.registeredUsers.length);

// Test Login / Logout / Register / Book / Redeem / Transfer
const loginOk = store.loginUser('alisa.jaidee@thailandconnex.com', 'password123');
console.log('   - loginUser(alisa):', loginOk.success, '| balance:', loginOk.user?.tokenBalance);

const loginFail = store.loginUser('alisa.jaidee@thailandconnex.com', 'wrongpass');
console.log('   - loginUser(wrong pass):', loginFail.success, '(expected false)');

const regOk = store.registerUser({ name: 'ทดสอบ ระบบ', email: 'test.user@example.com', phone: '080-111-2222', password: 'secret' });
console.log('   - registerUser(new):', regOk.success, '| id:', regOk.user?.id, '| bonus balance:', regOk.user?.tokenBalance);

const bk = store.addReservation({ serviceName: 'Test Hotel', property: 'Test Resort', amount: 2000, checkin: '2026-11-25', checkout: '2026-11-26' });
console.log('   - addReservation:', bk.id, '| userId:', bk.userId, '| earned -> new balance:', store.getState().user.tokenBalance);

const red = store.redeemVoucher(store.getState().vouchers[0].id);
console.log('   - redeemVoucher:', red.success, '| remaining balance:', red.balance);

const trf = store.transferTokens('TC-849204', 50);
console.log('   - transferTokens(50):', trf.success, '| remaining balance:', trf.balance);

const latestLogs = store.getState().tokenLogs.slice(0, 4).map(l => `${l.userName}(${l.userId}): ${l.action} ${l.amount}`);
console.log('   - latest tokenLogs:', latestLogs);

store.logoutUser();
console.log('   - logoutUser -> isLoggedIn:', store.getState().auth.currentUser.isLoggedIn);
