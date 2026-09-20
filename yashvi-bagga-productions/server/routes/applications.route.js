import { Router } from 'express';
import { parseSubmitApplication } from '../lib/application.schema.js';
import { ok } from '../lib/errors.js';
import { logger } from '../lib/logger.js';

/**
 * In-host application intake (validates with Zod, returns Accepted).
 * Production CRM may still live on Azure; this route proves the Express API surface.
 */
export function createApplicationsRouter() {
  const router = Router();

  router.post('/', (req, res, next) => {
    try {
      const input = parseSubmitApplication(req.body);
      const applicationId = `YBP-${input.formType}-${Date.now()}`;
      logger.info(
        { formType: input.formType, applicationId },
        'application.accepted',
      );
      const result = ok({
        message: 'Application accepted',
        applicationId,
        status: 'Received',
        formType: input.formType,
        title: input.formType,
      });
      res.status(202).json(result.value);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
