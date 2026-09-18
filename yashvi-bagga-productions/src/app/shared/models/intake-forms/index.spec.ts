import { INTAKE_FORMS } from './index';

describe('INTAKE_FORMS catalogue', () => {
  it('exposes every hire and join slug used by the wizard', () => {
    expect(Object.keys(INTAKE_FORMS).sort()).toEqual(
      [
        'behind-camera',
        'branding',
        'cast-crew',
        'content-creator',
        'creative',
        'digital',
        'it',
        'it-career',
        'jobs',
        'social',
        'social-influencer',
        'talent',
        'training',
      ].sort(),
    );
  });

  it('gives each form at least one required field', () => {
    for (const form of Object.values(INTAKE_FORMS)) {
      const required = form.steps.flatMap((step) => step.fields).some((field) => field.required);
      expect(required).withContext(form.slug).toBeTrue();
    }
  });
});
