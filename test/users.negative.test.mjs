import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createHostApp } from '../packages/api/app.js';
import { configureStore, resetStore } from '../packages/api/db/store.js';
import { resetEnvCache } from '../packages/api/config/env.js';
import { signAccessToken } from '../packages/api/lib/jwt.js';
import { getEnv } from '../packages/api/config/env.js';

async function login(app) {
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'admin@example.com', password: 'change-me-in-local-env' });
  assert.equal(res.status, 200);
  return res.body.accessToken;
}

test('POST /api/v1/users without a token is 401', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app)
    .post('/api/v1/users')
    .send({ email: 'x@y.com', password: 'abcdef', role: 'Staff' });
  assert.equal(res.status, 401);
});

test('POST /api/v1/users with a Staff token is 403', async () => {
  resetEnvCache();
  configureStore({ driver: 'memory' });
  resetStore();
  const app = createHostApp({ skipStatic: true });
  const staffToken = signAccessToken(
    { sub: 'usr_staff', email: 'staff@example.com', role: 'Staff' },
    { secret: getEnv().JWT_SECRET },
  );
  const res = await request(app)
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${staffToken}`)
    .send({ email: 'new@example.com', password: 'abcdef', role: 'Staff' });
  assert.equal(res.status, 403);
  assert.equal(res.body.title, 'Forbidden');
});

test('POST /api/v1/users rejects a duplicate email with 409', async () => {
  resetEnvCache();
  configureStore({ driver: 'memory' });
  resetStore();
  const app = createHostApp({ skipStatic: true });
  const token = await login(app);
  const first = await request(app)
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .send({ email: 'dup@example.com', password: 'abcdef', role: 'Staff' });
  assert.equal(first.status, 201);
  const second = await request(app)
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .send({ email: 'dup@example.com', password: 'abcdef', role: 'Staff' });
  assert.equal(second.status, 409);
  assert.equal(second.body.title, 'Conflict');
});

test('POST /api/v1/users rejects a missing role-invalid password combo with 400', async () => {
  resetEnvCache();
  configureStore({ driver: 'memory' });
  resetStore();
  const app = createHostApp({ skipStatic: true });
  const token = await login(app);
  const res = await request(app)
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .send({ email: 'short@example.com', password: '123' });
  assert.equal(res.status, 400);
  assert.equal(res.body.title, 'Validation Failed');
});
