import { Router } from 'express';
import { z } from 'zod';
import { AppError, ok } from '../lib/errors.js';
import { logger } from '../lib/logger.js';

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

/**
 * Minimal admin login endpoint for host-level auth shape tests.
 * Credentials come from env (ADMIN_EMAIL / ADMIN_PASSWORD) with safe local defaults.
 */
export function createAuthRouter() {
  const router = Router();

  router.post('/login', (req, res, next) => {
    try {
      const body = loginSchema.parse(req.body);
      const expectedEmail = (process.env.ADMIN_EMAIL || 'admin@ybproductions.local').toLowerCase();
      const expectedPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';

      if (
        body.email.toLowerCase() !== expectedEmail ||
        body.password !== expectedPassword
      ) {
        throw new AppError(401, 'Unauthorized', 'Invalid email or password.');
      }

      logger.info({ email: body.email }, 'admin.login_success');
      const result = ok({
        accessToken: `demo.${Buffer.from(body.email).toString('base64url')}`,
        refreshToken: 'demo-refresh',
        user: { email: body.email, role: 'Admin' },
      });
      res.status(200).json(result.value);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
