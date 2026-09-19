import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { JoinNetworkComponent } from './join-network.component';
import { FormSubmissionService } from '../../../shared/services/form-submission.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { SeoService } from '../../../core/services/seo.service';

describe('JoinNetworkComponent', () => {
  let fixture: ComponentFixture<JoinNetworkComponent>;
  let component: JoinNetworkComponent;
  let toast: jasmine.SpyObj<ToastService>;
  let auth: jasmine.SpyObj<AuthService>;
  let formsApi: jasmine.SpyObj<FormSubmissionService>;

  beforeEach(async () => {
    toast = jasmine.createSpyObj('ToastService', ['error', 'success', 'loading', 'update']);
    auth = jasmine.createSpyObj('AuthService', ['register']);
    formsApi = jasmine.createSpyObj('FormSubmissionService', ['submit']);
    auth.register.and.returnValue(of({} as any));
    formsApi.submit.and.returnValue(of({} as any));

    await TestBed.configureTestingModule({
      imports: [JoinNetworkComponent, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        { provide: ToastService, useValue: toast },
        { provide: AuthService, useValue: auth },
        { provide: FormSubmissionService, useValue: formsApi },
        { provide: SeoService, useValue: { updateMetaTags: () => undefined } },
      ],
    })
      .overrideComponent(JoinNetworkComponent, {
        set: { template: '<form [formGroup]="signUpForm"></form>', imports: [ReactiveFormsModule] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(JoinNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts with an invalid empty sign-up form', () => {
    expect(component.signUpForm.invalid).toBeTrue();
    expect(component.signUpCategories.length).toBeGreaterThan(3);
  });

  it('submitSignUp blocks when required fields are missing', () => {
    component.submitSignUp();
    expect(toast.error).toHaveBeenCalled();
    expect(auth.register).not.toHaveBeenCalled();
  });

  it('submitSignUp rejects mismatched passwords', () => {
    component.signUpForm.patchValue({
      name: 'Aman',
      mobile: '9876543210',
      email: 'aman@example.com',
      category: 'actor',
      description: 'Looking for casting work in Mumbai.',
      password: 'secret1',
      confirmPassword: 'secret2',
      emailVerified: 'tok',
    });
    component.submitSignUp();
    expect(toast.error).toHaveBeenCalledWith('Passwords do not match.');
    expect(auth.register).not.toHaveBeenCalled();
  });
});
