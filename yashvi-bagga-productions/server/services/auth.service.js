import { AuthError } from '../types/errors.js';
import { logger } from '../lib/logger.js';
import { getEnv } from '../config/env.js';
import { signAccessToken } from '../lib/jwt.js';
import { hashPassword, verifyPassword } from '../lib/password.js';
import { findUserByEmail, insertUser, publicUser } from '../repositories/users.repository.js';

export function ensureDefaultAdmin() {
  const env = getEnv();
  if (findUserByEmail(env.ADMIN_EMAIL)) return;
  insertUser({
    email: env.ADMIN_EMAIL,
    passwordHash: hashPassword(env.ADMIN_PASSWORD),
    role: 'Admin',
  });
}

/**
 * Authenticate an admin and issue a signed access token.
 * @param {{ email: string, password: string }} credentials
 */
export function loginAdmin(credentials) {
  ensureDefaultAdmin();
  const user = findUserByEmail(credentials.email);
  if (!user || !verifyPassword(credentials.password, user.passwordHash)) {
    throw new AuthError();
  }

  const env = getEnv();
  const accessToken = signAccessToken(
    { sub: user.id, email: user.email, role: user.role },
    { secret: env.JWT_SECRET, expiresInSeconds: env.JWT_EXPIRES_SECONDS },
  );

  logger.info({ email: user.email }, 'admin.login_success');
  return {
    accessToken,
    tokenType: 'Bearer',
    expiresIn: env.JWT_EXPIRES_SECONDS,
    user: publicUser(user),
  };
}
