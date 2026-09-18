import { Injectable, inject } from '@angular/core';
import { LoggerService } from './logger.service';

/**
 * Lightweight error-tracking facade. When a Sentry DSN is configured on the
 * Express host, server-side exceptions go to Sentry; the browser reports
 * structured error logs that can be forwarded by the same pipeline.
 */
@Injectable({ providedIn: 'root' })
export class ErrorTrackingService {
  private readonly logger = inject(LoggerService);

  captureException(error: unknown, context?: Record<string, unknown>): void {
    const err = error instanceof Error ? error : new Error(String(error));
    this.logger.error('captured_exception', {
      name: err.name,
      message: err.message,
      ...context,
    });
  }
}
