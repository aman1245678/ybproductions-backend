import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHealthRouter } from '../server/routes/health.route.js';
import { requestLogger } from '../server/middleware/request-logger.js';
import { errorHandler } from '../server/middleware/error-handler.js';
import { initErrorTracking } from '../server/observability/sentry.js';

const port = Number(process.env.PORT) || 4000;
const here = dirname(fileURLToPath(import.meta.url));
const browserDist = resolve(here, '../dist/yashvi-bagga-productions/browser');

initErrorTracking();

const app = express();
app.disable('x-powered-by');
app.use(requestLogger);
app.use('/health', createHealthRouter());
app.use(express.static(browserDist, { maxAge: '1y', index: false }));
app.get('*', (_req, res) => {
  res.sendFile(join(browserDist, 'index.html'));
});
app.use(errorHandler);

app.listen(port, '0.0.0.0', () => {
  console.log(JSON.stringify({ msg: 'web host listening', port, level: 'info' }));
});
