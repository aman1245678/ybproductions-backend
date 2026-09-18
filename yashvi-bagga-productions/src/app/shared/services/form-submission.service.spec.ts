import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { FormSubmissionService } from './form-submission.service';
import { environment } from '../../../environments/environment';

describe('FormSubmissionService', () => {
  let service: FormSubmissionService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FormSubmissionService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('maps intake wizard values onto the API body', () => {
    const body = service.buildFromIntake('branding', {
      fullName: '  Aman  ',
      email: 'aman@example.com',
      mobile: '9876543210',
      company: 'YB',
      contactPref: ['WhatsApp', 'Email'],
    });
    expect(body.formType).toBe('BRANDING');
    expect(body.contactName).toBe('Aman');
    expect(body.companyName).toBe('YB');
    expect(body.preferredCommunication).toEqual(['WhatsApp', 'Email']);
  });

  it('adds crewTrack for film/TV crew slugs', () => {
    const body = service.buildFromIntake('content-creator', {
      fullName: 'Aman',
      email: 'aman@example.com',
    });
    expect(body.formType).toBe('FILM_TV_TALENT');
    expect(body.payload?.['crewTrack']).toBe('content-creator');
  });

  it('throws on an unknown slug', () => {
    expect(() => service.buildFromIntake('nope', {})).toThrowError(/Unknown form slug/);
  });

  it('POSTs a validated payload to /applications', () => {
    service
      .submit({
        formType: 'CONTACT',
        contactName: 'Aman',
        contactEmail: 'aman@example.com',
      })
      .subscribe((res) => {
        expect(res.applicationId).toBe('APP-1');
      });

    const req = http.expectOne(`${environment.apiUrl}/applications`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.formType).toBe('CONTACT');
    expect(req.request.body.source).toBe('WEBSITE');
    req.flush({
      message: 'ok',
      applicationId: 'APP-1',
      status: 'Submitted',
      formType: 'CONTACT',
      title: 'Contact',
    });
  });

  it('looks up an application by public code', () => {
    service.lookupByCode(' APP-1 ').subscribe((res) => {
      expect(res.applicationId).toBe('APP-1');
    });
    const req = http.expectOne(`${environment.apiUrl}/applications/by-code/APP-1`);
    expect(req.request.method).toBe('GET');
    req.flush({
      applicationId: 'APP-1',
      formType: 'CONTACT',
      title: 'Contact',
      status: 'Submitted',
      createdAtUtc: '2026-01-01T00:00:00.000Z',
      contactName: 'Aman',
    });
  });

  it('does not POST when validation fails', () => {
    let message = '';
    service
      .submit({
        formType: 'CONTACT',
        contactName: '',
        contactEmail: 'bad',
      })
      .subscribe({
        error: (err: Error) => {
          message = err.message;
        },
      });
    http.expectNone(`${environment.apiUrl}/applications`);
    expect(message.length).toBeGreaterThan(0);
  });
});
