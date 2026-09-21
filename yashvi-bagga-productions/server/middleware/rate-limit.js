import { AppError } from '../lib/errors.js';

/**
 * Tiny fixed-window rate limiter for API routes.
 * @param {{ windowMs?: number, max?: number }} [options]
 */
export function createRateLimiter(options = {}) {
  const windowMs = options.windowMs ?? 60_000;
  const max = options.max ?? 120;
  /** @type {Map<string, { count: number, resetAt: number }>} */
  const buckets = new Map();

  return function rateLimiter(req, _res, next) {
    const key = req.ip || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();
    let bucket = buckets.get(key);
    if (!bucket || now >= bucket.resetAt) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(key, bucket);
    }
    bucket.count += 1;
    if (bucket.count > max) {
      return next(new AppError(429, 'Too Many Requests', 'Rate limit exceeded. Try again shortly.'));
    }
    return next();
  };
}
