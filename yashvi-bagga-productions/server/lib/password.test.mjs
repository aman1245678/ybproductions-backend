import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword } from './password.js';

test('hashPassword is not reversible and verifyPassword accepts the original', () => {
  const encoded = hashPassword('change-me-in-local-env');
  assert.notEqual(encoded, 'change-me-in-local-env');
  assert.match(encoded, /^scrypt\$/);
  assert.equal(verifyPassword('change-me-in-local-env', encoded), true);
});

test('verifyPassword rejects a wrong password', () => {
  const encoded = hashPassword('correct-horse');
  assert.equal(verifyPassword('wrong-battery', encoded), false);
});

test('verifyPassword rejects a malformed hash', () => {
  assert.equal(verifyPassword('anything', 'not-a-hash'), false);
});
