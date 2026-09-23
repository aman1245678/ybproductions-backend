import { AuthError, ForbiddenError } from '../types/errors.js';
import { getEnv } from '../config/env.js';
import { verifyAccessToken } from '../lib/jwt.js';

/**
 * Require a Bearer access token and attach `req.auth`.
 * @param {import('express').Request} req
 * @param {import('express').Response} _res
 * @param {import('express').NextFunction} next
 */
export function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new AuthError('Missing bearer token.');
    }
    req.auth = verifyAccessToken(token, { secret: getEnv().JWT_SECRET });
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * @param {...string} roles
 */
export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.auth) {
      next(new AuthError('Missing bearer token.'));
      return;
    }
    if (!roles.includes(req.auth.role)) {
      next(new ForbiddenError());
      return;
    }
    next();
  };
}
