import pino from 'pino';

/**
 * Structured logger for the Express production host (Pino).
 * LOG_LEVEL defaults to info; set to debug locally when needed.
 */
export function createLogger(options = {}) {
  return pino({
    level: process.env.LOG_LEVEL || 'info',
    base: { service: 'ybproductions-web' },
    ...options,
  });
}

export const logger = createLogger();
