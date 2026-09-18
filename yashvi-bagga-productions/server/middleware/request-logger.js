import pinoHttp from 'pino-http';
import { logger } from '../logging.js';

export const requestLogger = pinoHttp({ logger });
