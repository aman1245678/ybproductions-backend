import { NotFoundError } from '../types/errors.js';
import { logger } from '../lib/logger.js';

/** @type {Map<string, Record<string, unknown>>} */
const applications = new Map();

/**
 * Persist a validated application intake payload and return the accepted record.
 * @param {{ formType: string, contactName: string, contactEmail: string, contactMobile: string, payload?: unknown }} input
 */
export function submitApplication(input) {
  const applicationId = `YBP-${input.formType}-${Date.now()}`;
  const record = {
    applicationId,
    status: 'Received',
    formType: input.formType,
    title: input.formType,
    message: 'Application accepted',
    contactName: input.contactName,
    contactEmail: input.contactEmail,
    createdAt: new Date().toISOString(),
  };
  applications.set(applicationId, record);
  logger.info({ formType: input.formType, applicationId }, 'application.accepted');
  return record;
}

/**
 * @param {string} applicationId
 */
export function getApplication(applicationId) {
  const record = applications.get(applicationId);
  if (!record) {
    throw new NotFoundError(`Application ${applicationId} was not found`);
  }
  return record;
}

/** Test helper — clears the in-memory store. */
export function resetApplicationsStore() {
  applications.clear();
}
