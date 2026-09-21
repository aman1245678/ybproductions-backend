import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SeoService } from '../../core/services/seo.service';
import { CaptchaComponent } from '../../shared/components/captcha/captcha.component';
import { RequirementTextareaComponent } from '../../shared/components/requirement-textarea/requirement-textarea.component';
import { ToastService } from '../../shared/services/toast.service';
import { NotificationService } from '../../shared/services/notification.service';
import { FormSubmissionService } from '../../shared/services/form-submission.service';
import { ApplicationTrackComponent } from '../track/application-track.component';
import { indianMobileValidator } from '../../shared/validators/form.validators';
import { InquiryPayload } from '../../shared/models/notification.model';
import { SERVICE_LINKS } from '../../shared/models/service-links.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollAnimationDirective, CaptchaComponent, RequirementTextareaComponent, ApplicationTrackComponent],
  templateUrl: './contact.component.html',
  styles: [`:host { display: block; }`],
})
export class ContactComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly notifications = inject(NotificationService);
  private readonly formsApi = inject(FormSubmissionService);

  @ViewChild('captchaRef') private captcha?: CaptchaComponent;

  currentStep = signal(1);
  submitting = signal(false);

  /**
   * The eight services from the client deck — shared with the navbar dropdown
   * and the Services page grid so all three stay in sync.
   */
  readonly serviceLinks = SERVICE_LINKS;

  socials = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ybproductions2025?igsi=dXpqaWV3cmJleGxn',
      bgClass: 'bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]',
      iconPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@yashvibaggaproductions?si=eKjUdxkHtL-AO52B',
      bgClass: 'bg-[#FF0000]',
      iconPath: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/yashvibaggaproductions',
      bgClass: 'bg-[#1877F2]',
      iconPath: 'M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/yashvi-bagga-productions',
      bgClass: 'bg-[#0A66C2]',
      iconPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
  ];

  contactForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, indianMobileValidator()]],
    clientType: ['', Validators.required],
    service: ['', Validators.required],
    budget: [''],
    // Min/max (20–2000) is enforced by <app-requirement-textarea>.
    message: ['', [Validators.required]],
    source: [''],
    // Holds the verified reCAPTCHA token; the submit gate enforces it.
    captcha: [''],
    emailVerified: [environment.otp.mockMode ? 'mock-verified' : null, environment.otp.mockMode ? [] : Validators.required],
    mobileVerified: [environment.otp.mockMode ? 'mock-verified' : null, environment.otp.mockMode ? [] : Validators.required],
  });

  nextStep(): void {
    if (this.currentStep() < 3) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }

  stepComplete(step: number): boolean {
    return this.currentStep() >= step;
  }

  stepPending(step: number): boolean {
    return this.currentStep() < step;
  }

  canGoBack(): boolean {
    return this.currentStep() > 1;
  }

  canContinue(): boolean {
    return this.currentStep() < 3;
  }

  async submitForm(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toast.error('Please complete all required fields before submitting.');
      return;
    }

    // Captcha gate — blocks submission until verification succeeds.
    const verified = await this.captcha?.execute();
    if (verified === false) {
      return; // the captcha component surfaces its own message
    }

    this.submitting.set(true);
    const loadingId = this.toast.loading('Sending your message…');

    const value = this.contactForm.value;
    const contactName = `${value.firstName ?? ''} ${value.lastName ?? ''}`.trim();
    const contactEmail = value.email ?? '';
    const contactMobile = value.phone ?? '';

    this.formsApi
      .submit({
        formType: 'CONTACT',
        source: 'WEBSITE',
        contactName,
        contactEmail,
        contactMobile,
        payload: {
          ...value,
          portal: 'contact',
        },
      })
      .subscribe({
        next: (res) => {
          this.toast.update(
            loadingId,
            'success',
            `Thank you! We'll get back to you within 24 hours. Ref: ${res.applicationId}`,
          );
          const payload: InquiryPayload = {
            type: 'contact',
            label: 'Contact Form',
            name: contactName,
            mobile: contactMobile,
            email: contactEmail,
            service: value.service ?? '',
            requirement: value.message ?? '',
            extra: { clientType: value.clientType, budget: value.budget, source: value.source },
          };
          this.notifications.notify(payload).subscribe();
          this.contactForm.reset({
            emailVerified: environment.otp.mockMode ? 'mock-verified' : null,
            mobileVerified: environment.otp.mockMode ? 'mock-verified' : null,
          });
          this.captcha?.reset();
          this.currentStep.set(1);
          this.submitting.set(false);
        },
        error: () => {
          // Soft fallback to legacy notify
          const payload: InquiryPayload = {
            type: 'contact',
            label: 'Contact Form',
            name: contactName,
            mobile: contactMobile,
            email: contactEmail,
            service: value.service ?? '',
            requirement: value.message ?? '',
            extra: { clientType: value.clientType, budget: value.budget, source: value.source },
          };
          this.notifications.notify(payload).subscribe({
            next: () => {
              this.toast.update(loadingId, 'success', "Thank you! We'll get back to you within 24 hours.");
              this.contactForm.reset({
            emailVerified: environment.otp.mockMode ? 'mock-verified' : null,
            mobileVerified: environment.otp.mockMode ? 'mock-verified' : null,
          });
              this.captcha?.reset();
              this.currentStep.set(1);
              this.submitting.set(false);
            },
            error: () => {
              this.toast.update(loadingId, 'error', 'Something went wrong. Please try again or reach us directly.');
              this.submitting.set(false);
            },
          });
        },
      });
  }

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Contact | Yashvi Bagga Productions',
      description: 'Get in touch with Yashvi Bagga Productions. Let\'s discuss your project, collaboration, or partnership opportunity.',
    });
  }
}
