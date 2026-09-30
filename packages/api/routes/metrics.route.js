import { Router } from 'express';
import { getMetricsSnapshot } from '../services/metrics.service.js';

export function createMetricsRouter() {
  const router = Router();
  router.get('/', (_req, res) => {
    res.status(200).json(getMetricsSnapshot());
  });
  return router;
}
