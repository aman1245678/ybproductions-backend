import test from 'node:test';
import assert from 'node:assert/strict';
import { loadEnv, resetEnvCache } from '../packages/api/config/env.js';

test('loadEnv rejects a JWT_SECRET shorter than 16 characters', () => {
  resetEnvCache();
  assert.throws(() => loadEnv({ JWT_SECRET: 'too-short' }));
});

test('loadEnv rejects an unknown STORE_DRIVER', () => {
  resetEnvCache();
  assert.throws(() => loadEnv({ STORE_DRIVER: 'redis' }));
});

test('loadEnv accepts file driver and custom DATA_DIR', () => {
  resetEnvCache();
  const env = loadEnv({ STORE_DRIVER: 'file', DATA_DIR: './tmp-data', JWT_SECRET: 'local-dev-jwt-secret-change-me' });
  assert.equal(env.STORE_DRIVER, 'file');
  assert.equal(env.DATA_DIR, './tmp-data');
});
