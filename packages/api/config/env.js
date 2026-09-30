import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4200),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  ADMIN_EMAIL: z.string().trim().email().default('admin@example.com'),
  ADMIN_PASSWORD: z.string().min(6).default('change-me-in-local-env'),
  JWT_SECRET: z.string().min(16).default('local-dev-jwt-secret-change-me'),
  JWT_EXPIRES_SECONDS: z.coerce.number().int().min(60).default(3600),
  STORE_DRIVER: z.enum(['memory', 'file']).default('memory'),
  DATA_DIR: z.string().trim().min(1).default('./data'),
});

/**
 * Parse host configuration from process.env.
 * @param {NodeJS.ProcessEnv} [raw]
 */
export function loadEnv(raw = process.env) {
  return envSchema.parse({
    NODE_ENV: raw.NODE_ENV,
    PORT: raw.PORT,
    LOG_LEVEL: raw.LOG_LEVEL,
    ADMIN_EMAIL: raw.ADMIN_EMAIL,
    ADMIN_PASSWORD: raw.ADMIN_PASSWORD,
    JWT_SECRET: raw.JWT_SECRET,
    JWT_EXPIRES_SECONDS: raw.JWT_EXPIRES_SECONDS,
    STORE_DRIVER: raw.STORE_DRIVER,
    DATA_DIR: raw.DATA_DIR,
  });
}

/** @type {ReturnType<typeof loadEnv> | null} */
let cached = null;

export function getEnv() {
  if (!cached) cached = loadEnv();
  return cached;
}

/** Test helper */
export function resetEnvCache() {
  cached = null;
}
