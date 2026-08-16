export const environment = {
  production: true,
  apiUrl: 'https://yb-api-d8eeaydha8esc4ex.centralindia-01.azurewebsites.net/api/v1',
  siteUrl: 'https://ybproductions.co.in',

  recaptcha: {
    enabled: false,
    version: 'v3' as 'v3' | 'v2',
    v3SiteKey: '',
    v2SiteKey: '',
    minScore: 0.5,
  },

  sms: {
    enabled: true,
    provider: 'MSG91' as 'TWILIO' | 'MSG91' | 'FAST2SMS',
    endpoint: '/notifications/sms',
    adminMobile: '8368595223',
    senderId: 'YBGPRO',
    retry: { attempts: 3, delayMs: 800 },
  },

  notifications: {
    sms: true,
    email: true,
    crm: false,
  },

  uploads: {
    mockMode: false,
  },

  otp: {
    enabled: true,
    mockMode: true,
    codeLength: 6,
    ttlSeconds: 300,
    resendCooldownSeconds: 60,
    maxResendAttempts: 3,
    maxVerifyAttempts: 5,
    email: { request: '/otp/email/request', verify: '/otp/email/verify' },
    mobile: { request: '/otp/mobile/request', verify: '/otp/mobile/verify' },
  },
};
