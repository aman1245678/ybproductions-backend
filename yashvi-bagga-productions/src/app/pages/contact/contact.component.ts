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
  template: `
    <!-- HERO -->
    <section class="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-1/3 left-1/2 w-96 h-96 bg-brand-gold/8 rounded-full blur-[120px]"></div>
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Get In Touch</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          Let's <span class="gradient-text">Connect</span>
        </h1>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Ready to create something extraordinary? We'd love to hear from you.
        </p>
      </div>
    </section>

    <!-- CONTACT CONTENT -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <!-- Contact Info -->
          <div class="lg:col-span-2" appScrollAnimation animationType="fade-left">
            <h2 class="heading-sm text-brand-white mb-8">Contact Information</h2>

            <div class="space-y-6 mb-10">
              <div class="flex items-start gap-4 group">
                <div class="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <svg class="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <p class="text-brand-white/40 font-poppins text-xs uppercase tracking-wider mb-1">Email</p>
                  <p class="text-brand-white font-poppins text-sm">ybproductions2025@gmail.com</p>
                </div>
              </div>

              <div class="flex items-start gap-4 group">
                <div class="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <svg class="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <p class="text-brand-white/40 font-poppins text-xs uppercase tracking-wider mb-1">Phone</p>
                  <p class="text-brand-white font-poppins text-sm">+91 83685 95223</p>
                </div>
              </div>

              <div class="flex items-start gap-4 group">
                <div class="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <svg class="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <p class="text-brand-white/40 font-poppins text-xs uppercase tracking-wider mb-1">Location</p>
                  <p class="text-brand-white font-poppins text-sm">New Delhi, India</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <h3 class="text-brand-white font-poppins text-sm font-medium mb-4">Follow Us</h3>
            <div class="flex flex-wrap gap-3">
              @for (social of socials; track social.name) {
                <a
                  [href]="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-110"
                  [class]="social.bgClass"
                  [attr.aria-label]="social.name"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path [attr.d]="social.iconPath" />
                  </svg>
                </a>
              }
            </div>

            <!-- Map -->
            <div class="mt-10 rounded-2xl overflow-hidden aspect-video relative border border-white/10">
              <iframe
                title="Yashvi Bagga Productions — New Delhi"
                class="w-full h-full min-h-[220px] border-0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=New+Delhi,+India&z=11&output=embed"
              ></iframe>
            </div>
          </div>

          <!-- Multi-step Contact Form -->
          <div class="lg:col-span-3" appScrollAnimation animationType="fade-right">
            <div class="glass-card p-8 md:p-12">
              <!-- Progress bar -->
              <div class="flex items-center gap-2 mb-10">
                @for (step of [1, 2, 3]; track step) {
                  <div
                    class="flex-1 h-1 rounded-full transition-all duration-500"
                    [class.bg-brand-gold]="currentStep() >= step"
                    [class.bg-brand-white/10]="currentStep() < step"
                  ></div>
                }
              </div>

              <form [formGroup]="contactForm" (ngSubmit)="submitForm()">
                <!-- Step 1: Basic Info -->
                @if (currentStep() === 1) {
                  <div class="space-y-6 animate-fade-in">
                    <h3 class="text-xl font-playfair text-brand-white mb-2">Tell us about yourself</h3>
                    <p class="text-brand-white/40 font-poppins text-sm mb-6">Let's start with the basics.</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label class="block text-brand-white/60 font-poppins text-sm mb-2">First Name *</label>
                        <input
                          formControlName="firstName"
                          type="text"
                          class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-all duration-300"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label class="block text-brand-white/60 font-poppins text-sm mb-2">Last Name *</label>
                        <input
                          formControlName="lastName"
                          type="text"
                          class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-all duration-300"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="block text-brand-white/60 font-poppins text-sm mb-2">Email *</label>
                      <input
                        formControlName="email"
                        type="email"
                        class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-all duration-300"
                        placeholder="your@email.com"
                      />
                      <!-- <div class="mt-2">
                        <app-email-otp
                          formControlName="emailVerified"
                          [destination]="contactForm.get('email')?.value || ''"
                          [destinationValid]="!!contactForm.get('email')?.valid"
                          purpose="contact-form"
                        />
                      </div> -->
                    </div>

                    <div>
                      <label class="block text-brand-white/60 font-poppins text-sm mb-2">Mobile Number *</label>
                      <input
                        formControlName="phone"
                        type="tel"
                        class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-all duration-300"
                        placeholder="+91 83685 95223"
                      />
                      @if (contactForm.get('phone')?.touched && contactForm.get('phone')?.hasError('indianMobile')) {
                        <p class="mt-1.5 text-brand-pink font-poppins text-xs">Enter a valid 10-digit Indian mobile number.</p>
                      }
                      <!-- <div class="mt-2">
                        <app-mobile-otp
                          formControlName="mobileVerified"
                          [destination]="contactForm.get('phone')?.value || ''"
                          [destinationValid]="!!contactForm.get('phone')?.valid"
                          purpose="contact-form"
                        />
                      </div> -->
                    </div>
                  </div>
                }

                <!-- Step 2: Project Details -->
                @if (currentStep() === 2) {
                  <div class="space-y-6 animate-fade-in">
                    <h3 class="text-xl font-playfair text-brand-white mb-2">About your project</h3>
                    <p class="text-brand-white/40 font-poppins text-sm mb-6">Help us understand what you need.</p>

                    <div>
                      <label class="block text-brand-white/60 font-poppins text-sm mb-2">I am a *</label>
                      <select
                        formControlName="clientType"
                        class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-all duration-300"
                      >
                        <option value="" disabled>Select your role</option>
                        <option value="brand">Brand / Business</option>
                        <option value="creator">Content Creator</option>
                        <option value="influencer">Influencer</option>
                        <option value="startup">Startup</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-brand-white/60 font-poppins text-sm mb-2">Service Interested In *</label>
                      <select
                        formControlName="service"
                        class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-all duration-300"
                      >
                        <option value="" disabled>Select a service</option>
                        @for (service of serviceLinks; track service.slug) {
                          <option [value]="service.label">{{ service.label }}</option>
                        }
                        <option value="Multiple Services">Multiple Services</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-brand-white/60 font-poppins text-sm mb-2">Budget Range</label>
                      <select
                        formControlName="budget"
                        class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-all duration-300"
                      >
                        <option value="" disabled>Select budget range</option>
                        <option value="50k-1l">₹50K - ₹1 Lakh</option>
                        <option value="1l-3l">₹1 Lakh - ₹3 Lakhs</option>
                        <option value="3l-5l">₹3 Lakhs - ₹5 Lakhs</option>
                        <option value="5l+">₹5 Lakhs+</option>
                      </select>
                    </div>
                  </div>
                }

                <!-- Step 3: Message -->
                @if (currentStep() === 3) {
                  <div class="space-y-6 animate-fade-in">
                    <h3 class="text-xl font-playfair text-brand-white mb-2">Final details</h3>
                    <p class="text-brand-white/40 font-poppins text-sm mb-6">Tell us more about your vision.</p>

                    <app-requirement-textarea
                      formControlName="message"
                      label="Describe Your Requirement"
                      [rows]="6"
                    />
                    <div>
                      <app-captcha #captchaRef formControlName="captcha" action="contact" />
                    </div>

                    <div>
                      <label class="block text-brand-white/60 font-poppins text-sm mb-2">How did you hear about us?</label>
                      <select
                        formControlName="source"
                        class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-all duration-300"
                      >
                        <option value="" disabled>Select an option</option>
                        <option value="instagram">Instagram</option>
                        <option value="google">Google Search</option>
                        <option value="referral">Referral</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                }

                <!-- Navigation Buttons -->
                <div class="flex items-center justify-between mt-10">
                  @if (currentStep() > 1) {
                    <button
                      type="button"
                      class="px-6 py-3 border border-white/10 text-brand-white/60 font-poppins text-sm rounded-full hover:border-brand-gold hover:text-brand-gold transition-all duration-300"
                      (click)="prevStep()"
                    >
                      Back
                    </button>
                  } @else {
                    <div></div>
                  }

                  @if (currentStep() < 3) {
                    <button
                      type="button"
                      class="px-8 py-3 bg-brand-gold text-brand-black font-poppins font-semibold rounded-full hover:bg-brand-pink hover:text-white transition-all duration-500"
                      (click)="nextStep()"
                    >
                      Continue
                    </button>
                  } @else {
                    <button
                      type="submit"
                      [disabled]="contactForm.invalid || submitting()"
                      class="inline-flex items-center gap-2 px-8 py-3 bg-brand-gold text-brand-black font-poppins font-semibold rounded-full hover:bg-brand-pink hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      @if (submitting()) {
                        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/><path class="opacity-90" fill="currentColor" d="M12 2a10 10 0 0110 10h-3a7 7 0 00-7-7V2z"/></svg>
                        Submitting…
                      } @else {
                        Send Message
                      }
                    </button>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <app-application-track />
    </section>
  `,
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
