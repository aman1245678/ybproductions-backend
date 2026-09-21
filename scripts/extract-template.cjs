const fs = require('fs');
const path = require('path');

function extract(filePath) {
  const abs = path.resolve(filePath);
  const src = fs.readFileSync(abs, 'utf8');
  const match = src.match(/(\s*)template:\s*`([\s\S]*?)`\s*,/);
  if (!match) throw new Error('template not found: ' + abs);
  const html = match[2].replace(/^\r?\n/, '');
  const htmlPath = abs.replace(/\.ts$/, '.html');
  fs.writeFileSync(htmlPath, html.endsWith('\n') ? html : html + '\n');
  const rel = './' + path.basename(htmlPath);
  const next = src.replace(match[0], `${match[1]}templateUrl: '${rel}',`);
  fs.writeFileSync(abs, next);
  const lines = (html.match(/\n/g) || []).length + 1;
  console.log('ok', path.relative(process.cwd(), htmlPath), 'htmlLines=', lines);
}

for (const f of process.argv.slice(2)) extract(f);
