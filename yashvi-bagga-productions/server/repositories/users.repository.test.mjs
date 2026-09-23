import test from 'node:test';
import assert from 'node:assert/strict';
import { configureStore, resetStore } from '../db/store.js';
import { findUserByEmail, insertUser, listUsers } from './users.repository.js';

test('insertUser stores a lowercased email and hides the hash from listUsers', () => {
  configureStore({ driver: 'memory' });
  resetStore();
  const created = insertUser({
    email: 'Admin@Example.com',
    passwordHash: 'scrypt$hidden',
    role: 'Admin',
  });
  assert.equal(created.email, 'admin@example.com');
  assert.equal('passwordHash' in created, false);
  assert.equal(findUserByEmail('admin@example.com').passwordHash, 'scrypt$hidden');
  assert.equal(listUsers().length, 1);
});
