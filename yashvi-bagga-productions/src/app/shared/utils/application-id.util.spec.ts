import { generateApplicationId } from './application-id.util';

describe('generateApplicationId', () => {
  it('uses the YBP-{TYPE}-{YEAR}-{SEQ} format', () => {
    const id = generateApplicationId('BRAND');
    expect(id).toMatch(/^YBP-BRAND-\d{4}-\d{5}$/);
  });

  it('produces unique ids across calls', () => {
    const a = generateApplicationId('JOB');
    const b = generateApplicationId('JOB');
    expect(a).not.toBe(b);
  });
});
