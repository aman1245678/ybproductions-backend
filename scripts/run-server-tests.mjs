import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function collect(dir, out = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) collect(p, out);
    else if (name.name.endsWith('.test.mjs') || name.name.endsWith('.test.js')) out.push(p);
  }
  return out;
}

const files = [
  ...collect(join(root, 'yashvi-bagga-productions', 'server')),
  ...collect(join(root, 'test')),
];

if (!files.length) {
  console.error('No server test files found');
  process.exit(1);
}

const result = spawnSync(process.execPath, ['--test', ...files], {
  stdio: 'inherit',
  cwd: root,
  env: { ...process.env, NODE_ENV: process.env.NODE_ENV || 'test' },
});
process.exit(result.status ?? 1);
