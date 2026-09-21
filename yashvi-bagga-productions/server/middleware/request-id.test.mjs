import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import request from 'supertest';
import { requestId } from './request-id.js';

test('requestId middleware sets x-request-id header', async () => {
  const app = express();
  app.use(requestId);
  app.get('/ping', (_req, res) => res.status(200).json({ ok: true }));
  const res = await request(app).get('/ping');
  assert.equal(res.status, 200);
  assert.ok(res.headers['x-request-id']);
});

test('requestId middleware honors inbound x-request-id', async () => {
  const app = express();
  app.use(requestId);
  app.get('/ping', (_req, res) => res.status(200).json({ ok: true }));
  const res = await request(app).get('/ping').set('x-request-id', 'fixed-id-123');
  assert.equal(res.headers['x-request-id'], 'fixed-id-123');
});
