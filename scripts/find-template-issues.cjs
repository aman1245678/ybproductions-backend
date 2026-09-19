const fs = require('fs');
const path = require('path');

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory() && e.name !== 'node_modules') walk(p, a);
    else if (/\.(ts|html)$/.test(e.name)) a.push(p);
  }
  return a;
}

for (const f of walk('yashvi-bagga-productions/src')) {
  const t = fs.readFileSync(f, 'utf8');
  const slash = [...t.matchAll(/\[class\.[^\]]*\/[^\]]*\]/g)].map((m) => m[0]);
  const cmp = [...t.matchAll(/@if\s*\([^)]*[<>]=?[^)]*\)|\[[^\]]+\]="[^"]*[<>]=?[^"]*"/g)].map(
    (m) => m[0],
  );
  if (slash.length || cmp.length) {
    console.log('\n' + f);
    slash.forEach((s) => console.log('  SLASH', s));
    cmp.forEach((s) => console.log('  CMP  ', s));
  }
}
