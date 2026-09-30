import test from 'node:test';
import assert from 'node:assert/strict';
import { getHealth, getReadiness } from './health.service.js';
import { configureStore, resetStore } from '../db/store.js';
import { resetEnvCache } from '../config/env.js';

test('getHealth reports a healthy API process', () => {
  const body = getHealth();
  assert.equal(body.status, 'Healthy');
  assert.equal(body.service, 'ybproductions-api');
});

test('getReadiness includes store driver and counters', () => {
  resetEnvCache();
  configureStore({ driver: 'memory' });
  resetStore();
  const body = getReadiness();
  assert.equal(body.status, 'Ready');
  assert.equal(body.store, 'memory');
  assert.equal(body.counts.applications, 0);
});
