import { getEnv } from '../config/env.js';
import { withStore } from '../db/store.js';

export function getHealth() {
  return {
    status: 'Healthy',
    service: 'ybproductions-api',
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  };
}

export function getReadiness() {
  const env = getEnv();
  const counts = withStore((snap) => ({
    applications: Object.keys(snap.applications).length,
    users: Object.keys(snap.users).length,
  }));
  return {
    status: 'Ready',
    service: 'ybproductions-api',
    store: env.STORE_DRIVER,
    counts,
    timestamp: new Date().toISOString(),
  };
}
