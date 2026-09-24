import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createHostApp } from '../yashvi-bagga-productions/server/app.js';
import { verifyAccessToken } from '../yashvi-bagga-productions/server/lib/jwt.js';
import { getEnv, resetEnvCache } from '../yashvi-bagga-productions/server/config/env.js';

test('root suite: login issues a verifiable JWT', async () => {
  resetEnvCache();
  const app = createHostApp({ skipStatic: true });
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'admin@example.com', password: 'change-me-in-local-env' });
  assert.equal(res.status, 200);
  assert.ok(res.body.accessToken);
  const claims = verifyAccessToken(res.body.accessToken, { secret: getEnv().JWT_SECRET });
  assert.equal(claims.email, 'admin@example.com');
  assert.equal(claims.role, 'Admin');
});

test('root suite: login rejects invalid credentials with 401', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'admin@example.com', password: 'wrong-password' });
  assert.equal(res.status, 401);
  assert.equal(res.body.title, 'Unauthorized');
});
