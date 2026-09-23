import { Router } from 'express';
import { getHealth, getReadiness } from '../services/health.service.js';

export function createHealthRouter() {
  const router = Router();
  router.get('/', (_req, res) => {
    res.json(getHealth());
  });
  return router;
}

export function createReadyRouter() {
  const router = Router();
  router.get('/', (_req, res) => {
    res.json(getReadiness());
  });
  return router;
}
