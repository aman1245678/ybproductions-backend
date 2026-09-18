import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ApplicationService } from './application.service';
import { FormSubmissionService } from './form-submission.service';
import { NotificationService } from './notification.service';
import { TalentProfile } from '../models/talent-profile.model';

describe('ApplicationService', () => {
  let service: ApplicationService;
  let formsApi: jasmine.SpyObj<FormSubmissionService>;
  let notifications: jasmine.SpyObj<NotificationService>;

    const profile = {
    fullName: 'Aman',
    email: 'aman@example.com',
    mobile: '9876543210',
    category: 'actor',
    about: 'Demo',
    experienceLevel: 'fresher',
    skills: [],
    availability: [],
    portfolioLinks: [],
  } as TalentProfile;

  beforeEach(() => {
    formsApi = jasmine.createSpyObj('FormSubmissionService', ['submit', 'lookupByCode']);
    notifications = jasmine.createSpyObj('NotificationService', ['notify']);
    notifications.notify.and.returnValue(of({ accepted: true, channels: [] }));

    TestBed.configureTestingModule({
      providers: [
        ApplicationService,
        { provide: FormSubmissionService, useValue: formsApi },
        { provide: NotificationService, useValue: notifications },
      ],
    });
    service = TestBed.inject(ApplicationService);
  });

  it('returns the application id after a successful talent submit', () => {
    formsApi.submit.and.returnValue(
      of({
        message: 'ok',
        applicationId: 'APP-9',
        status: 'Submitted',
        formType: 'FILM_TV_TALENT',
        title: 'Talent',
      }),
    );

    service.submitTalentProfile(profile).subscribe((result) => {
      expect(result).toEqual({ accepted: true, id: 'APP-9' });
    });
    expect(formsApi.submit).toHaveBeenCalled();
    expect(notifications.notify).toHaveBeenCalled();
  });

  it('falls back to notification-only when the API is down', () => {
    formsApi.submit.and.returnValue(throwError(() => new Error('down')));
    notifications.notify.and.returnValue(of({ accepted: true, channels: [] }));

    service.submitTalentProfile(profile).subscribe((result) => {
      expect(result.accepted).toBeTrue();
    });
  });

  it('maps lookup results onto a status timeline', () => {
    formsApi.lookupByCode.and.returnValue(
      of({
        applicationId: 'APP-9',
        formType: 'FILM_TV_TALENT',
        title: 'Talent',
        status: 'submitted',
        createdAtUtc: '2026-01-01T00:00:00.000Z',
        contactName: 'Aman',
      }),
    );

    service.getStatus('talent', 'APP-9').subscribe((row) => {
      expect(row?.status).toBe('submitted');
      expect(row?.history[0].note).toBe('Talent');
    });
  });
});
