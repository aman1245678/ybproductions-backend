import { NotFoundError, ValidationError } from '../types/errors.js';
import { logger } from '../lib/logger.js';
import { resetStore } from '../db/store.js';
import {
  findApplication,
  insertApplication,
  listApplications,
  updateApplication,
} from '../repositories/applications.repository.js';

const STATUSES = new Set(['Received', 'Reviewed', 'Accepted', 'Rejected']);

/**
 * Persist a validated application intake payload and return the accepted record.
 * @param {{ formType: string, contactName: string, contactEmail: string, contactMobile?: string, payload?: unknown }} input
 */
export function submitApplication(input) {
  const record = insertApplication(input);
  logger.info({ formType: input.formType, applicationId: record.applicationId }, 'application.accepted');
  return record;
}

/**
 * @param {string} applicationId
 */
export function getApplication(applicationId) {
  const record = findApplication(applicationId);
  if (!record) {
    throw new NotFoundError(`Application ${applicationId} was not found`);
  }
  return record;
}

/**
 * @param {{ status?: string, formType?: string, limit?: number, offset?: number }} query
 */
export function listAcceptedApplications(query) {
  return listApplications(query);
}

/**
 * @param {string} applicationId
 * @param {{ status: string }} patch
 */
export function changeApplicationStatus(applicationId, patch) {
  if (!STATUSES.has(patch.status)) {
    throw new ValidationError(`status must be one of ${[...STATUSES].join(', ')}`);
  }
  const record = updateApplication(applicationId, { status: patch.status });
  if (!record) {
    throw new NotFoundError(`Application ${applicationId} was not found`);
  }
  logger.info({ applicationId, status: patch.status }, 'application.status_changed');
  return record;
}

/** Test helper — clears the in-memory store. */
export function resetApplicationsStore() {
  resetStore();
}
