import * as Sentry from '@sentry/node';
import { logger } from '../lib/logger.js';

let enabled = false;

export function initErrorTracking() {
  const dsn = (process.env.SENTRY_DSN || '').trim();
  if (!dsn) {
    logger.info('error_tracking_disabled');
    return;
  }
  Sentry.init({ dsn, tracesSampleRate: 0.1 });
  enabled = true;
  logger.info('error_tracking_enabled');
}

export function captureException(err) {
  if (enabled) {
    Sentry.captureException(err);
  }
}
