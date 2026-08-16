import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

/** Backend FormTypeCode values. */
export type FormTypeCode =
  | 'BRANDING'
  | 'CASTING_CREW'
  | 'IT_SOLUTIONS'
  | 'TRAINING'
  | 'DIGITAL_MARKETING'
  | 'SOCIAL_MEDIA'
  | 'MANPOWER_HIRE'
  | 'CREATIVE_CAREER'
  | 'FILM_TV_TALENT'
  | 'IT_CAREER'
  | 'OFFICE_JOB'
  | 'CONTACT'
  | 'JOIN_NETWORK';

export interface SubmitApplicationRequest {
  formType: FormTypeCode;
  source?: 'MOBILE' | 'WEBSITE' | 'ADMIN';
  contactName: string;
  contactEmail: string;
  contactMobile?: string;
  contactWhatsapp?: string;
  companyName?: string;
  preferredCommunication?: string[];
  payload?: Record<string, unknown>;
}

export interface SubmitApplicationResponse {
  message: string;
  applicationId: string;
  status: string;
  formType: string;
  title: string;
}

/** Website intake slug → backend formType */
export const SLUG_TO_FORM_TYPE: Record<string, FormTypeCode> = {
  branding: 'BRANDING',
  'cast-crew': 'CASTING_CREW',
  it: 'IT_SOLUTIONS',
  training: 'TRAINING',
  digital: 'DIGITAL_MARKETING',
  social: 'SOCIAL_MEDIA',
  talent: 'FILM_TV_TALENT',
  creative: 'CREATIVE_CAREER',
  'it-career': 'IT_CAREER',
  jobs: 'OFFICE_JOB',
};

@Injectable({ providedIn: 'root' })
export class FormSubmissionService {
  private readonly http = inject(HttpClient);

  submit(body: SubmitApplicationRequest): Observable<SubmitApplicationResponse> {
    return this.http
      .post<SubmitApplicationResponse>(`${environment.apiUrl}/applications`, {
        source: 'WEBSITE',
        preferredCommunication: [],
        payload: {},
        ...body,
      })
      .pipe(catchError((err) => throwError(() => this.toError(err))));
  }

  /**
   * Build API body from intake wizard raw values.
   * Contact fields use common keys across hire/join forms.
   */
  buildFromIntake(
    slug: string,
    raw: Record<string, unknown>,
  ): SubmitApplicationRequest {
    const formType = SLUG_TO_FORM_TYPE[slug];
    if (!formType) {
      throw new Error(`Unknown form slug: ${slug}`);
    }

    const str = (key: string) => {
      const v = raw[key];
      return typeof v === 'string' ? v.trim() : '';
    };

    const contactName = str('fullName') || str('contactName') || str('contactPerson') || str('name');
    const contactEmail = str('email') || str('contactEmail');
    const contactMobile = str('mobile') || str('contactMobile');
    const contactWhatsapp = str('whatsapp') || str('contactWhatsapp');
    const companyName =
      str('company') || str('organization') || str('companyName') || str('organizationName');

    const prefs = raw['contactPref'];
    const preferredCommunication = Array.isArray(prefs)
      ? prefs.filter((x): x is string => typeof x === 'string')
      : [];

    return {
      formType,
      source: 'WEBSITE',
      contactName,
      contactEmail,
      contactMobile: contactMobile || undefined,
      contactWhatsapp: contactWhatsapp || undefined,
      companyName: companyName || undefined,
      preferredCommunication,
      payload: raw,
    };
  }

  private toError(err: unknown): Error {
    if (err instanceof HttpErrorResponse) {
      const detail =
        (err.error && (err.error.detail || err.error.message || err.error.title)) ||
        err.message ||
        'Submission failed';
      return new Error(typeof detail === 'string' ? detail : 'Submission failed');
    }
    return err instanceof Error ? err : new Error('Submission failed');
  }
}
