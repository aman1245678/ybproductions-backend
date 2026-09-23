import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createHostApp } from '../app.js';

test('GET /health returns Healthy JSON', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app).get('/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'Healthy');
  assert.equal(res.body.service, 'ybproductions-api');
  assert.equal(typeof res.body.uptimeSeconds, 'number');
  assert.ok(res.body.timestamp);
});

test('GET /ready reports the memory store', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app).get('/ready');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'Ready');
  assert.equal(res.body.store, 'memory');
});

test('unknown path returns 404 when static hosting is skipped', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app).get('/does-not-exist');
  assert.equal(res.status, 404);
});
