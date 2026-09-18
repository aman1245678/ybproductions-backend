import { simpleHash } from './hash.util';

describe('simpleHash', () => {
  it('is stable for the same input', () => {
    expect(simpleHash('hello')).toBe(simpleHash('hello'));
  });

  it('changes when the input changes', () => {
    expect(simpleHash('hello')).not.toBe(simpleHash('world'));
  });
});
