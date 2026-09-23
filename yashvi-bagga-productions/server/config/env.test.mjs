import test from 'node:test';
import assert from 'node:assert/strict';
import { loadEnv, resetEnvCache } from './env.js';

test('loadEnv applies safe local defaults', () => {
  resetEnvCache();
  const env = loadEnv({});
  assert.equal(env.ADMIN_EMAIL, 'admin@example.com');
  assert.equal(env.STORE_DRIVER, 'memory');
  assert.equal(env.JWT_EXPIRES_SECONDS, 3600);
  assert.ok(env.JWT_SECRET.length >= 16);
});

test('loadEnv rejects an invalid admin email', () => {
  assert.throws(() => loadEnv({ ADMIN_EMAIL: 'not-an-email' }));
});

test('loadEnv coerces PORT and JWT expiry', () => {
  const env = loadEnv({ PORT: '4500', JWT_EXPIRES_SECONDS: '120' });
  assert.equal(env.PORT, 4500);
  assert.equal(env.JWT_EXPIRES_SECONDS, 120);
});
