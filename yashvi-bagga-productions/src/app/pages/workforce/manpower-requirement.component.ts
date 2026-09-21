import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';
import { CaptchaComponent } from '../../shared/components/captcha/captcha.component';
import { RequirementTextareaComponent } from '../../shared/components/requirement-textarea/requirement-textarea.component';
import { EmailOtpComponent } from '../../shared/components/email-otp/email-otp.component';
import { MobileOtpComponent } from '../../shared/components/mobile-otp/mobile-otp.component';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { SkillTagsComponent } from '../../shared/components/skill-tags/skill-tags.component';
import { ToastService } from '../../shared/services/toast.service';
import { ApplicationService } from '../../shared/services/application.service';
import { indianMobileValidator } from '../../shared/validators/form.validators';
import { COMPENSATION_RANGES, EXPERIENCE_LEVELS, INDUSTRIES, labelOf } from '../../shared/models/taxonomy.model';
import { OutsourcingRequirement, WorkforceRole } from '../../shared/models/outsourcing-requirement.model';
import { DocumentUpload } from '../../shared/models/document-upload.model';

interface WizardStep {
  index: number;
  title: string;
  subtitle: string;
}

/**
 * MODULE 4 — Manpower Requirement Portal.
 *
 * A six-step requirement wizard for organisations sourcing workforce:
 *   1 Organization Information · 2 Workforce Requirements · 3 Deployment Details
 *   4 Compensation · 5 Verification · 6 Submission (review).
 *
 * Per-step validation gates navigation; the final review submits an
 * OutsourcingRequirement through the shared ApplicationService.
 */
