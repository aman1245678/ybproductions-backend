import { Router } from 'express';
import { z } from 'zod';
import { parseSubmitApplication } from '../lib/application.schema.js';
import { ok } from '../lib/errors.js';
import { requireAuth, requireRole } from '../middleware/require-auth.js';
import {
  changeApplicationStatus,
  getApplication,
  listAcceptedApplications,
  submitApplication,
} from '../services/applications.service.js';

const listQuerySchema = z.object({
  status: z.string().trim().optional(),
  formType: z.string().trim().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

const statusSchema = z.object({
  status: z.enum(['Received', 'Reviewed', 'Accepted', 'Rejected']),
});

/**
 * Application intake + admin review routes.
 */
export function createApplicationsRouter() {
  const router = Router();

  router.post('/', (req, res, next) => {
    try {
      const input = parseSubmitApplication(req.body);
      const record = submitApplication(input);
      res.status(202).json(ok(record).value);
    } catch (error) {
      next(error);
    }
  });

  router.get('/', requireAuth, requireRole('Admin'), (req, res, next) => {
    try {
      const query = listQuerySchema.parse(req.query);
      res.status(200).json(ok(listAcceptedApplications(query)).value);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:applicationId', (req, res, next) => {
    try {
      const record = getApplication(req.params.applicationId);
      res.status(200).json(ok(record).value);
    } catch (error) {
      next(error);
    }
  });

  router.patch('/:applicationId', requireAuth, requireRole('Admin'), (req, res, next) => {
    try {
      const patch = statusSchema.parse(req.body);
      const record = changeApplicationStatus(req.params.applicationId, patch);
      res.status(200).json(ok(record).value);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
