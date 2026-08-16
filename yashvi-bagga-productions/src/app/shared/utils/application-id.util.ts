/** Local Application ID until backend issues official IDs. */

const STORAGE_KEY = 'ybp_app_seq';

function nextSeq(type: string): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, number>) : {};
    const n = (map[type] ?? 0) + 1;
    map[type] = n;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    return n;
  } catch {
    return Math.floor(Math.random() * 9000) + 1000;
  }
}

/** Format: YBP-{TYPE}-{YEAR}-{SEQ} e.g. YBP-BRAND-2026-00012 */
export function generateApplicationId(type: string): string {
  const year = new Date().getFullYear();
  const seq = String(nextSeq(type)).padStart(5, '0');
  return `YBP-${type.toUpperCase()}-${year}-${seq}`;
}

export interface LocalApplicationRecord {
  id: string;
  type: string;
  title: string;
  payload: Record<string, unknown>;
  createdAt: string;
  status: 'Submitted';
}

const APPS_KEY = 'ybp_local_applications';

export function saveLocalApplication(record: LocalApplicationRecord): void {
  try {
    const raw = localStorage.getItem(APPS_KEY);
    const list: LocalApplicationRecord[] = raw ? JSON.parse(raw) : [];
    list.unshift(record);
    localStorage.setItem(APPS_KEY, JSON.stringify(list.slice(0, 50)));
  } catch {
    /* ignore */
  }
}

export function listLocalApplications(): LocalApplicationRecord[] {
  try {
    const raw = localStorage.getItem(APPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
