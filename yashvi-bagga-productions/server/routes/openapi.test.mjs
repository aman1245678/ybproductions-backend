import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createHostApp } from '../app.js';
import { openApiDocument } from './openapi.route.js';

test('GET /api/v1/openapi.json describes login and applications', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app).get('/api/v1/openapi.json');
  assert.equal(res.status, 200);
  assert.equal(res.body.openapi, '3.0.3');
  assert.ok(res.body.paths['/api/v1/auth/login']);
  assert.ok(openApiDocument.paths['/api/v1/applications']);
});
