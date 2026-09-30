import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

/**
 * @typedef {{
 *   applications: Record<string, Record<string, unknown>>,
 *   users: Record<string, Record<string, unknown>>,
 *   audit: Array<Record<string, unknown>>,
 * }} StoreSnapshot
 */

/** @returns {StoreSnapshot} */
function emptySnapshot() {
  return { applications: {}, users: {}, audit: [] };
}

function clone(value) {
  return structuredClone(value);
}

class MemoryStore {
  constructor() {
    this.snapshot = emptySnapshot();
  }

  load() {
    return clone(this.snapshot);
  }

  save(next) {
    this.snapshot = clone(next);
  }

  reset() {
    this.snapshot = emptySnapshot();
  }
}

class FileStore {
  /**
   * @param {string} filePath
   */
  constructor(filePath) {
    this.filePath = filePath;
  }

  load() {
    try {
      const raw = readFileSync(this.filePath, 'utf8');
      const parsed = JSON.parse(raw);
      return {
        applications: parsed.applications || {},
        users: parsed.users || {},
        audit: Array.isArray(parsed.audit) ? parsed.audit : [],
      };
    } catch {
      return emptySnapshot();
    }
  }

  save(next) {
    mkdirSync(dirname(this.filePath), { recursive: true });
    writeFileSync(this.filePath, JSON.stringify(next, null, 2));
  }

  reset() {
    this.save(emptySnapshot());
  }
}

/** @type {MemoryStore | FileStore} */
let driver = new MemoryStore();

/**
 * @param {{ driver?: 'memory' | 'file', dataDir?: string }} [options]
 */
export function configureStore(options = {}) {
  if (options.driver === 'file') {
    const filePath = join(options.dataDir || './data', 'store.json');
    driver = new FileStore(filePath);
    return;
  }
  driver = new MemoryStore();
}

export function getStoreDriver() {
  return driver;
}

export function resetStore() {
  driver.reset();
}

/**
 * @template T
 * @param {(snap: StoreSnapshot) => T} mutate
 */
export function withStore(mutate) {
  const snap = driver.load();
  const result = mutate(snap);
  driver.save(snap);
  return result;
}
