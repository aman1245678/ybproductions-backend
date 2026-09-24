import test from 'node:test';
import assert from 'node:assert/strict';
import {
  NotFoundError,
  ValidationError,
  serializeAppError,
} from '../yashvi-bagga-productions/server/errors/app-error.js';

test('root suite: AppError subtypes expose HTTP status and JSON title', () => {
  const invalid = serializeAppError(new ValidationError('bad'));
  assert.equal(invalid.status, 400);
  assert.equal(invalid.body.title, 'Validation Failed');
  const missing = serializeAppError(new NotFoundError('gone'));
  assert.equal(missing.status, 404);
  assert.equal(missing.body.title, 'Not Found');
});
