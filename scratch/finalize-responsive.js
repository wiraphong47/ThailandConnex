const fs = require('fs');

console.log('=== Finalizing responsive inline grids and admin mobile drawer ===');

let indexHtml = fs.readFileSync('index.html', 'utf8');
let adminHtml = fs.readFileSync('admin.html', 'utf8');

// Fix inline grids in index.html for mobile responsiveness
indexHtml = indexHtml.replace(
  '<div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">',
  '<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:8px;">'
);
indexHtml = indexHtml.replace(
  '<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:13px;">',
  '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; font-size:13px;">'
);
indexHtml = indexHtml.replace(
  '<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; background:#f1f5f9; padding:10px; border-radius:8px; font-size:12px;">',
  '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; background:#f1f5f9; padding:10px; border-radius:8px; font-size:12px;">'
);
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('✓ index.html inline grids updated');

// Fix switchView and inline grids in admin.html
const oldSwitchView = '    function switchView(viewId, triggerBtn) {';
const newSwitchView = `    function toggleAdminMobileSidebar() {
      const sb = document.querySelector('.sidebar');
      const ov = document.getElementById('admin-sidebar-overlay');
      if (sb) sb.classList.toggle('mobile-open');
      if (ov) ov.classList.toggle('show');
    }

    function switchView(viewId, triggerBtn) {
      const sb = document.querySelector('.sidebar');
      const ov = document.getElementById('admin-sidebar-overlay');
      if (sb && sb.classList.contains('mobile-open')) sb.classList.remove('mobile-open');
      if (ov && ov.classList.contains('show')) ov.classList.remove('show');`;

if (adminHtml.includes(oldSwitchView) && !adminHtml.includes('function toggleAdminMobileSidebar()')) {
  adminHtml = adminHtml.replace(oldSwitchView, newSwitchView);
  console.log('✓ admin.html toggleAdminMobileSidebar added');
}

adminHtml = adminHtml.replace(/grid-template-columns:repeat\(4,1fr\)/g, 'grid-template-columns:repeat(auto-fit, minmax(210px, 1fr))');
adminHtml = adminHtml.replace(
  '<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:16px;">',
  '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin-top:16px;">'
);
adminHtml = adminHtml.replace(
  '<div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">',
  '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">'
);
adminHtml = adminHtml.replace(
  '<div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:18px;">',
  '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:18px;">'
);
adminHtml = adminHtml.replace(
  /<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">/g,
  '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:12px;">'
);

fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('✓ admin.html responsive inline grids updated');
