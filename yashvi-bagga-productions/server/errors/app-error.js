import { toErrorResponse } from '../lib/errors.js';
import {
  AuthError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from '../types/errors.js';

export {
  AuthError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
};

/**
 * Serialize a discriminated AppError (or ZodError) to the HTTP JSON contract.
 * @param {unknown} error
 */
export function serializeAppError(error) {
  return toErrorResponse(error);
}
