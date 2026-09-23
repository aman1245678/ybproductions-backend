import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getEnv } from './config/env.js';
import { configureStore } from './db/store.js';
import { createHealthRouter, createReadyRouter } from './routes/health.route.js';
import { createApplicationsRouter } from './routes/applications.route.js';
import { createAuthRouter } from './routes/auth.route.js';
import { createUsersRouter } from './routes/users.route.js';
import { createMetricsRouter } from './routes/metrics.route.js';
import { createOpenApiRouter } from './routes/openapi.route.js';
import { requestLogger } from './middleware/request-logger.js';
import { requestId } from './middleware/request-id.js';
import { createRateLimiter } from './middleware/rate-limit.js';
import { errorHandler } from './middleware/error-handler.js';
import { initErrorTracking } from './observability/sentry.js';
import { recordRequest, recordError } from './services/metrics.service.js';
import { ensureDefaultAdmin } from './services/auth.service.js';
import { logger } from './lib/logger.js';

/**
 * Build the Express API host without binding a port (testable).
 * @param {{ browserDist?: string, skipStatic?: boolean }} [options]
 */
export function createHostApp(options = {}) {
  const env = getEnv();
  configureStore({ driver: env.STORE_DRIVER, dataDir: env.DATA_DIR });
  ensureDefaultAdmin();
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
  app.use('/ready', createReadyRouter());
  app.use('/metrics', createMetricsRouter());
  app.use('/api/v1', createRateLimiter({ windowMs: 60_000, max: 300 }));
  app.use('/api/v1/openapi.json', createOpenApiRouter());
  app.use('/api/v1/applications', createApplicationsRouter());
  app.use('/api/v1/auth', createAuthRouter());
  app.use('/api/v1/users', createUsersRouter());

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
