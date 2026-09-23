import { Router } from 'express';
import { parseSubmitApplication } from '../lib/application.schema.js';
import { ok } from '../lib/errors.js';
import { getApplication, submitApplication } from '../services/applications.service.js';

/**
 * Application intake routes — thin HTTP adapters over applications.service.
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

  router.get('/:applicationId', (req, res, next) => {
    try {
      const record = getApplication(req.params.applicationId);
      res.status(200).json(ok(record).value);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
