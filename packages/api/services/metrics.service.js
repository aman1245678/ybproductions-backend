const startedAt = Date.now();
let requestCount = 0;
let errorCount = 0;

export function recordRequest() {
  requestCount += 1;
}

export function recordError() {
  errorCount += 1;
}

export function getMetricsSnapshot() {
  return {
    status: 'ok',
    service: 'ybproductions-web',
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
    requests: requestCount,
    errors: errorCount,
    timestamp: new Date().toISOString(),
  };
}

/** Test helper to reset counters between cases. */
export function __resetMetricsForTests() {
  requestCount = 0;
  errorCount = 0;
}
