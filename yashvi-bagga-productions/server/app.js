import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHealthRouter } from './routes/health.route.js';
import { createApplicationsRouter } from './routes/applications.route.js';
import { createAuthRouter } from './routes/auth.route.js';
import { createMetricsRouter } from './routes/metrics.route.js';
import { requestLogger } from './middleware/request-logger.js';
import { requestId } from './middleware/request-id.js';
import { createRateLimiter } from './middleware/rate-limit.js';
import { errorHandler } from './middleware/error-handler.js';
import { initErrorTracking } from './observability/sentry.js';
import { recordRequest, recordError } from './services/metrics.service.js';
import { logger } from './lib/logger.js';

/**
 * Build the Express production host without binding a port (testable).
 * @param {{ browserDist?: string, skipStatic?: boolean }} [options]
 */
export function createHostApp(options = {}) {
  initErrorTracking();
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '1mb' }));
  app.use(requestId);
  app.use((req, res, next) => {
    recordRequest();
    res.on('finish', () => {
      if (res.statusCode >= 500) recordError();
    });
    next();
  });
  app.use(requestLogger);
  app.use('/health', createHealthRouter());
  app.use('/metrics', createMetricsRouter());
  app.use('/api/v1', createRateLimiter({ windowMs: 60_000, max: 300 }));
  app.use('/api/v1/applications', createApplicationsRouter());
  app.use('/api/v1/auth', createAuthRouter());

  if (!options.skipStatic) {
    const here = dirname(fileURLToPath(import.meta.url));
    const browserDist =
      options.browserDist || resolve(here, '../dist/yashvi-bagga-productions/browser');
    app.use(express.static(browserDist, { maxAge: '1y', index: false }));
    app.get('*', (_req, res) => {
      res.sendFile(join(browserDist, 'index.html'));
    });
  } else {
    app.use((_req, res) => {
      res.status(404).json({
        status: 'NotFound',
        title: 'Not Found',
        detail: 'No route matched this request',
      });
    });
  }

  app.use(errorHandler);
  return app;
}

export { logger };
