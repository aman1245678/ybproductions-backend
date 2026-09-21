import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSubmitApplication } from './application.schema.js';

test('parseSubmitApplication accepts a valid CONTACT payload', () => {
  const parsed = parseSubmitApplication({
    formType: 'CONTACT',
    contactName: 'Aman',
    contactEmail: 'aman@example.com',
  });
  assert.equal(parsed.formType, 'CONTACT');
  assert.equal(parsed.source, 'WEBSITE');
});

test('parseSubmitApplication throws ZodError for invalid email', () => {
  assert.throws(
    () =>
      parseSubmitApplication({
        formType: 'CONTACT',
        contactName: 'Aman',
        contactEmail: 'not-an-email',
      }),
    (err) => err?.name === 'ZodError',
  );
});
