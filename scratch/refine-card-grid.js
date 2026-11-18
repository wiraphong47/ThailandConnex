const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Update base .grid-3 and .grid-4 to use safe minmax(320px, 1fr) and minmax(260px, 1fr)
indexHtml = indexHtml.replace(
  `.grid-3 {\n      display: grid;\n      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));\n      gap: 20px;\n      margin-bottom: 36px;\n    }`,
  `.grid-3 {\n      display: grid;\n      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n      gap: 20px;\n      margin-bottom: 36px;\n    }`
);

indexHtml = indexHtml.replace(
  `.grid-4 {\n      display: grid;\n      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n      gap: 18px;\n      margin-bottom: 36px;\n    }`,
  `.grid-4 {\n      display: grid;\n      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n      gap: 18px;\n      margin-bottom: 36px;\n    }`
);

// 2. Make .card-actions-wrap auto-expand into a clean 2-column button bar if it wraps
const oldActionsCss = `    .card-actions-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }`;

const newActionsCss = `    .card-actions-wrap {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      margin-left: auto;
    }`;

if (indexHtml.includes(oldActionsCss)) {
  indexHtml = indexHtml.replace(oldActionsCss, newActionsCss);
  console.log('✓ Updated .card-actions-wrap');
}

// 3. In @media (max-width: 1080px), let auto-fill minmax(310px, 1fr) handle column count instead of forcing 2 columns when viewport < 768px
const old1080Grid = `    /* 1. Tablet Landscape & Small Laptop (max-width: 1080px) */
    @media (max-width: 1080px) {
      .grid-3 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
      }
      .grid-4 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }`;

const new1080Grid = `    /* 1. Tablet Landscape & Small Laptop (max-width: 1080px) */
    @media (max-width: 1080px) {
      .grid-3 {
        grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
        gap: 18px;
      }
      .grid-4 {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16px;
      }`;

if (indexHtml.includes(old1080Grid)) {
  indexHtml = indexHtml.replace(old1080Grid, new1080Grid);
  console.log('✓ Updated 1080px grid to auto-fill minmax(310px, 1fr)');
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('✓ Saved index.html');
