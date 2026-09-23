import { randomUUID } from 'node:crypto';
import { withStore } from '../db/store.js';

/**
 * @param {Record<string, unknown>} input
 */
export function insertApplication(input) {
  const now = new Date().toISOString();
  const applicationId = `YBP-${input.formType}-${Date.now()}-${randomUUID().slice(0, 8)}`;
  const record = {
    applicationId,
    status: 'Received',
    formType: input.formType,
    title: input.formType,
    message: 'Application accepted',
    contactName: input.contactName,
    contactEmail: input.contactEmail,
    contactMobile: input.contactMobile || null,
    payload: input.payload || {},
    createdAt: now,
    updatedAt: now,
  };
  return withStore((snap) => {
    snap.applications[applicationId] = record;
    return { ...record };
  });
}

/**
 * @param {string} applicationId
 */
export function findApplication(applicationId) {
  return withStore((snap) => {
    const record = snap.applications[applicationId];
    return record ? { ...record } : null;
  });
}

/**
 * @param {{ status?: string, formType?: string, limit?: number, offset?: number }} [query]
 */
export function listApplications(query = {}) {
  return withStore((snap) => {
    let rows = Object.values(snap.applications);
    if (query.status) rows = rows.filter((row) => row.status === query.status);
    if (query.formType) rows = rows.filter((row) => row.formType === query.formType);
    rows.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    const total = rows.length;
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 50;
    return {
      total,
      items: rows.slice(offset, offset + limit).map((row) => ({ ...row })),
    };
  });
}

/**
 * @param {string} applicationId
 * @param {Record<string, unknown>} patch
 */
export function updateApplication(applicationId, patch) {
  return withStore((snap) => {
    const current = snap.applications[applicationId];
    if (!current) return null;
    const next = { ...current, ...patch, applicationId, updatedAt: new Date().toISOString() };
    snap.applications[applicationId] = next;
    return { ...next };
  });
}
