import { createHmac, timingSafeEqual } from 'node:crypto';
import { AuthError } from '../types/errors.js';

function toBase64Url(value) {
  const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return buf.toString('base64url');
}

function sign(input, secret) {
  return createHmac('sha256', secret).update(input).digest('base64url');
}

function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/**
 * @param {{ sub: string, email: string, role: string }} claims
 * @param {{ secret: string, expiresInSeconds?: number, now?: number }} options
 */
export function signAccessToken(claims, options) {
  const now = options.now ?? Math.floor(Date.now() / 1000);
  const exp = now + (options.expiresInSeconds ?? 3600);
  const header = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = toBase64Url(JSON.stringify({ ...claims, iat: now, exp }));
  const body = `${header}.${payload}`;
  return `${body}.${sign(body, options.secret)}`;
}

/**
 * @param {string} token
 * @param {{ secret: string, now?: number }} options
 */
export function verifyAccessToken(token, options) {
  if (typeof token !== 'string' || token.split('.').length !== 3) {
    throw new AuthError('Invalid access token.');
  }
  const [header, payload, signature] = token.split('.');
  const body = `${header}.${payload}`;
  if (!safeEqual(signature, sign(body, options.secret))) {
    throw new AuthError('Invalid access token.');
  }
  /** @type {{ sub?: string, email?: string, role?: string, exp?: number }} */
  let claims;
  try {
    claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  } catch {
    throw new AuthError('Invalid access token.');
  }
  const now = options.now ?? Math.floor(Date.now() / 1000);
  if (!claims.exp || claims.exp <= now) {
    throw new AuthError('Access token expired.');
  }
  if (!claims.sub || !claims.email || !claims.role) {
    throw new AuthError('Invalid access token.');
  }
  return claims;
}
