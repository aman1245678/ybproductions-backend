export const environment = {
  production: true,
  apiUrl: 'https://yb-api-d8eeaydha8esc4ex.centralindia-01.azurewebsites.net/api/v1',
  siteUrl: 'https://ybproductions.co.in',

  recaptcha: {
    enabled: true,
    version: 'v3' as 'v3' | 'v2',
    v3SiteKey: '',
    v2SiteKey: '',
    minScore: 0.5,
  },

  sms: {
    enabled: false,
    provider: 'MSG91' as 'TWILIO' | 'MSG91' | 'FAST2SMS',
    endpoint: '/notifications/sms',
    adminMobile: '',
    senderId: 'YBGPRO',
    retry: { attempts: 3, delayMs: 800 },
  },

  notifications: {
    sms: false,
    email: false,
    crm: false,
  },

  uploads: {
    mockMode: false,
  },

  /**
   * Backend OTP routes are not live yet — keep mockMode so join/casting
   * forms still complete; switch to false when /otp/* is deployed.
   */
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
