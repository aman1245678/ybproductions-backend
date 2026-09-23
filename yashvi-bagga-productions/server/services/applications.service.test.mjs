import test from 'node:test';
import assert from 'node:assert/strict';
import {
  changeApplicationStatus,
  getApplication,
  listAcceptedApplications,
  resetApplicationsStore,
  submitApplication,
} from './applications.service.js';
import { NotFoundError, ValidationError } from '../types/errors.js';
import { configureStore } from '../db/store.js';

test('submitApplication stores and returns an accepted record', () => {
  configureStore({ driver: 'memory' });
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
  configureStore({ driver: 'memory' });
  resetApplicationsStore();
  assert.throws(() => getApplication('YBP-MISSING-1'), NotFoundError);
});

test('changeApplicationStatus updates a known record and rejects bad status', () => {
  configureStore({ driver: 'memory' });
  resetApplicationsStore();
  const created = submitApplication({
    formType: 'CONTACT',
    contactName: 'Aman Sharma',
    contactEmail: 'aman@example.com',
  });
  const updated = changeApplicationStatus(created.applicationId, { status: 'Reviewed' });
  assert.equal(updated.status, 'Reviewed');
  assert.equal(listAcceptedApplications({ status: 'Reviewed' }).total, 1);
  assert.throws(
    () => changeApplicationStatus(created.applicationId, { status: 'Nope' }),
    ValidationError,
  );
});
