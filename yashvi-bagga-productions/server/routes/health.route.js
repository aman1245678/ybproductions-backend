import { Router } from 'express';
import { getHealth } from '../services/health.service.js';

export function createHealthRouter() {
  const router = Router();
  router.get('/', (_req, res) => {
    res.json(getHealth());
  });
  return router;
}
