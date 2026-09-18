import { FormControl } from '@angular/forms';
import { indianMobileValidator, normalizeIndianMobile } from './form.validators';

describe('indianMobileValidator', () => {
  const validate = indianMobileValidator();

  it('allows empty values so it can pair with Validators.required', () => {
    expect(validate(new FormControl(''))).toBeNull();
    expect(validate(new FormControl(null))).toBeNull();
    expect(validate(new FormControl('   '))).toBeNull();
  });

  it('accepts a 10-digit number starting with 6-9', () => {
    expect(validate(new FormControl('9876543210'))).toBeNull();
    expect(validate(new FormControl('6123456789'))).toBeNull();
  });

  it('accepts +91, 91 and 0 prefixes with optional spaces or dashes', () => {
    expect(validate(new FormControl('+91 98765-43210'))).toBeNull();
    expect(validate(new FormControl('919876543210'))).toBeNull();
    expect(validate(new FormControl('09876543210'))).toBeNull();
  });

  it('rejects numbers that do not start with 6-9 or are the wrong length', () => {
    expect(validate(new FormControl('5876543210'))).toEqual({ indianMobile: true });
    expect(validate(new FormControl('987654321'))).toEqual({ indianMobile: true });
    expect(validate(new FormControl('abcdefghij'))).toEqual({ indianMobile: true });
  });
});

describe('normalizeIndianMobile', () => {
  it('returns the 10-digit form for valid Indian numbers', () => {
    expect(normalizeIndianMobile('9876543210')).toBe('9876543210');
    expect(normalizeIndianMobile('+91 9876543210')).toBe('9876543210');
    expect(normalizeIndianMobile('09876543210')).toBe('9876543210');
  });

  it('returns null for empty or unparseable values', () => {
    expect(normalizeIndianMobile('')).toBeNull();
    expect(normalizeIndianMobile(null)).toBeNull();
    expect(normalizeIndianMobile('12345')).toBeNull();
  });
});
