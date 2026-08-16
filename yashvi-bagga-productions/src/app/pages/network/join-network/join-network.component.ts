import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { SeoService } from '../../../core/services/seo.service';
import { ToastService } from '../../../shared/services/toast.service';
import { FormSubmissionService } from '../../../shared/services/form-submission.service';
import { AuthService } from '../../../shared/services/auth.service';
import { indianMobileValidator } from '../../../shared/validators/form.validators';
import { EmailOtpComponent } from '../../../shared/components/email-otp/email-otp.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-join-network',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ScrollAnimationDirective, SectionHeaderComponent, EmailOtpComponent],
  template: `
    <!-- Compact hero -->
    <section class="relative overflow-hidden bg-brand-black pt-28 pb-10">
      <div class="absolute inset-0">
        <div class="absolute top-20 right-10 h-64 w-64 rounded-full bg-brand-gold/10 blur-[100px]"></div>
      </div>
      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span class="inline-block text-brand-gold font-poppins text-xs tracking-[0.28em] uppercase mb-3">Career Opportunities</span>
        <h1 class="heading-xl text-brand-white mb-3">Build Your Future with Yashvi Bagga Productions</h1>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto">
          Share your profile with our growing network. Prefer the full Hire / Join flow?
          <a routerLink="/get-started" class="text-brand-gold hover:underline"> Go to Get Started</a>.
        </p>
        <a
          routerLink="/get-started"
          class="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gold px-7 py-3 font-medium text-brand-black hover:bg-brand-white transition-colors"
        >
          Open Hire / Join Forms
        </a>
      </div>
    </section>

    <!-- SIGN UP (document form) -->
    <section id="sign-up" class="section-padding bg-brand-dark relative overflow-hidden scroll-mt-28">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08),_transparent_28%)]"></div>
      <div class="relative max-w-3xl mx-auto">
        <app-section-header
          subtitle="Sign Up"
          title="Create Your Account"
          description="Name, mobile, email, password and category. You receive login credentials immediately after sign up."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <form [formGroup]="signUpForm" (ngSubmit)="submitSignUp()" class="glass-card p-6 md:p-10 mt-8 space-y-5" appScrollAnimation animationType="fade-up">
          <div>
            <label class="block text-brand-white/60 font-poppins text-sm mb-2">Name *</label>
            <input
              formControlName="name"
              type="text"
              class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
              placeholder="Your full name"
            />
          </div>
          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Mobile *</label>
              <input
                formControlName="mobile"
                type="tel"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
                placeholder="10-digit mobile"
              />
              @if (signUpForm.get('mobile')?.touched && signUpForm.get('mobile')?.hasError('indianMobile')) {
                <p class="mt-1.5 text-brand-pink font-poppins text-xs">Enter a valid 10-digit Indian mobile number.</p>
              }
            </div>
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Email id *</label>
              <input
                formControlName="email"
                type="email"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
              <div class="mt-2">
                <app-email-otp
                  formControlName="emailVerified"
                  [destination]="signUpForm.get('email')?.value || ''"
                  [destinationValid]="!!signUpForm.get('email')?.valid"
                  purpose="join-network"
                />
              </div>
            </div>
          </div>
          <div>
            <label class="block text-brand-white/60 font-poppins text-sm mb-2">Category *</label>
            <select
              formControlName="category"
              class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
            >
              <option value="" disabled>Select category</option>
              @for (cat of signUpCategories; track cat.value) {
                <option [value]="cat.value">{{ cat.label }}</option>
              }
            </select>
          </div>
          <div>
            <label class="block text-brand-white/60 font-poppins text-sm mb-2">Describe yourself in few words *</label>
            <textarea
              formControlName="description"
              rows="4"
              class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors resize-y"
              placeholder="Tell us about yourself and what you are looking for..."
            ></textarea>
          </div>
          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Password *</label>
              <input
                formControlName="password"
                type="password"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
                placeholder="Min. 6 characters"
              />
            </div>
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Confirm Password *</label>
              <input
                formControlName="confirmPassword"
                type="password"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
                placeholder="Repeat password"
              />
            </div>
          </div>

          @if (signUpDone()) {
            <div class="rounded-2xl border border-brand-gold/20 bg-brand-gold/10 p-5 text-brand-white/85 text-sm space-y-3">
              <p>Your account is active. Use your email and password to log in anytime from the website header.</p>
              @if (registeredEmail()) {
                <p class="text-brand-gold">Login email: <strong>{{ registeredEmail() }}</strong></p>
              }
              <p class="text-brand-white/70">Reference: {{ applicationRef() }}</p>
              <p class="text-brand-gold">Next: complete your detailed application form.</p>
              <a
                [routerLink]="nextFormLink()"
                class="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-2.5 font-medium text-brand-black hover:bg-brand-white transition-colors"
              >
                Continue to detailed form
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          }

          <button
            type="submit"
            [disabled]="signUpForm.invalid || signUpSubmitting()"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            @if (signUpSubmitting()) { Submitting… } @else { Sign Up }
          </button>
        </form>

        <div class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" appScrollAnimation animationType="fade-up">
          @for (link of detailedFormLinks; track link.path) {
            <a
              [routerLink]="link.path"
              class="rounded-2xl border border-brand-white/10 bg-brand-black/50 px-5 py-4 text-left transition-all hover:border-brand-gold/30"
            >
              <p class="text-brand-gold text-[11px] uppercase tracking-[0.2em] mb-1">{{ link.eyebrow }}</p>
              <p class="text-brand-white font-playfair text-lg">{{ link.title }}</p>
              <p class="mt-1 text-brand-white/50 text-xs leading-5">{{ link.blurb }}</p>
            </a>
          }
        </div>
      </div>
    </section>

    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="relative max-w-4xl mx-auto px-6">
        <p class="text-brand-gold font-poppins text-xs tracking-[0.28em] uppercase mb-4" appScrollAnimation animationType="fade-up">About careers with us</p>
        <div class="space-y-5 text-brand-white/65 font-poppins text-sm leading-7" appScrollAnimation animationType="fade-up">
          <p>At Yashvi Bagga Productions, we believe that exceptional organizations are built by exceptional people. Our success is driven by passionate professionals, creative thinkers, skilled specialists, and dedicated individuals who share our commitment to excellence, innovation, and integrity.</p>
          <p>As a multidisciplinary organization working across media, entertainment, digital marketing, branding, professional training, event management, talent acquisition, and creative communications, we are always interested in connecting with talented individuals who are eager to learn, grow, and contribute to meaningful projects.</p>
          <p>Whether you are an experienced professional, a creative artist, a technical expert, a trainer, a marketing specialist, or a recent graduate looking to begin your career, we welcome your interest in becoming a part of our growing network.</p>
        </div>
      </div>
    </section>

    <section class="section-padding bg-brand-dark relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="Roles & Disciplines"
          title="Opportunities We Frequently Explore"
          description="We periodically engage professionals across a wide range of disciplines."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          @for (role of careerOpportunities; track role; let i = $index) {
            <div
              class="flex items-center gap-3 rounded-[20px] border border-brand-white/10 bg-brand-black/70 px-5 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/30"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="(i % 3) * 80"
            >
              <span class="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-brand-gold/20 bg-brand-gold/10 text-brand-gold">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
              </span>
              <span class="text-brand-white/75 font-poppins text-sm">{{ role }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="relative max-w-6xl mx-auto">
        <app-section-header
          subtitle="The Advantage"
          title="Why Join Yashvi Bagga Productions?"
          description="Working with Yashvi Bagga Productions offers the opportunity to:"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 mt-12">
          @for (point of whyJoinPoints; track point.text; let i = $index) {
            <div
              class="flex gap-5 rounded-[24px] border border-brand-white/10 bg-brand-dark/60 p-7 transition-all duration-500 hover:border-brand-gold/30"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 90"
            >
              <div class="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-2xl">{{ point.icon }}</div>
              <p class="text-brand-white/70 font-poppins text-sm leading-7">{{ point.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="relative max-w-6xl mx-auto">
        <app-section-header
          subtitle="How To Apply"
          title="Submit Your Profile"
          description="If you are passionate about creativity, innovation, excellence, and making a meaningful impact, we encourage you to share your profile with us."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-8 lg:grid-cols-2 items-start mt-12">
          <div class="rounded-[30px] border border-brand-white/10 bg-brand-black/50 p-8 md:p-10" appScrollAnimation animationType="fade-up">
            <p class="text-brand-white/70 font-poppins text-sm mb-6">Please send us:</p>
            <ul class="space-y-4">
              @for (item of submissionItems; track item) {
                <li class="flex items-start gap-3">
                  <svg class="w-4 h-4 mt-1 flex-shrink-0 text-brand-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                  <span class="text-brand-white/75 font-poppins text-sm leading-7">{{ item }}</span>
                </li>
              }
            </ul>
            <a
              routerLink="/join-network"
              fragment="sign-up"
              class="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-7 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white"
            >
              Go to Sign Up
            </a>
          </div>

          <div class="space-y-6" appScrollAnimation animationType="fade-up">
            <div class="rounded-[30px] border border-brand-gold/15 bg-gradient-to-br from-brand-gold/10 to-transparent p-8 md:p-10">
              <h3 class="text-xl font-playfair text-brand-white mb-4">Join Our Talent Network</h3>
              <p class="text-brand-white/65 font-poppins text-sm leading-7 mb-4">At Yashvi Bagga Productions, we are not just building a workforce—we are building a community of professionals who are passionate about creativity, excellence, collaboration, and innovation.</p>
              <p class="text-brand-white/65 font-poppins text-sm leading-7">We look forward to connecting with talented individuals who share our vision across India.</p>
            </div>
            <p class="px-2 text-brand-gold font-playfair text-lg">Your Next Opportunity May Begin Here.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class JoinNetworkComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly seoService = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly formsApi = inject(FormSubmissionService);
  private readonly auth = inject(AuthService);

  signUpDone = signal(false);
  signUpSubmitting = signal(false);
  registeredEmail = signal('');
  applicationRef = signal('');

  readonly signUpCategories = [
    { value: 'actor', label: 'Actor', next: '/casting-application' },
    { value: 'media-opportunity', label: 'Other Media professional seeking opportunity', next: '/media-professional' },
    { value: 'talent-pool-search', label: 'Media Professional searching for talent pool', next: '/talent-network' },
    { value: 'manpower', label: 'Corporates searching for Manpower resources', next: '/manpower-requirement' },
    { value: 'industry-jobs', label: 'Candidates searching for Industry jobs', next: '/media-professional' },
    { value: 'training', label: 'Corporates searching for Training Services', next: '/vocational-training' },
  ];

  readonly detailedFormLinks = [
    {
      path: '/casting-application',
      eyebrow: 'Actors',
      title: 'Actor & Casting Form',
      blurb: 'Full casting application with physical profile, roles and media links.',
    },
    {
      path: '/media-professional',
      eyebrow: 'Media Pros',
      title: 'Media Professional Form',
      blurb: 'Skills, portfolio, engagement model and assignment preferences.',
    },
    {
      path: '/manpower-requirement',
      eyebrow: 'Employers',
      title: 'Manpower Requirement Form',
      blurb: 'For organisations looking to hire / outsource workforce.',
    },
  ];

  readonly careerOpportunities: string[] = [
    'Corporate Trainers & Subject Matter Experts',
    'Digital Marketing Professionals',
    'Graphic Designers & Creative Designers',
    'Video Editors & Motion Graphics Artists',
    'Content Writers & Copywriters',
    'Social Media Managers',
    'Photographers & Videographers',
    'Event Managers & Coordinators',
    'Film & Television Production Professionals',
    'Casting & Talent Management Executives',
    'HR & Recruitment Professionals',
    'Business Development Executives',
    'Project Coordinators',
    'Administrative & Operations Professionals',
    'Creative Consultants',
    'Actors, Models, Anchors & Performing Artists',
    'Freelancers and Project-Based Professionals',
  ];

  readonly whyJoinPoints: { icon: string; text: string }[] = [
    { icon: '🌐', text: 'Contribute to diverse and meaningful projects across multiple industries.' },
    { icon: '🤝', text: 'Collaborate with experienced professionals and creative teams.' },
    {
      icon: '🏛️',
      text: 'Work on assignments involving government organizations, public sector enterprises, corporate clients, educational institutions, and the media & entertainment industry.',
    },
    { icon: '🚀', text: 'Build your skills in a dynamic, collaborative, and innovation-driven environment.' },
    { icon: '📈', text: 'Grow through challenging assignments, continuous learning, and professional development.' },
  ];

  readonly submissionItems: string[] = [
    'Your updated Resume / Curriculum Vitae',
    'A recent photograph (where relevant)',
    'Portfolio or work samples (if applicable)',
    'Links to your website, showreel, or social media profiles (if applicable)',
    'A brief cover note outlining your areas of expertise and career interests',
  ];

  signUpForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    mobile: ['', [Validators.required, indianMobileValidator()]],
    email: ['', [Validators.required, Validators.email]],
    category: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    emailVerified: [
      environment.otp.mockMode ? 'mock-verified' : null,
      environment.otp.mockMode ? [] : Validators.required,
    ],
  });

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Careers | YASHVI BAGGA PRODUCTIONS',
      description:
        'Sign up and join the Yashvi Bagga Productions talent and professional network. Actor, media, manpower and training pathways.',
      url: 'https://yashvibagga.com/join-network',
    });
  }

  nextFormLink(): string {
    const cat = this.signUpForm.get('category')?.value;
    return this.signUpCategories.find((c) => c.value === cat)?.next ?? '/media-professional';
  }

  submitSignUp(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.toast.error('Please fill all required Sign Up fields.');
      return;
    }
    const v = this.signUpForm.getRawValue();
    if (v.password !== v.confirmPassword) {
      this.toast.error('Passwords do not match.');
      return;
    }
    this.signUpSubmitting.set(true);
    this.auth
      .register({
        fullName: v.name!,
        email: v.email!,
        mobile: v.mobile!,
        password: v.password!,
        emailVerificationToken: v.emailVerified || undefined,
      })
      .pipe(
        switchMap(() =>
          this.formsApi.submit({
            formType: 'JOIN_NETWORK',
            source: 'WEBSITE',
            contactName: v.name!,
            contactEmail: v.email!,
            contactMobile: v.mobile!,
            payload: {
              category: v.category,
              description: v.description,
              portal: 'join-network',
              nextForm: this.nextFormLink(),
            },
          }),
        ),
      )
      .subscribe({
        next: (res) => {
          this.signUpSubmitting.set(false);
          this.signUpDone.set(true);
          this.registeredEmail.set(v.email!);
          this.applicationRef.set(res.applicationId);
          this.toast.success(`Account created. You are logged in. Ref: ${res.applicationId}`);
        },
        error: (err: Error) => {
          this.signUpSubmitting.set(false);
          this.toast.error(err.message || 'Sign up failed. Please try again.');
        },
      });
  }
}
