import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { configureStore, resetStore, withStore } from './store.js';

test('memory store persists mutations for the process', () => {
  configureStore({ driver: 'memory' });
  resetStore();
  withStore((snap) => {
    snap.applications.A1 = { applicationId: 'A1' };
  });
  const found = withStore((snap) => snap.applications.A1);
  assert.equal(found.applicationId, 'A1');
});

test('file store writes JSON and reloads it', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ybp-store-'));
  configureStore({ driver: 'file', dataDir: dir });
  resetStore();
  withStore((snap) => {
    snap.users.u1 = { id: 'u1', email: 'a@b.com' };
  });
  const saved = JSON.parse(readFileSync(join(dir, 'store.json'), 'utf8'));
  assert.equal(saved.users.u1.email, 'a@b.com');
  configureStore({ driver: 'file', dataDir: dir });
  const reloaded = withStore((snap) => snap.users.u1);
  assert.equal(reloaded.id, 'u1');
  configureStore({ driver: 'memory' });
});
