import test from 'node:test';
import assert from 'node:assert/strict';
import { configureStore, resetStore } from '../db/store.js';
import {
  findApplication,
  insertApplication,
  listApplications,
  updateApplication,
} from './applications.repository.js';

test('insertApplication then findApplication returns the same id', () => {
  configureStore({ driver: 'memory' });
  resetStore();
  const created = insertApplication({
    formType: 'CONTACT',
    contactName: 'Aman',
    contactEmail: 'aman@example.com',
  });
  assert.match(created.applicationId, /^YBP-CONTACT-/);
  assert.equal(findApplication(created.applicationId).contactName, 'Aman');
});

test('listApplications filters by status and paginates', () => {
  configureStore({ driver: 'memory' });
  resetStore();
  const first = insertApplication({
    formType: 'CONTACT',
    contactName: 'One',
    contactEmail: 'one@example.com',
  });
  insertApplication({
    formType: 'BRANDING',
    contactName: 'Two',
    contactEmail: 'two@example.com',
  });
  updateApplication(first.applicationId, { status: 'Reviewed' });
  const reviewed = listApplications({ status: 'Reviewed' });
  assert.equal(reviewed.total, 1);
  const page = listApplications({ limit: 1, offset: 0 });
  assert.equal(page.items.length, 1);
  assert.equal(page.total, 2);
});

test('updateApplication returns null for unknown ids', () => {
  configureStore({ driver: 'memory' });
  resetStore();
  assert.equal(updateApplication('missing', { status: 'Reviewed' }), null);
});
