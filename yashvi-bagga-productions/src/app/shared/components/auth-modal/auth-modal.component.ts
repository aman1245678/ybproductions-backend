import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { indianMobileValidator } from '../../validators/form.validators';
import { AuthService } from '../../services/auth.service';
import { FormSubmissionService } from '../../services/form-submission.service';
import { EmailOtpComponent } from '../email-otp/email-otp.component';
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs';

type AuthTab = 'login' | 'signup';

/**
 * Log In / Sign Up modal — wired to POST /api/v1/auth/login|register.
 */
@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EmailOtpComponent],
  template: `
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="activeTab() === 'login' ? 'Log in' : 'Sign up'"
      >
        <div
          class="absolute inset-0 bg-brand-black/80 backdrop-blur-md"
          (click)="requestClose()"
        ></div>

        <div
          class="relative z-10 w-full max-w-md rounded-[28px] border border-brand-gold/20 bg-brand-dark/95 backdrop-blur-xl shadow-2xl p-7 sm:p-8 max-h-[90vh] overflow-y-auto animate-slide-up"
        >
          <button
            type="button"
            class="absolute top-5 right-5 text-brand-white/50 hover:text-brand-gold transition-colors"
            aria-label="Close"
            (click)="requestClose()"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="text-center mb-6">
            <span class="block text-brand-gold font-poppins text-xs tracking-[4px] uppercase mb-2">
              Yashvi Bagga Productions
            </span>
            <h2 class="font-playfair text-2xl text-brand-white">
              {{ activeTab() === 'login' ? 'Welcome Back' : 'Create Your Account' }}
            </h2>
          </div>

          <div class="grid grid-cols-2 gap-1 p-1 mb-6 rounded-full border border-brand-white/10 bg-brand-black/40">
            <button
              type="button"
              class="py-2 rounded-full text-sm font-poppins font-medium transition-all duration-300"
              [class.bg-brand-gold]="activeTab() === 'login'"
              [class.text-brand-black]="activeTab() === 'login'"
              [class.text-brand-white]="activeTab() !== 'login'"
              (click)="switchTab('login')"
            >
              Log In
            </button>
            <button
              type="button"
              class="py-2 rounded-full text-sm font-poppins font-medium transition-all duration-300"
              [class.bg-brand-gold]="activeTab() === 'signup'"
              [class.text-brand-black]="activeTab() === 'signup'"
              [class.text-brand-white]="activeTab() !== 'signup'"
              (click)="switchTab('signup')"
            >
              Sign Up
            </button>
          </div>

          @if (submittedMessage()) {
            <div class="text-center py-6">
              <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-brand-white/80 font-poppins leading-7">{{ submittedMessage() }}</p>
              <button
                type="button"
                class="mt-6 px-6 py-2.5 rounded-full bg-brand-gold text-brand-black font-poppins font-medium text-sm hover:bg-brand-pink hover:text-white transition-all duration-300"
                (click)="requestClose()"
              >
                Close
              </button>
            </div>
          } @else if (activeTab() === 'login') {
            <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="space-y-4">
              <div>
                <label class="block text-xs uppercase tracking-wide text-brand-white/50 mb-1.5">Email</label>
                <input
                  type="email"
                  formControlName="email"
                  placeholder="you@example.com"
                  class="w-full rounded-xl border border-brand-white/10 bg-brand-black/50 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:border-brand-gold focus:outline-none transition-colors"
                />
                <div class="mt-2">
                  <app-email-otp
                    formControlName="emailVerified"
                    [destination]="loginForm.get('email')?.value || ''"
                    [destinationValid]="!!loginForm.get('email')?.valid"
                    purpose="auth-login"
                  />
                </div>
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wide text-brand-white/50 mb-1.5">Password</label>
                <input
                  type="password"
                  formControlName="password"
                  placeholder="••••••••"
                  class="w-full rounded-xl border border-brand-white/10 bg-brand-black/50 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:border-brand-gold focus:outline-none transition-colors"
                />
              </div>
              @if (errorMessage()) {
                <p class="text-sm text-red-400">{{ errorMessage() }}</p>
              }
              <button
                type="submit"
                [disabled]="loginForm.invalid || busy()"
                class="w-full rounded-full bg-brand-gold py-3 text-sm font-poppins font-semibold text-brand-black hover:bg-brand-pink hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {{ busy() ? 'Please wait…' : 'Continue' }}
              </button>
              <p class="text-center text-xs text-brand-white/40">
                New here?
                <button type="button" class="text-brand-gold hover:underline" (click)="switchTab('signup')">Create an account</button>
              </p>
            </form>
          } @else {
            <form [formGroup]="signupForm" (ngSubmit)="onSignup()" class="space-y-4">
              <div>
                <label class="block text-xs uppercase tracking-wide text-brand-white/50 mb-1.5">Name</label>
                <input
                  type="text"
                  formControlName="name"
                  placeholder="Your full name"
                  class="w-full rounded-xl border border-brand-white/10 bg-brand-black/50 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:border-brand-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wide text-brand-white/50 mb-1.5">Mobile</label>
                <input
                  type="tel"
                  formControlName="mobile"
                  placeholder="10-digit mobile number"
                  class="w-full rounded-xl border border-brand-white/10 bg-brand-black/50 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:border-brand-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wide text-brand-white/50 mb-1.5">Email</label>
                <input
                  type="email"
                  formControlName="email"
                  placeholder="you@example.com"
                  class="w-full rounded-xl border border-brand-white/10 bg-brand-black/50 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:border-brand-gold focus:outline-none transition-colors"
                />
                <div class="mt-2">
                  <app-email-otp
                    formControlName="emailVerified"
                    [destination]="signupForm.get('email')?.value || ''"
                    [destinationValid]="!!signupForm.get('email')?.valid"
                    purpose="auth-register"
                  />
                </div>
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wide text-brand-white/50 mb-1.5">Password</label>
                <input
                  type="password"
                  formControlName="password"
                  placeholder="Min. 6 characters"
                  class="w-full rounded-xl border border-brand-white/10 bg-brand-black/50 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:border-brand-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wide text-brand-white/50 mb-1.5">Category</label>
                <select
                  formControlName="category"
                  class="w-full rounded-xl border border-brand-white/10 bg-brand-black/50 px-4 py-3 text-sm text-brand-white focus:border-brand-gold focus:outline-none transition-colors"
                >
                  <option value="" disabled>Select a category</option>
                  @for (option of categories; track option) {
                    <option [value]="option" class="bg-brand-dark">{{ option }}</option>
                  }
                </select>
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wide text-brand-white/50 mb-1.5">Describe your requirement</label>
                <textarea
                  formControlName="description"
                  rows="3"
                  placeholder="Briefly describe your requirement…"
                  class="w-full rounded-xl border border-brand-white/10 bg-brand-black/50 px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/30 focus:border-brand-gold focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              @if (errorMessage()) {
                <p class="text-sm text-red-400">{{ errorMessage() }}</p>
              }
              <button
                type="submit"
                [disabled]="signupForm.invalid || busy()"
                class="w-full rounded-full bg-brand-gold py-3 text-sm font-poppins font-semibold text-brand-black hover:bg-brand-pink hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {{ busy() ? 'Creating…' : 'Create Account' }}
              </button>
              <p class="text-center text-xs text-brand-white/40">
                Already registered?
                <button type="button" class="text-brand-gold hover:underline" (click)="switchTab('login')">Log in</button>
              </p>
            </form>
          }
        </div>
      </div>
    }
  `,
})
export class AuthModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly auth = inject(AuthService);
  private readonly formsApi = inject(FormSubmissionService);

  readonly categories = [
    'Actor',
    'Other Media professional seeking opportunity',
    'Media Professional searching for talent pool',
    'Corporates searching for Manpower resources',
    'Candidates searching for Industry jobs',
    'Corporates searching for Training Services',
  ];

  readonly isOpen = signal(false);
  readonly activeTab = signal<AuthTab>('login');
  readonly submittedMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly busy = signal(false);

  @Output() closed = new EventEmitter<void>();

  @Input() set open(value: boolean) {
    this.isOpen.set(value);
    if (value) {
      this.submittedMessage.set(null);
      this.errorMessage.set(null);
      this.busy.set(false);
    }
    this.lockScroll(value);
  }

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    emailVerified: [
      environment.otp.mockMode ? 'mock-verified' : null,
      environment.otp.mockMode ? [] : Validators.required,
    ],
  });

  readonly signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    mobile: ['', [Validators.required, indianMobileValidator()]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    category: ['', Validators.required],
    description: [''],
    emailVerified: [
      environment.otp.mockMode ? 'mock-verified' : null,
      environment.otp.mockMode ? [] : Validators.required,
    ],
  });

  switchTab(tab: AuthTab): void {
    this.activeTab.set(tab);
    this.submittedMessage.set(null);
    this.errorMessage.set(null);
  }

  onLogin(): void {
    if (this.loginForm.invalid || this.busy()) return;
    const { email, password, emailVerified } = this.loginForm.getRawValue();
    this.busy.set(true);
    this.errorMessage.set(null);
    this.auth.login(email!, password!, emailVerified || undefined).subscribe({
      next: (res) => {
        this.busy.set(false);
        this.submittedMessage.set(`Welcome back, ${res.user.fullName}. You are logged in.`);
      },
      error: (err: Error) => {
        this.busy.set(false);
        this.errorMessage.set(err.message || 'Login failed.');
      },
    });
  }

  onSignup(): void {
    if (this.signupForm.invalid || this.busy()) return;
    const v = this.signupForm.getRawValue();
    this.busy.set(true);
    this.errorMessage.set(null);
    this.auth
      .register({
        fullName: v.name!,
        email: v.email!,
        mobile: v.mobile!,
        password: v.password!,
        emailVerificationToken: v.emailVerified || undefined,
      })
      .pipe(
        switchMap((res) =>
          this.formsApi.submit({
            formType: 'JOIN_NETWORK',
            source: 'WEBSITE',
            contactName: v.name!,
            contactEmail: v.email!,
            contactMobile: v.mobile!,
            payload: {
              category: v.category,
              description: v.description,
              portal: 'auth-modal',
              userId: res.user.id,
            },
          }),
        ),
      )
      .subscribe({
        next: () => {
          this.busy.set(false);
          this.submittedMessage.set(
            `Welcome, ${v.name}! Your login credentials are active — use your email and password to sign in anytime.`,
          );
        },
        error: (err: Error) => {
          this.busy.set(false);
          this.errorMessage.set(err.message || 'Sign up failed.');
        },
      });
  }

  requestClose(): void {
    this.lockScroll(false);
    this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.requestClose();
    }
  }

  private lockScroll(lock: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.body.style.overflow = lock ? 'hidden' : '';
  }
}
