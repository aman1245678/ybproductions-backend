import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getMetricsSnapshot,
  recordRequest,
  recordError,
  __resetMetricsForTests,
} from './metrics.service.js';

test('metrics snapshot starts healthy and counts requests/errors', () => {
  __resetMetricsForTests();
  recordRequest();
  recordRequest();
  recordError();
  const snap = getMetricsSnapshot();
  assert.equal(snap.status, 'ok');
  assert.equal(snap.service, 'ybproductions-web');
  assert.equal(snap.requests, 2);
  assert.equal(snap.errors, 1);
  assert.equal(typeof snap.uptimeSeconds, 'number');
});
