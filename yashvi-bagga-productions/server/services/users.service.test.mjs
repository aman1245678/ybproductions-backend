import test from 'node:test';
import assert from 'node:assert/strict';
import { createUser, getCurrentUser, listDirectory } from './users.service.js';
import { ConflictError, ForbiddenError } from '../types/errors.js';
import { configureStore, resetStore } from '../db/store.js';
import { insertUser } from '../repositories/users.repository.js';

test('createUser and listDirectory require an Admin actor', () => {
  configureStore({ driver: 'memory' });
  resetStore();
  const admin = { role: 'Admin' };
  const staff = { role: 'Staff' };
  const created = createUser(
    { email: 'ops@example.com', password: 'staff-pass', role: 'Staff' },
    admin,
  );
  assert.equal(created.email, 'ops@example.com');
  assert.equal(listDirectory(admin).length, 1);
  assert.throws(() => listDirectory(staff), ForbiddenError);
  assert.throws(
    () => createUser({ email: 'x@y.com', password: 'abcdef' }, staff),
    ForbiddenError,
  );
});

test('createUser rejects a duplicate email', () => {
  configureStore({ driver: 'memory' });
  resetStore();
  insertUser({ email: 'ops@example.com', passwordHash: 'x', role: 'Staff' });
  assert.throws(
    () => createUser({ email: 'ops@example.com', password: 'abcdef' }, { role: 'Admin' }),
    ConflictError,
  );
});

test('getCurrentUser returns a public profile', () => {
  configureStore({ driver: 'memory' });
  resetStore();
  const user = insertUser({ email: 'me@example.com', passwordHash: 'x', role: 'Admin' });
  const me = getCurrentUser(user.id);
  assert.equal(me.email, 'me@example.com');
  assert.equal('passwordHash' in me, false);
});
