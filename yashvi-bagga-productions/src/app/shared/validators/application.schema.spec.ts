import { parseSubmitApplication } from './application.schema';

describe('parseSubmitApplication', () => {
  const valid = {
    formType: 'BRANDING' as const,
    contactName: 'Aman',
    contactEmail: 'aman@example.com',
    contactMobile: '+91 9876543210',
  };

  it('accepts a well-formed website application and defaults source', () => {
    const parsed = parseSubmitApplication(valid);
    expect(parsed.source).toBe('WEBSITE');
    expect(parsed.contactMobile).toBe('9876543210');
    expect(parsed.payload).toEqual({});
  });

  it('rejects an invalid email', () => {
    expect(() => parseSubmitApplication({ ...valid, contactEmail: 'not-an-email' })).toThrow();
  });

  it('rejects an unknown form type', () => {
    expect(() => parseSubmitApplication({ ...valid, formType: 'UNKNOWN' })).toThrow();
  });

  it('rejects a blank name', () => {
    expect(() => parseSubmitApplication({ ...valid, contactName: '  ' })).toThrow();
  });
});
