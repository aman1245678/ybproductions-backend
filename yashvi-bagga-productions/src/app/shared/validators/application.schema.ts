import { z } from 'zod';
import { normalizeIndianMobile } from './form.validators';

export const formTypeCodeSchema = z.enum([
  'BRANDING',
  'CASTING_CREW',
  'IT_SOLUTIONS',
  'TRAINING',
  'DIGITAL_MARKETING',
  'SOCIAL_MEDIA',
  'MANPOWER_HIRE',
  'CREATIVE_CAREER',
  'FILM_TV_TALENT',
  'IT_CAREER',
  'OFFICE_JOB',
  'CONTACT',
  'JOIN_NETWORK',
]);

const optionalMobile = z
  .string()
  .trim()
  .optional()
  .transform((value) => {
    if (!value) return undefined;
    return normalizeIndianMobile(value) ?? value;
  });

export const submitApplicationSchema = z.object({
  formType: formTypeCodeSchema,
  source: z.enum(['MOBILE', 'WEBSITE', 'ADMIN']).optional().default('WEBSITE'),
  contactName: z.string().trim().min(1, 'Name is required').max(120),
  contactEmail: z.string().trim().email('A valid email is required').max(254),
  contactMobile: optionalMobile,
  contactWhatsapp: optionalMobile,
  companyName: z.string().trim().max(200).optional(),
  preferredCommunication: z.array(z.string()).optional().default([]),
  payload: z.record(z.unknown()).optional().default({}),
});

export type SubmitApplicationInput = z.infer<typeof submitApplicationSchema>;

export function parseSubmitApplication(body: unknown): SubmitApplicationInput {
  return submitApplicationSchema.parse(body);
}
