import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { FormSubmissionService, FormTypeCode } from './form-submission.service';
import { InquiryPayload, InquiryType } from '../models/notification.model';
import {
  ApplicationStatus,
  StatusEvent,
  WorkflowTrack,
} from '../models/application-status.model';
import { TalentProfile } from '../models/talent-profile.model';
import { CastingApplication } from '../models/casting-application.model';
import { MediaProfessional } from '../models/media-professional.model';
import { OutsourcingRequirement } from '../models/outsourcing-requirement.model';

export interface SubmitResult {
  accepted: boolean;
  id?: string;
}

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private readonly notifications = inject(NotificationService);
  private readonly formsApi = inject(FormSubmissionService);

  submitTalentProfile(profile: TalentProfile): Observable<SubmitResult> {
    return this.submitUnified(
      'FILM_TV_TALENT',
      profile.fullName,
      profile.email,
      profile.mobile,
      undefined,
      profile as unknown as Record<string, unknown>,
      {
        type: 'talent-registration',
        label: 'Talent Registration',
        name: profile.fullName,
        mobile: profile.mobile,
        email: profile.email,
        service: profile.category,
        requirement: profile.about,
      },
    );
  }

  submitCastingApplication(app: CastingApplication): Observable<SubmitResult> {
    return this.submitUnified(
      'FILM_TV_TALENT',
      app.fullName,
      app.email,
      app.mobile,
      undefined,
      { ...app, portal: 'casting-application' },
      {
        type: 'talent-registration',
        label: 'Casting Application',
        name: app.fullName,
        mobile: app.mobile,
        email: app.email,
        service: 'casting',
        requirement: app.credits,
      },
    );
  }

  submitMediaProfessional(pro: MediaProfessional): Observable<SubmitResult> {
    return this.submitUnified(
      'CREATIVE_CAREER',
      pro.fullName,
      pro.email,
      pro.mobile,
      undefined,
      { ...pro, portal: 'media-professional' },
      {
        type: 'talent-registration',
        label: 'Media Professional Registration',
        name: pro.fullName,
        mobile: pro.mobile,
        email: pro.email,
        service: pro.profession,
        requirement: pro.about,
      },
    );
  }

  submitOutsourcingRequirement(req: OutsourcingRequirement): Observable<SubmitResult> {
    return this.submitUnified(
      'MANPOWER_HIRE',
      req.contactPerson,
      req.email,
      req.mobile,
      req.organizationName,
      { ...req, portal: 'manpower-requirement' },
      {
        type: 'manpower-requirement',
        label: 'Manpower Requirement',
        name: req.contactPerson,
        mobile: req.mobile,
        email: req.email,
        service: req.industry,
        requirement: req.requirement,
      },
    );
  }

  /**
   * Persist via unified FormSubmission API (admin pipeline), then best-effort notify.
   */
  private submitUnified(
    formType: FormTypeCode,
    contactName: string,
    contactEmail: string,
    contactMobile: string | undefined,
    companyName: string | undefined,
    payload: Record<string, unknown>,
    inquiry: InquiryPayload & { type: InquiryType },
  ): Observable<SubmitResult> {
    return this.formsApi
      .submit({
        formType,
        source: 'WEBSITE',
        contactName,
        contactEmail,
        contactMobile,
        companyName,
        payload,
      })
      .pipe(
        map((res) => {
          this.notifications.notify(inquiry).pipe(catchError(() => of(null))).subscribe();
          return { accepted: true, id: res.applicationId };
        }),
        catchError(() =>
          // Fallback: still try notification so UX is not blocked if API is down.
          this.notifications.notify(inquiry).pipe(
            map((r) => ({ accepted: r.accepted })),
            catchError(() => of({ accepted: false })),
          ),
        ),
      );
  }

  getStatus(_resource: string, _id: string): Observable<{ status: ApplicationStatus; history: StatusEvent[] } | null> {
    return of(null);
  }

  advanceStatus(
    _resource: string,
    _id: string,
    _status: ApplicationStatus,
    _note?: string,
  ): Observable<boolean> {
    return of(false);
  }
}
