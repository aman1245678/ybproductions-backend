export function getHealth() {
  return {
    status: 'Healthy',
    service: 'ybproductions-web',
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  };
}
