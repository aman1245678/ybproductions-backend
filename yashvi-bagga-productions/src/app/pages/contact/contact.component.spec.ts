import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ContactComponent } from './contact.component';
import { FormSubmissionService } from '../../shared/services/form-submission.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ToastService } from '../../shared/services/toast.service';
import { SeoService } from '../../core/services/seo.service';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let formsApi: jasmine.SpyObj<FormSubmissionService>;
  let toast: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    formsApi = jasmine.createSpyObj('FormSubmissionService', ['submit']);
    toast = jasmine.createSpyObj('ToastService', ['error', 'loading', 'update']);
    toast.loading.and.returnValue(1);

    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule],
      providers: [
        { provide: FormSubmissionService, useValue: formsApi },
        { provide: NotificationService, useValue: { notify: () => of({ accepted: true, channels: [] }) } },
        { provide: ToastService, useValue: toast },
        { provide: SeoService, useValue: { updateMetaTags: () => undefined } },
      ],
    })
      .overrideComponent(ContactComponent, {
        set: { template: '<form [formGroup]="contactForm"></form>', imports: [ReactiveFormsModule] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts on step 1', () => {
    expect(component.currentStep()).toBe(1);
  });

  it('nextStep and prevStep move within 1..3', () => {
    component.nextStep();
    expect(component.currentStep()).toBe(2);
    component.nextStep();
    expect(component.currentStep()).toBe(3);
    component.nextStep();
    expect(component.currentStep()).toBe(3);
    component.prevStep();
    expect(component.currentStep()).toBe(2);
  });

  it('submitForm blocks when the form is invalid', async () => {
    await component.submitForm();
    expect(toast.error).toHaveBeenCalled();
    expect(formsApi.submit).not.toHaveBeenCalled();
  });
});