@Component({
  selector: 'app-manpower-requirement',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule, CaptchaComponent,
    RequirementTextareaComponent, EmailOtpComponent, MobileOtpComponent,
    FileUploadComponent, SkillTagsComponent,
  ],
  templateUrl: './manpower-requirement.component.html',
  styles: [`
    :host { display: block; }
    .form-input {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 0.75rem;
      padding: 0.75rem 1rem;
      color: #fff;
      font-family: 'Poppins', sans-serif;
      font-size: 0.875rem;
      transition: border-color .2s ease;
    }
    .form-input:focus { outline: none; border-color: #d4af37; }
  `],
})
export class ManpowerRequirementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly seoService = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly applications = inject(ApplicationService);

  @ViewChild('captchaRef') private captcha?: CaptchaComponent;

  readonly industries = INDUSTRIES;
  readonly experienceLevels = EXPERIENCE_LEVELS;
  readonly compensationRanges = COMPENSATION_RANGES;

  readonly steps: WizardStep[] = [
    { index: 0, title: 'Org', subtitle: 'Organization Information' },
    { index: 1, title: 'Workforce', subtitle: 'Workforce Requirements' },
    { index: 2, title: 'Deploy', subtitle: 'Deployment Details' },
    { index: 3, title: 'Budget', subtitle: 'Compensation' },
    { index: 4, title: 'Verify', subtitle: 'Verification' },
    { index: 5, title: 'Submit', subtitle: 'Review & Submission' },
  ];

  step = signal(0);
  submitted = signal(false);
  submitting = signal(false);

  stepReached(index: number): boolean {
    return this.step() >= index;
  }

  stepUpcoming(index: number): boolean {
    return this.step() < index;
  }

  stepDone(index: number): boolean {
    return this.step() > index;
  }

  canRemoveRole(): boolean {
    return this.roles.length > 1;
  }

  form = this.fb.group({
    organization: this.fb.group({
      organizationName: ['', Validators.required],
      industry: ['', Validators.required],
      contactPerson: ['', Validators.required],
      companySize: [''],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, indianMobileValidator()]],
      website: [''],
    }),
    roles: this.fb.array([this.buildRole()]),
    deployment: this.fb.group({
      location: [''],
      workMode: [''],
      startDate: [''],
      duration: [''],
    }),
    compensation: this.fb.group({
      budgetRange: ['', Validators.required],
      compensationNotes: [''],
    }),
    emailVerified: [null, Validators.required],
    mobileVerified: [null, Validators.required],
    captcha: [''],
    requirement: ['', Validators.required],
    attachments: [null as DocumentUpload[] | null],
  });

  get orgGroup(): FormGroup {
    return this.form.get('organization') as FormGroup;
  }
  get roles(): FormArray {
    return this.form.get('roles') as FormArray;
  }

  readonly totalHeadcount = signal(0);

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Manpower Requirement | YASHVI BAGGA PRODUCTIONS',
      description: 'Submit a workforce / manpower outsourcing requirement through our guided multi-step portal.',
      url: 'https://yashvibagga.com/manpower-requirement',
    });
    this.recountHeadcount();
    this.roles.valueChanges.subscribe(() => this.recountHeadcount());
  }

  private buildRole(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      count: [1, [Validators.required, Validators.min(1)]],
      experienceLevel: [''],
      skills: [[] as string[]],
    });
  }

  addRole(): void {
    this.roles.push(this.buildRole());
  }

  removeRole(i: number): void {
    this.roles.removeAt(i);
    this.recountHeadcount();
  }

  private recountHeadcount(): void {
    const total = this.roles.controls.reduce((sum, c) => sum + (Number(c.get('count')?.value) || 0), 0);
    this.totalHeadcount.set(total);
  }

  industryLabel(): string {
    return labelOf(INDUSTRIES, this.orgGroup?.get('industry')?.value);
  }
  budgetLabel(): string {
    return labelOf(COMPENSATION_RANGES, this.form.get('compensation.budgetRange')?.value);
  }

  // --- step navigation ------------------------------------------------------
  next(): void {
    if (!this.validateStep(this.step())) {
      this.toast.error('Please complete the required fields on this step.');
      return;
    }
    this.step.set(Math.min(5, this.step() + 1));
    this.scrollUp();
  }

  prev(): void {
    this.step.set(Math.max(0, this.step() - 1));
    this.scrollUp();
  }

  private validateStep(index: number): boolean {
    const targets: Array<{ ctrl: 'organization' | 'roles' | 'deployment' | 'compensation' } | { fields: string[] }> = [
      { ctrl: 'organization' },
      { ctrl: 'roles' },
      { ctrl: 'deployment' },
      { ctrl: 'compensation' },
      { fields: ['emailVerified', 'mobileVerified'] },
      { fields: ['requirement'] },
    ];
    const target = targets[index];
    if ('ctrl' in target) {
      const group = this.form.get(target.ctrl);
      group?.markAllAsTouched();
      return !!group?.valid;
    }
    let ok = true;
    for (const f of target.fields) {
      const c = this.form.get(f);
      c?.markAsTouched();
      ok = ok && !!c?.valid;
    }
    return ok;
  }

  private scrollUp(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async submit(): Promise<void> {
    if (!this.validateStep(5) || this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('Please complete all required fields before submitting.');
      return;
    }
    if ((await this.captcha?.execute()) === false) {
      return;
    }

    this.submitting.set(true);
    const loadingId = this.toast.loading('Submitting your requirement…');

    const org = this.orgGroup.getRawValue();
    const dep = (this.form.get('deployment') as FormGroup).getRawValue();
    const comp = (this.form.get('compensation') as FormGroup).getRawValue();

    const requirement: OutsourcingRequirement = {
      organizationName: org.organizationName,
      industry: org.industry,
      contactPerson: org.contactPerson,
      email: org.email,
      mobile: org.mobile,
      website: org.website || undefined,
      companySize: org.companySize || undefined,
      roles: this.roles.getRawValue() as WorkforceRole[],
      totalHeadcount: this.totalHeadcount(),
      location: dep.location || undefined,
      workMode: dep.workMode || undefined,
      startDate: dep.startDate || undefined,
      duration: dep.duration || undefined,
      budgetRange: comp.budgetRange,
      compensationNotes: comp.compensationNotes || undefined,
      requirement: (this.form.get('requirement')?.value as string) ?? undefined,
      attachments: (this.form.get('attachments')?.value as DocumentUpload[] | null) ?? [],
    };

    this.applications.submitOutsourcingRequirement(requirement).subscribe({
      next: () => {
        this.toast.update(loadingId, 'success', 'Thank you! Your requirement has been received.');
        this.submitted.set(true);
        this.submitting.set(false);
      },
      error: () => {
        this.toast.update(loadingId, 'error', 'Something went wrong. Please try again shortly.');
        this.submitting.set(false);
      },
    });
  }
}
