import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createHostApp } from '../app.js';

test('POST /api/v1/auth/login succeeds with default admin credentials', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'admin@example.com', password: 'change-me-in-local-env' });
  assert.equal(res.status, 200);
  assert.ok(res.body.accessToken);
  assert.equal(res.body.user.role, 'Admin');
});

test('POST /api/v1/auth/login returns 401 for bad credentials', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'admin@example.com', password: 'wrong-password' });
  assert.equal(res.status, 401);
  assert.equal(res.body.title, 'Unauthorized');
});

test('POST /api/v1/auth/login returns 400 for invalid body shape', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app).post('/api/v1/auth/login').send({ email: 'nope' });
  assert.equal(res.status, 400);
  assert.equal(res.body.title, 'Validation Failed');
});
