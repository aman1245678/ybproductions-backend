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
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-join-network',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ScrollAnimationDirective, SectionHeaderComponent, EmailOtpComponent],
  templateUrl: './join-network.component.html',
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
