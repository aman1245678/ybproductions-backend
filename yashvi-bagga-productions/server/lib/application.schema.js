import { z } from 'zod';

/** Mirrors the browser Zod schema used before POST /api/v1/applications. */
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

export const submitApplicationSchema = z.object({
  formType: formTypeCodeSchema,
  source: z.enum(['MOBILE', 'WEBSITE', 'ADMIN']).optional().default('WEBSITE'),
  contactName: z.string().trim().min(1, 'Name is required').max(120),
  contactEmail: z.string().trim().email('A valid email is required').max(254),
  contactMobile: z.string().trim().optional(),
  contactWhatsapp: z.string().trim().optional(),
  companyName: z.string().trim().max(200).optional(),
  preferredCommunication: z.array(z.string()).optional().default([]),
  payload: z.record(z.unknown()).optional().default({}),
});

export function parseSubmitApplication(body) {
  return submitApplicationSchema.parse(body);
}
