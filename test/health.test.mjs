import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createHostApp } from '../packages/api/app.js';

test('GET /health returns Healthy JSON for the API service', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app).get('/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'Healthy');
  assert.equal(res.body.service, 'ybproductions-api');
  assert.equal(typeof res.body.uptimeSeconds, 'number');
});

test('GET /ready returns store readiness counters', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app).get('/ready');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'Ready');
  assert.ok(['memory', 'file'].includes(res.body.store));
  assert.equal(typeof res.body.counts.applications, 'number');
  assert.equal(typeof res.body.counts.users, 'number');
});

test('GET /metrics exposes request and error counters', async () => {
  const app = createHostApp({ skipStatic: true });
  await request(app).get('/health');
  const res = await request(app).get('/metrics');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
  assert.equal(typeof res.body.requests, 'number');
  assert.ok(res.body.requests >= 1);
  assert.equal(typeof res.body.errors, 'number');
});

test('GET /api/v1/openapi.json documents auth and applications', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app).get('/api/v1/openapi.json');
  assert.equal(res.status, 200);
  assert.equal(res.body.openapi, '3.0.3');
  assert.ok(res.body.paths['/api/v1/auth/login']);
  assert.ok(res.body.paths['/api/v1/applications']);
});
