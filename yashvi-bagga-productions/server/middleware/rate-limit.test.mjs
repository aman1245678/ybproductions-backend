import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import request from 'supertest';
import { createRateLimiter } from './rate-limit.js';
import { errorHandler } from './error-handler.js';

test('rate limiter allows requests under the max', async () => {
  const app = express();
  app.use(createRateLimiter({ windowMs: 60_000, max: 3 }));
  app.get('/x', (_req, res) => res.status(200).json({ ok: true }));
  app.use(errorHandler);
  const a = await request(app).get('/x');
  const b = await request(app).get('/x');
  assert.equal(a.status, 200);
  assert.equal(b.status, 200);
});

test('rate limiter returns 429 after exceeding max', async () => {
  const app = express();
  app.use(createRateLimiter({ windowMs: 60_000, max: 1 }));
  app.get('/x', (_req, res) => res.status(200).json({ ok: true }));
  app.use(errorHandler);
  await request(app).get('/x');
  const blocked = await request(app).get('/x');
  assert.equal(blocked.status, 429);
  assert.equal(blocked.body.title, 'Too Many Requests');
});
