/** Shared constants + presentation helpers for the admin CRM screens. */

export const APPLICATION_STATUSES = [
  'Received',
  'UnderReview',
  'Contacted',
  'InProgress',
  'Closed',
  'Rejected',
] as const;

export const USER_STATUSES = ['Active', 'Invited', 'Suspended', 'Deactivated'] as const;

export const ROLE_OPTIONS = [
  'Admin',
  'HR',
  'Recruiter',
  'Talent',
  'MediaProfessional',
  'Client',
  'Trainer',
] as const;

const STATUS_LABELS: Record<string, string> = {
  Received: 'New',
  UnderReview: 'Under review',
  Contacted: 'Contacted',
  InProgress: 'In progress',
  Closed: 'Closed',
  Rejected: 'Rejected',
};

const STATUS_CLASSES: Record<string, string> = {
  Received: 'bg-sky-500/12 text-sky-300 ring-sky-400/25',
  UnderReview: 'bg-amber-500/12 text-amber-300 ring-amber-400/25',
  Contacted: 'bg-violet-500/12 text-violet-300 ring-violet-400/25',
  InProgress: 'bg-brand-gold/12 text-brand-gold ring-brand-gold/30',
  Closed: 'bg-emerald-500/12 text-emerald-300 ring-emerald-400/25',
  Rejected: 'bg-rose-500/12 text-rose-300 ring-rose-400/25',
};

const USER_STATUS_CLASSES: Record<string, string> = {
  Active: 'bg-emerald-500/12 text-emerald-300 ring-emerald-400/25',
  Invited: 'bg-sky-500/12 text-sky-300 ring-sky-400/25',
  Suspended: 'bg-amber-500/12 text-amber-300 ring-amber-400/25',
  Deactivated: 'bg-white/5 text-brand-white/50 ring-white/10',
};

export function statusLabel(status: string): string {
  return STATUS_LABELS[status] || status;
}

export function statusChip(status: string): string {
  return STATUS_CLASSES[status] || 'bg-white/5 text-brand-white/60 ring-white/10';
}

export function userStatusChip(status: string): string {
  return USER_STATUS_CLASSES[status] || 'bg-white/5 text-brand-white/60 ring-white/10';
}

export function initials(name: string | null | undefined): string {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

/** "auditionVideo" / "audition_video" → "Audition video". */
export function humanizeKey(key: string): string {
  const spaced = key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

export interface PayloadField {
  label: string;
  value: string;
}

export interface PayloadAttachment {
  label: string;
  name: string;
  url: string;
  kind: string;
}

interface FileLike {
  name?: string;
  url?: string;
  kind?: string;
  mimeType?: string;
}

function isFileLike(value: unknown): value is FileLike {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj['url'] === 'string' && typeof obj['name'] === 'string';
}

function isEmpty(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  );
}

function scalarToText(value: unknown): string {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) return value.map((v) => scalarToText(v)).join(', ');
  return String(value);
}

/** Splits a submission payload into readable field rows and downloadable files. */
export function readPayload(payload: Record<string, unknown> | null | undefined): {
  fields: PayloadField[];
  attachments: PayloadAttachment[];
} {
  const fields: PayloadField[] = [];
  const attachments: PayloadAttachment[] = [];

  const walk = (value: unknown, path: string[]): void => {
    if (isEmpty(value)) return;

    if (isFileLike(value)) {
      attachments.push({
        label: humanizeKey(path[path.length - 1] || 'File'),
        name: value.name || 'Attachment',
        url: value.url as string,
        kind: (value.kind || value.mimeType || 'file') as string,
      });
      return;
    }

    if (Array.isArray(value)) {
      if (value.every((v) => typeof v !== 'object' || v === null)) {
        fields.push({ label: labelFor(path), value: scalarToText(value) });
        return;
      }
      value.forEach((item) => walk(item, path));
      return;
    }

    if (typeof value === 'object') {
      Object.entries(value as Record<string, unknown>).forEach(([k, v]) => walk(v, [...path, k]));
      return;
    }

    fields.push({ label: labelFor(path), value: scalarToText(value) });
  };

  walk(payload || {}, []);
  return { fields, attachments };
}

function labelFor(path: string[]): string {
  const last = path[path.length - 1] || 'Value';
  return humanizeKey(last);
}

/**
 * Builds a gap-free daily series (days without submissions come back as 0) and
 * scales each count to a 0–100 bar height.
 */
export function toBars(
  trend: { day: string; count: number }[],
  days = 14,
): { day: string; count: number; height: number }[] {
  const counts = new Map(trend.map((t) => [t.day, t.count]));
  const series: { day: string; count: number }[] = [];
  // Days are keyed in UTC to match how the API buckets them.
  const cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);
  cursor.setUTCDate(cursor.getUTCDate() - (days - 1));

  for (let i = 0; i < days; i += 1) {
    const key = cursor.toISOString().slice(0, 10);
    series.push({ day: key, count: counts.get(key) ?? 0 });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  const max = Math.max(1, ...series.map((t) => t.count));
  return series.map((t) => ({ ...t, height: Math.round((t.count / max) * 100) }));
}
