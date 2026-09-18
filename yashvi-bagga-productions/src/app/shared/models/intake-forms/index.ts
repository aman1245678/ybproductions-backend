import { IntakeFormDef } from './types';
import { BRANDING_FORM } from './branding.form';
import { CAST_CREW_FORM } from './cast-crew.form';
import { IT_FORM } from './it.form';
import { TRAINING_FORM } from './training.form';
import { TALENT_FORM } from './talent.form';
import { CREATIVE_FORM } from './creative.form';
import { IT_CAREER_FORM } from './it-career.form';
import { JOBS_FORM } from './jobs.form';
import { DIGITAL_FORM, SOCIAL_FORM } from './digital.form';
import { BEHIND_CAMERA_FORM, CONTENT_CREATOR_FORM, SOCIAL_INFLUENCER_FORM } from './crew.form';

export type { FieldType, IntakeField, IntakeStep, IntakeFormDef } from './types';

export const INTAKE_FORMS: Record<string, IntakeFormDef> = {
  branding: BRANDING_FORM,
  'cast-crew': CAST_CREW_FORM,
  it: IT_FORM,
  training: TRAINING_FORM,
  talent: TALENT_FORM,
  creative: CREATIVE_FORM,
  'it-career': IT_CAREER_FORM,
  jobs: JOBS_FORM,
  digital: DIGITAL_FORM,
  social: SOCIAL_FORM,
  'content-creator': CONTENT_CREATOR_FORM,
  'social-influencer': SOCIAL_INFLUENCER_FORM,
  'behind-camera': BEHIND_CAMERA_FORM,
};
