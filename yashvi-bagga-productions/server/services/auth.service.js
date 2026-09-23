import { AuthError } from '../types/errors.js';
import { logger } from '../lib/logger.js';

/**
 * Authenticate an admin using env-backed credentials.
 * @param {{ email: string, password: string }} credentials
 */
export function loginAdmin(credentials) {
  const expectedEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD || 'change-me-in-local-env';

  if (
    credentials.email.toLowerCase() !== expectedEmail ||
    credentials.password !== expectedPassword
  ) {
    throw new AuthError();
  }

  logger.info({ email: credentials.email }, 'admin.login_success');
  return {
    accessToken: `demo.${Buffer.from(credentials.email).toString('base64url')}`,
    refreshToken: 'demo-refresh',
    user: { email: credentials.email, role: 'Admin' },
  };
}
