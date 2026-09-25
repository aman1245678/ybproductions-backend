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

test('root suite: GET /api/v1/users/me requires a bearer token', async () => {
  const app = createHostApp({ skipStatic: true });
  const denied = await request(app).get('/api/v1/users/me');
  assert.equal(denied.status, 401);
});

test('root suite: admin can read /me and create a staff user', async () => {
  resetEnvCache();
  configureStore({ driver: 'memory' });
  resetStore();
  const app = createHostApp({ skipStatic: true });
  const token = await login(app);
  const me = await request(app).get('/api/v1/users/me').set('Authorization', `Bearer ${token}`);
  assert.equal(me.status, 200);
  assert.equal(me.body.email, 'admin@example.com');
  const created = await request(app)
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .send({ email: 'staff@example.com', password: 'staff-pass', role: 'Staff' });
  assert.equal(created.status, 201);
  assert.equal(created.body.role, 'Staff');
  const page = await request(app)
    .get('/api/v1/users?limit=1&offset=0')
    .set('Authorization', `Bearer ${token}`);
  assert.equal(page.status, 200);
  assert.ok(page.body.total >= 2);
  assert.equal(page.body.items.length, 1);
});
