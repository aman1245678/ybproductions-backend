import { logger } from '../lib/logger.js';
import { captureException } from '../observability/sentry.js';
import { toErrorResponse } from '../lib/errors.js';

export function errorHandler(err, _req, res, _next) {
  const mapped = toErrorResponse(err);
  if (mapped.status >= 500) {
    logger.error({ err }, 'unhandled_request_error');
    captureException(err);
  } else {
    logger.warn({ err, status: mapped.status }, 'request_rejected');
  }
  if (res.headersSent) return;
  res.status(mapped.status).json(mapped.body);
}
