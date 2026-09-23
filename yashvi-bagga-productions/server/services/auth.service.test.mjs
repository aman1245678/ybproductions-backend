import test from 'node:test';
import assert from 'node:assert/strict';
import { loginAdmin } from './auth.service.js';
import { AuthError } from '../types/errors.js';

test('loginAdmin returns tokens for default admin credentials', () => {
  const session = loginAdmin({
    email: 'admin@example.com',
    password: 'change-me-in-local-env',
  });
  assert.ok(session.accessToken);
  assert.equal(session.user.role, 'Admin');
});

test('loginAdmin throws AuthError for bad credentials', () => {
  assert.throws(
    () => loginAdmin({ email: 'admin@example.com', password: 'wrong-password' }),
    AuthError,
  );
});
