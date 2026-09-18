import { logger } from '../logging.js';
import { captureException } from '../observability/sentry.js';

export function errorHandler(err, _req, res, _next) {
  logger.error({ err }, 'unhandled_request_error');
  captureException(err);
  if (res.headersSent) return;
  res.status(500).json({
    status: 'Unhealthy',
    title: 'Internal Server Error',
    detail: err?.message || 'Unexpected error',
  });
}
