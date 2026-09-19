import test from 'node:test';
import assert from 'node:assert/strict';
import { createLogger } from './logger.js';

test('createLogger returns a Pino logger with service base fields', () => {
  const log = createLogger({ level: 'silent' });
  assert.equal(typeof log.info, 'function');
  assert.equal(typeof log.error, 'function');
  assert.equal(log.bindings().service, 'ybproductions-web');
});
