import { randomUUID } from 'node:crypto';

/** Attach a stable request id for log correlation. */
export function requestId(req, res, next) {
  const id = req.headers['x-request-id'] || randomUUID();
  req.requestId = id;
  res.setHeader('x-request-id', id);
  next();
}
