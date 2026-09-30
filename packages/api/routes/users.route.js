import { Router } from 'express';
import { z } from 'zod';
import { ok } from '../lib/errors.js';
import { requireAuth, requireRole } from '../middleware/require-auth.js';
import { createUser, getCurrentUser, listDirectory } from '../services/users.service.js';

const createUserSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
  role: z.enum(['Admin', 'Staff']).optional(),
});

export function createUsersRouter() {
  const router = Router();

  router.get('/me', requireAuth, (req, res, next) => {
    try {
      res.status(200).json(ok(getCurrentUser(req.auth.sub)).value);
    } catch (error) {
      next(error);
    }
  });

  const listQuerySchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).optional(),
    offset: z.coerce.number().int().min(0).optional(),
  });

  router.get('/', requireAuth, requireRole('Admin'), (req, res, next) => {
    try {
      const query = listQuerySchema.parse(req.query);
      res.status(200).json(ok(listDirectory(req.auth, query)).value);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', requireAuth, requireRole('Admin'), (req, res, next) => {
    try {
      const body = createUserSchema.parse(req.body);
      res.status(201).json(ok(createUser(body, req.auth)).value);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
