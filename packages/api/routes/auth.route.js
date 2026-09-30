import { Router } from 'express';
import { z } from 'zod';
import { ok } from '../lib/errors.js';
import { loginAdmin } from '../services/auth.service.js';

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

/**
 * Auth routes — thin HTTP adapters over auth.service.
 */
export function createAuthRouter() {
  const router = Router();

  router.post('/login', (req, res, next) => {
    try {
      const body = loginSchema.parse(req.body);
      const session = loginAdmin(body);
      res.status(200).json(ok(session).value);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
