import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createHostApp } from '../yashvi-bagga-productions/server/app.js';
import { configureStore, resetStore } from '../yashvi-bagga-productions/server/db/store.js';
import { resetEnvCache } from '../yashvi-bagga-productions/server/config/env.js';

async function login(app) {
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'admin@example.com', password: 'change-me-in-local-env' });
  assert.equal(res.status, 200);
  return res.body.accessToken;
}

test('POST /api/v1/users rejects a missing email with 400 Validation Failed', async () => {
  resetEnvCache();
  configureStore({ driver: 'memory' });
  resetStore();
  const app = createHostApp({ skipStatic: true });
  const token = await login(app);
  const res = await request(app)
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .send({ password: 'staff-pass', role: 'Staff' });
  assert.equal(res.status, 400);
  assert.equal(res.body.title, 'Validation Failed');
});

test('POST /api/v1/users rejects an invalid role with 400 Validation Failed', async () => {
  resetEnvCache();
  configureStore({ driver: 'memory' });
  resetStore();
  const app = createHostApp({ skipStatic: true });
  const token = await login(app);
  const res = await request(app)
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .send({ email: 'ops@example.com', password: 'staff-pass', role: 'Superuser' });
  assert.equal(res.status, 400);
  assert.equal(res.body.title, 'Validation Failed');
});
