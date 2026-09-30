import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';
import {
  AuthError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  serializeAppError,
} from './app-error.js';

test('ValidationError serializes to 400 JSON', () => {
  const mapped = serializeAppError(new ValidationError('bad body', [{ path: 'email', message: 'required' }]));
  assert.equal(mapped.status, 400);
  assert.equal(mapped.body.title, 'Validation Failed');
  assert.equal(mapped.body.detail, 'bad body');
});

test('AuthError serializes to 401 JSON', () => {
  const mapped = serializeAppError(new AuthError('Invalid email or password.'));
  assert.equal(mapped.status, 401);
  assert.equal(mapped.body.title, 'Unauthorized');
});

test('ForbiddenError serializes to 403 JSON', () => {
  const mapped = serializeAppError(new ForbiddenError());
  assert.equal(mapped.status, 403);
  assert.equal(mapped.body.title, 'Forbidden');
});

test('NotFoundError serializes to 404 JSON', () => {
  const mapped = serializeAppError(new NotFoundError('Application missing'));
  assert.equal(mapped.status, 404);
  assert.equal(mapped.body.title, 'Not Found');
  assert.match(mapped.body.detail, /missing/);
});

test('ConflictError serializes to 409 JSON', () => {
  const mapped = serializeAppError(new ConflictError('Email already registered'));
  assert.equal(mapped.status, 409);
  assert.equal(mapped.body.title, 'Conflict');
});

test('ZodError serializes to 400 with issue messages', () => {
  const parsed = z.object({ email: z.string().email() }).safeParse({ email: 'nope' });
  assert.equal(parsed.success, false);
  const mapped = serializeAppError(parsed.error);
  assert.equal(mapped.status, 400);
  assert.equal(mapped.body.title, 'Validation Failed');
  assert.ok(mapped.body.issues.some((issue) => issue.path === 'email'));
});
