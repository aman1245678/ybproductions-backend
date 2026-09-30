import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { configureStore, resetStore, withStore } from '../packages/api/db/store.js';
import {
  findApplication,
  insertApplication,
} from '../packages/api/repositories/applications.repository.js';
import {
  findUserByEmail,
  insertUser,
} from '../packages/api/repositories/users.repository.js';

test('memory store round-trips applications through the repository', () => {
  configureStore({ driver: 'memory' });
  resetStore();
  const created = insertApplication({
    formType: 'CONTACT',
    contactName: 'Aman',
    contactEmail: 'aman@example.com',
  });
  assert.equal(findApplication(created.applicationId).contactEmail, 'aman@example.com');
});

test('file store persists applications and users across configureStore reloads', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ybp-repo-'));
  configureStore({ driver: 'file', dataDir: dir });
  resetStore();
  const app = insertApplication({
    formType: 'BRANDING',
    contactName: 'Ops',
    contactEmail: 'ops@example.com',
  });
  insertUser({ email: 'admin@example.com', passwordHash: 'scrypt$x', role: 'Admin' });
  const onDisk = JSON.parse(readFileSync(join(dir, 'store.json'), 'utf8'));
  assert.ok(onDisk.applications[app.applicationId]);
  assert.ok(Object.values(onDisk.users).some((u) => u.email === 'admin@example.com'));

  configureStore({ driver: 'file', dataDir: dir });
  assert.equal(findApplication(app.applicationId).formType, 'BRANDING');
  assert.equal(findUserByEmail('admin@example.com').role, 'Admin');
  configureStore({ driver: 'memory' });
});

test('withStore mutations are visible after save on memory driver', () => {
  configureStore({ driver: 'memory' });
  resetStore();
  withStore((snap) => {
    snap.audit.push({ type: 'ping' });
  });
  const audit = withStore((snap) => snap.audit);
  assert.equal(audit.length, 1);
  assert.equal(audit[0].type, 'ping');
});
