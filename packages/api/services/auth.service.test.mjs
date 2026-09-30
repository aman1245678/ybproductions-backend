import test from 'node:test';
import assert from 'node:assert/strict';
import { ensureDefaultAdmin, loginAdmin } from './auth.service.js';
import { AuthError } from '../types/errors.js';
import { configureStore, resetStore } from '../db/store.js';
import { resetEnvCache } from '../config/env.js';
import { verifyAccessToken } from '../lib/jwt.js';
import { getEnv } from '../config/env.js';

test('loginAdmin returns a verifiable JWT for default admin credentials', () => {
  resetEnvCache();
  configureStore({ driver: 'memory' });
  resetStore();
  ensureDefaultAdmin();
  const session = loginAdmin({
    email: 'admin@example.com',
    password: 'change-me-in-local-env',
  });
  assert.ok(session.accessToken);
  assert.equal(session.user.role, 'Admin');
  const claims = verifyAccessToken(session.accessToken, { secret: getEnv().JWT_SECRET });
  assert.equal(claims.email, 'admin@example.com');
});

test('loginAdmin throws AuthError for bad credentials', () => {
  resetEnvCache();
  configureStore({ driver: 'memory' });
  resetStore();
  ensureDefaultAdmin();
  assert.throws(
    () => loginAdmin({ email: 'admin@example.com', password: 'wrong-password' }),
    AuthError,
  );
});
