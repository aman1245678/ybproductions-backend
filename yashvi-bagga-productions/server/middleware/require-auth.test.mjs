import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import request from 'supertest';
import { requireAuth, requireRole } from './require-auth.js';
import { errorHandler } from './error-handler.js';
import { signAccessToken } from '../lib/jwt.js';
import { getEnv, resetEnvCache } from '../config/env.js';

function appWithAuth() {
  resetEnvCache();
  const app = express();
  app.get('/me', requireAuth, (req, res) => res.json({ email: req.auth.email }));
  app.get('/admin-only', requireAuth, requireRole('Admin'), (_req, res) => res.json({ ok: true }));
  app.use(errorHandler);
  return app;
}

test('requireAuth accepts a valid bearer token', async () => {
  const token = signAccessToken(
    { sub: 'u1', email: 'admin@example.com', role: 'Admin' },
    { secret: getEnv().JWT_SECRET },
  );
  const res = await request(appWithAuth()).get('/me').set('Authorization', `Bearer ${token}`);
  assert.equal(res.status, 200);
  assert.equal(res.body.email, 'admin@example.com');
});

test('requireAuth rejects a missing token', async () => {
  const res = await request(appWithAuth()).get('/me');
  assert.equal(res.status, 401);
});

test('requireRole rejects a non-admin token', async () => {
  const token = signAccessToken(
    { sub: 'u2', email: 'staff@example.com', role: 'Staff' },
    { secret: getEnv().JWT_SECRET },
  );
  const res = await request(appWithAuth())
    .get('/admin-only')
    .set('Authorization', `Bearer ${token}`);
  assert.equal(res.status, 403);
});
