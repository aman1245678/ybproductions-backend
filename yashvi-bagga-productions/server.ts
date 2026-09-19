import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './src/main.server';
import { createHealthRouter } from './server/routes/health.route.js';
import { requestLogger } from './server/middleware/request-logger.js';
import { errorHandler } from './server/middleware/error-handler.js';
import { initErrorTracking } from './server/observability/sentry.js';
import { logger } from './server/lib/logger.js';

/**
 * Express host: request logging → health → static assets → Angular SSR → errors.
 */
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const commonEngine = new CommonEngine();

  server.disable('x-powered-by');
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  server.use(requestLogger);
  server.use('/health', createHealthRouter());

  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y',
  }));

  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  server.use(errorHandler);
  return server;
}

function run(): void {
  initErrorTracking();
  const port = Number(process.env['PORT']) || 4000;
  const server = app();
  server.listen(port, () => {
    logger.info({ port }, 'ssr_host_listening');
  });
}

run();
