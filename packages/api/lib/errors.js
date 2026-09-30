/**
 * Typed application errors for the Express host.
 * Route handlers throw AppError (or ZodError); error middleware maps them to JSON.
 */

export class AppError extends Error {
  /**
   * @param {number} status
   * @param {string} title
   * @param {string} [detail]
   * @param {unknown} [issues]
   */
  constructor(status, title, detail = title, issues) {
    super(detail);
    this.name = 'AppError';
    this.status = status;
    this.title = title;
    this.detail = detail;
    this.issues = issues;
  }
}

/**
 * @template T
 * @param {T} value
 * @returns {{ ok: true, value: T }}
 */
export function ok(value) {
  return { ok: true, value };
}

/**
 * @param {AppError} error
 * @returns {{ ok: false, error: AppError }}
 */
export function err(error) {
  return { ok: false, error };
}

/**
 * @param {unknown} error
 * @returns {{ status: number, body: Record<string, unknown> }}
 */
export function toErrorResponse(error) {
  if (error?.name === 'ZodError') {
    return {
      status: 400,
      body: {
        status: 'Invalid',
        title: 'Validation Failed',
        detail: 'Request body failed schema validation',
        issues: error.issues?.map((i) => ({
          path: Array.isArray(i.path) ? i.path.join('.') : String(i.path ?? ''),
          message: i.message,
        })),
      },
    };
  }

  if (error instanceof AppError) {
    return {
      status: error.status,
      body: {
        status: error.status >= 500 ? 'Unhealthy' : 'Rejected',
        title: error.title,
        detail: error.detail,
        ...(error.issues ? { issues: error.issues } : {}),
      },
    };
  }

  return {
    status: 500,
    body: {
      status: 'Unhealthy',
      title: 'Internal Server Error',
      detail: error?.message || 'Unexpected error',
    },
  };
}
