import test from 'node:test';
import assert from 'node:assert/strict';
import { signAccessToken, verifyAccessToken } from './jwt.js';
import { AuthError } from '../types/errors.js';

const secret = 'test-secret-value-32';
const claims = { sub: 'user-1', email: 'admin@example.com', role: 'Admin' };

test('signAccessToken then verifyAccessToken returns claims', () => {
  const token = signAccessToken(claims, { secret, expiresInSeconds: 120, now: 1_700_000_000 });
  const decoded = verifyAccessToken(token, { secret, now: 1_700_000_010 });
  assert.equal(decoded.sub, 'user-1');
  assert.equal(decoded.email, 'admin@example.com');
  assert.equal(decoded.role, 'Admin');
});

test('verifyAccessToken rejects a tampered signature', () => {
  const token = signAccessToken(claims, { secret });
  assert.throws(() => verifyAccessToken(`${token}x`, { secret }), AuthError);
});

test('verifyAccessToken rejects an expired token', () => {
  const token = signAccessToken(claims, { secret, expiresInSeconds: 10, now: 100 });
  assert.throws(() => verifyAccessToken(token, { secret, now: 120 }), AuthError);
});
