import test from 'node:test';
import assert from 'node:assert/strict';
import { AuthError, ConflictError, ForbiddenError, NotFoundError, ValidationError } from './errors.js';
import { toErrorResponse } from '../lib/errors.js';

test('ValidationError maps to 400 via toErrorResponse', () => {
  const error = new ValidationError('bad body', [{ path: 'email', message: 'required' }]);
  const mapped = toErrorResponse(error);
  assert.equal(mapped.status, 400);
  assert.equal(mapped.body.title, 'Validation Failed');
  assert.equal(error.code, 'VALIDATION_ERROR');
});

test('AuthError maps to 401 via toErrorResponse', () => {
  const error = new AuthError();
  const mapped = toErrorResponse(error);
  assert.equal(mapped.status, 401);
  assert.equal(mapped.body.title, 'Unauthorized');
  assert.equal(error.code, 'AUTH_ERROR');
});

test('NotFoundError maps to 404 via toErrorResponse', () => {
  const error = new NotFoundError('Application not found');
  const mapped = toErrorResponse(error);
  assert.equal(mapped.status, 404);
  assert.equal(mapped.body.title, 'Not Found');
  assert.equal(error.code, 'NOT_FOUND');
});

test('ForbiddenError maps to 403 via toErrorResponse', () => {
  const mapped = toErrorResponse(new ForbiddenError());
  assert.equal(mapped.status, 403);
  assert.equal(mapped.body.title, 'Forbidden');
});

test('ConflictError maps to 409 via toErrorResponse', () => {
  const mapped = toErrorResponse(new ConflictError('Email already registered'));
  assert.equal(mapped.status, 409);
  assert.equal(mapped.body.title, 'Conflict');
});
