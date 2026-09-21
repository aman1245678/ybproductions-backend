import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createHostApp } from '../app.js';

test('GET /metrics returns service counters', async () => {
  const app = createHostApp({ skipStatic: true });
  await request(app).get('/health');
  const res = await request(app).get('/metrics');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
  assert.equal(res.body.service, 'ybproductions-web');
  assert.ok(res.body.requests >= 1);
});
