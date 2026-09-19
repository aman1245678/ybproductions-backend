import { createHostApp, logger } from '../server/app.js';

const port = Number(process.env.PORT) || 4000;
const app = createHostApp();

app.listen(port, '0.0.0.0', () => {
  logger.info({ port }, 'web_host_listening');
});
