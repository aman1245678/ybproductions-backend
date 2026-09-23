import { AppError } from '../lib/errors.js';

/**
 * Discriminated AppError subtypes used across route handlers and services.
 * @typedef {'VALIDATION_ERROR' | 'AUTH_ERROR' | 'NOT_FOUND' | 'FORBIDDEN' | 'CONFLICT'} AppErrorCode
 */

export class ValidationError extends AppError {
  /**
   * @param {string} [detail]
   * @param {unknown} [issues]
   */
  constructor(detail = 'Request body failed schema validation', issues) {
    super(400, 'Validation Failed', detail, issues);
    this.name = 'ValidationError';
    /** @type {AppErrorCode} */
    this.code = 'VALIDATION_ERROR';
  }
}

export class AuthError extends AppError {
  /**
   * @param {string} [detail]
   */
  constructor(detail = 'Invalid email or password.') {
    super(401, 'Unauthorized', detail);
    this.name = 'AuthError';
    /** @type {AppErrorCode} */
    this.code = 'AUTH_ERROR';
  }
}

export class NotFoundError extends AppError {
  /**
   * @param {string} [detail]
   */
  constructor(detail = 'Resource not found') {
    super(404, 'Not Found', detail);
    this.name = 'NotFoundError';
    /** @type {AppErrorCode} */
    this.code = 'NOT_FOUND';
  }
}

export class ForbiddenError extends AppError {
  /**
   * @param {string} [detail]
   */
  constructor(detail = 'Insufficient role for this resource') {
    super(403, 'Forbidden', detail);
    this.name = 'ForbiddenError';
    /** @type {AppErrorCode} */
    this.code = 'FORBIDDEN';
  }
}

export class ConflictError extends AppError {
  /**
   * @param {string} [detail]
   */
  constructor(detail = 'Resource already exists') {
    super(409, 'Conflict', detail);
    this.name = 'ConflictError';
    /** @type {AppErrorCode} */
    this.code = 'CONFLICT';
  }
}
