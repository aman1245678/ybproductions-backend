import test from 'node:test';
import assert from 'node:assert/strict';
import { AppError, ok, err, toErrorResponse } from './errors.js';

test('ok and err Result wrappers', () => {
  assert.deepEqual(ok(1), { ok: true, value: 1 });
  const failure = err(new AppError(400, 'Bad', 'nope'));
  assert.equal(failure.ok, false);
  assert.equal(failure.error.status, 400);
});

test('toErrorResponse maps ZodError to 400 JSON', () => {
  const zodLike = {
    name: 'ZodError',
    issues: [{ path: ['contactEmail'], message: 'A valid email is required' }],
  };
  const mapped = toErrorResponse(zodLike);
  assert.equal(mapped.status, 400);
  assert.equal(mapped.body.title, 'Validation Failed');
  assert.equal(mapped.body.issues[0].path, 'contactEmail');
});

test('toErrorResponse maps AppError status and title', () => {
  const mapped = toErrorResponse(new AppError(401, 'Unauthorized', 'Invalid email or password.'));
  assert.equal(mapped.status, 401);
  assert.equal(mapped.body.title, 'Unauthorized');
  assert.equal(mapped.body.detail, 'Invalid email or password.');
});

test('toErrorResponse maps unknown throws to 500', () => {
  const mapped = toErrorResponse(new Error('boom'));
  assert.equal(mapped.status, 500);
  assert.equal(mapped.body.title, 'Internal Server Error');
  assert.equal(mapped.body.detail, 'boom');
});
