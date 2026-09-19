import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NotificationService } from './notification.service';
import { SmsService } from './sms.service';
import { environment } from '../../../environments/environment';

describe('NotificationService', () => {
  let service: NotificationService;
  let http: HttpTestingController;
  let sms: jasmine.SpyObj<SmsService>;

  beforeEach(() => {
    sms = jasmine.createSpyObj('SmsService', ['sendMany']);
    sms.sendMany.and.returnValue(
      of([{ success: true, skipped: false, to: '9876543210', provider: 'MSG91' }]),
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: SmsService, useValue: sms }, NotificationService],
    });

    service = TestBed.inject(NotificationService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('notify always accepts and reports channel outcomes', (done) => {
    service
      .notify({
        type: 'contact',
        label: 'Contact Form',
        name: 'Aman',
        mobile: '9876543210',
        email: 'aman@example.com',
        requirement: 'Hello',
      })
      .subscribe((result) => {
        expect(result.accepted).toBeTrue();
        expect(result.channels.length).toBe(3);
        done();
      });

    const req = http.expectOne(`${environment.apiUrl}/inquiries`);
    expect(req.request.method).toBe('POST');
    req.flush({ ok: true });
  });
});
