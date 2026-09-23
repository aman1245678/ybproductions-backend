import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getApplication,
  resetApplicationsStore,
  submitApplication,
} from './applications.service.js';
import { NotFoundError } from '../types/errors.js';

test('submitApplication stores and returns an accepted record', () => {
  resetApplicationsStore();
  const record = submitApplication({
    formType: 'CONTACT',
    contactName: 'Aman Sharma',
    contactEmail: 'aman@example.com',
    contactMobile: '9876543210',
    payload: { message: 'Hello' },
  });
  assert.equal(record.status, 'Received');
  assert.equal(record.formType, 'CONTACT');
  assert.match(record.applicationId, /^YBP-CONTACT-/);
  assert.deepEqual(getApplication(record.applicationId), record);
});

test('getApplication throws NotFoundError for unknown ids', () => {
  resetApplicationsStore();
  assert.throws(() => getApplication('YBP-MISSING-1'), NotFoundError);
});
