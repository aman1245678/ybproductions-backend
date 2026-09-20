import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createHostApp } from '../app.js';

const validBody = {
  formType: 'CONTACT',
  contactName: 'Aman Sharma',
  contactEmail: 'aman@example.com',
  contactMobile: '9876543210',
  payload: { message: 'Hello' },
};

test('POST /api/v1/applications accepts a valid payload', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app).post('/api/v1/applications').send(validBody);
  assert.equal(res.status, 202);
  assert.equal(res.body.status, 'Received');
  assert.equal(res.body.formType, 'CONTACT');
  assert.match(res.body.applicationId, /^YBP-CONTACT-/);
});

test('POST /api/v1/applications rejects Zod validation failures', async () => {
  const app = createHostApp({ skipStatic: true });
  const res = await request(app)
    .post('/api/v1/applications')
    .send({ formType: 'CONTACT', contactName: '', contactEmail: 'not-an-email' });
  assert.equal(res.status, 400);
  assert.equal(res.body.title, 'Validation Failed');
  assert.ok(Array.isArray(res.body.issues));
  assert.ok(res.body.issues.length > 0);
});
