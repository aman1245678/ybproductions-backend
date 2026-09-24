import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createHostApp } from '../yashvi-bagga-productions/server/app.js';

const validBody = {
  formType: 'CONTACT',
  contactName: 'Aman Sharma',
  contactEmail: 'aman@example.com',
  contactMobile: '9876543210',
  payload: { message: 'Hello' },
};

test('root suite: POST /api/v1/applications returns 202 and GET fetches it', async () => {
  const app = createHostApp({ skipStatic: true });
  const created = await request(app).post('/api/v1/applications').send(validBody);
  assert.equal(created.status, 202);
  assert.match(created.body.applicationId, /^YBP-CONTACT-/);
  const fetched = await request(app).get(`/api/v1/applications/${created.body.applicationId}`);
  assert.equal(fetched.status, 200);
  assert.equal(fetched.body.status, 'Received');
});

test('root suite: POST /api/v1/applications invalid body is 400', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app).post('/api/v1/applications').send({ formType: 'CONTACT' });
  assert.equal(res.status, 400);
  assert.equal(res.body.title, 'Validation Failed');
});

test('root suite: GET missing application is 404', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app).get('/api/v1/applications/YBP-MISSING-1');
  assert.equal(res.status, 404);
  assert.equal(res.body.title, 'Not Found');
});
