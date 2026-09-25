import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createHostApp } from '../app.js';
import { configureStore, resetStore } from '../db/store.js';
import { resetEnvCache } from '../config/env.js';

async function login(app) {
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'admin@example.com', password: 'change-me-in-local-env' });
  assert.equal(res.status, 200);
  return res.body.accessToken;
}

test('GET /api/v1/users/me returns the authenticated admin', async () => {
  resetEnvCache();
  configureStore({ driver: 'memory' });
  resetStore();
  const app = createHostApp({ skipStatic: true });
  const token = await login(app);
  const res = await request(app).get('/api/v1/users/me').set('Authorization', `Bearer ${token}`);
  assert.equal(res.status, 200);
  assert.equal(res.body.email, 'admin@example.com');
  assert.equal(res.body.role, 'Admin');
});

test('POST /api/v1/users creates a staff user for an admin', async () => {
  resetEnvCache();
  configureStore({ driver: 'memory' });
  resetStore();
  const app = createHostApp({ skipStatic: true });
  const token = await login(app);
  const created = await request(app)
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .send({ email: 'staff@example.com', password: 'staff-pass', role: 'Staff' });
  assert.equal(created.status, 201);
  assert.equal(created.body.email, 'staff@example.com');
  const list = await request(app).get('/api/v1/users').set('Authorization', `Bearer ${token}`);
  assert.equal(list.status, 200);
  assert.ok(list.body.total >= 2);
  assert.ok(Array.isArray(list.body.items));
});

test('GET /api/v1/users without a token is 401', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app).get('/api/v1/users');
  assert.equal(res.status, 401);
});
