import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { ToastService } from '../../shared/services/toast.service';
import { FormSubmissionService } from '../../shared/services/form-submission.service';
import { indianMobileValidator } from '../../shared/validators/form.validators';
import { INTAKE_FORMS, IntakeField, IntakeFormDef } from '../../shared/models/intake-forms.model';
import { SLUG_TO_CREW_TRACK } from '../../shared/services/form-submission.service';
import { saveLocalApplication } from '../../shared/utils/application-id.util';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { DocumentUpload, AllowedFileKind } from '../../shared/models/document-upload.model';

@Component({
  selector: 'app-intake-wizard',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FileUploadComponent],
  template: `
    @if (!def) {
      <section class="section-padding bg-brand-black pt-32 text-center">
        <p class="text-brand-white/60">Form not found.</p>
        <a [routerLink]="cancelLink" class="mt-4 inline-block text-brand-gold">Back</a>
      </section>
    } @else if (submittedId()) {
      <section class="section-padding bg-brand-black pt-32">
        <div class="max-w-xl mx-auto px-6 text-center rounded-[28px] border border-brand-gold/20 bg-brand-dark/80 p-10">
          <p class="text-brand-gold text-xs uppercase tracking-[0.28em] mb-3">Submitted</p>
          <h1 class="heading-lg text-brand-white mb-4">Thank you!</h1>
          <p class="text-brand-white/60 text-sm mb-6">{{ def.successNote }}</p>
          <p class="text-brand-white/50 text-xs uppercase tracking-[0.2em] mb-2">Your Application ID</p>
          <p class="font-playfair text-2xl text-brand-gold mb-8">{{ submittedId() }}</p>
          <p class="text-brand-white/45 text-xs mb-8">Save this ID. A confirmation email/SMS will be sent shortly.</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a routerLink="/get-started" class="rounded-full bg-brand-gold px-6 py-3 text-brand-black font-medium hover:bg-brand-white transition-colors">Get Started Home</a>
            <a routerLink="/" class="rounded-full border border-brand-white/20 px-6 py-3 text-brand-white hover:border-brand-gold hover:text-brand-gold transition-colors">Home</a>
          </div>
        </div>
      </section>
    } @else {
      <section class="relative overflow-hidden bg-brand-black pt-28 pb-8">
        <div class="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span class="inline-block text-brand-gold font-poppins text-xs tracking-[0.28em] uppercase mb-3">{{ def.eyebrow }}</span>
          <h1 class="heading-xl text-brand-white mb-3">{{ def.title }}</h1>
          <p class="body-lg text-brand-white/60">{{ def.description }}</p>
        </div>
      </section>

      <section class="section-padding bg-brand-dark relative overflow-hidden">
        <div class="relative max-w-3xl mx-auto px-6">
          <ol class="mb-10 flex flex-wrap gap-2 justify-center">
            @for (s of def.steps; track s.title; let i = $index) {
              <li
                class="rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]"
                [class.border-brand-gold]="step() === i"
                [class.text-brand-gold]="step() === i"
                [class.bg-brand-gold/10]="step() === i"
                [class.border-white/15]="step() !== i"
                [class.text-brand-white/40]="step() < i"
                [class.text-brand-white/70]="step() > i"
              >
                {{ i + 1 }}. {{ s.title }}
              </li>
            }
          </ol>

          <form [formGroup]="form" class="glass-card p-6 md:p-10 space-y-5" (ngSubmit)="onSubmit()">
            <div>
              <h2 class="text-xl font-playfair text-brand-white">{{ currentStep().title }}</h2>
              @if (currentStep().subtitle) {
                <p class="mt-1 text-brand-white/50 text-sm">{{ currentStep().subtitle }}</p>
              }
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              @for (field of currentStep().fields; track field.key) {
                <div [class.md:col-span-2]="field.fullWidth || field.type === 'textarea' || field.type === 'chips' || field.type === 'checkbox'">
                  @if (field.type === 'checkbox') {
                    <label class="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" [formControlName]="field.key" class="mt-1 accent-[#d4af37]" />
                      <span class="text-brand-white/70 text-sm leading-6">{{ field.label }}</span>
                    </label>
                  } @else if (field.type === 'file') {
                    <app-file-upload
                      [formControlName]="field.key"
                      [label]="field.label + (field.required ? ' *' : '')"
                      [multiple]="field.multiple !== false"
                      [accept]="fileAccept(field)"
                      [maxSizeMb]="field.maxSizeMb || 25"
                      [purpose]="field.purpose || 'attachment'"
                    />
                  } @else if (field.type === 'chips') {
                    <p class="block text-brand-white/60 font-poppins text-sm mb-2">{{ field.label }} @if (field.required) { * }</p>
                    <div class="flex flex-wrap gap-2">
                      @for (opt of field.options || []; track opt) {
                        <button
                          type="button"
                          class="rounded-full border px-3 py-1.5 text-xs font-poppins transition-colors"
                          [class.border-brand-gold]="isChipOn(field.key, opt)"
                          [class.text-brand-gold]="isChipOn(field.key, opt)"
                          [class.bg-brand-gold/10]="isChipOn(field.key, opt)"
                          [class.border-white/10]="!isChipOn(field.key, opt)"
                          [class.text-brand-white/60]="!isChipOn(field.key, opt)"
                          (click)="toggleChip(field.key, opt)"
                        >{{ opt }}</button>
                      }
                    </div>
                  } @else {
                    <label class="block text-brand-white/60 font-poppins text-sm mb-2">{{ field.label }} @if (field.required) { * }</label>
                    @if (field.type === 'textarea') {
                      <textarea
                        [formControlName]="field.key"
                        rows="4"
                        [placeholder]="field.placeholder || ''"
                        class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none resize-y"
                      ></textarea>
                    } @else if (field.type === 'select') {
                      <select
                        [formControlName]="field.key"
                        class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none"
                      >
                        <option value="">Select</option>
                        @for (opt of field.options || []; track opt) {
                          <option [value]="opt">{{ opt }}</option>
                        }
                      </select>
                    } @else {
                      <input
                        [formControlName]="field.key"
                        [type]="field.type"
                        [placeholder]="field.placeholder || ''"
                        class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none"
                      />
                    }
                  }
                </div>
              }
            </div>

            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              @if (step() > 0) {
                <button type="button" (click)="prev()" class="rounded-full border border-brand-white/20 px-6 py-3 text-brand-white hover:border-brand-gold hover:text-brand-gold transition-colors">
                  Back
                </button>
              }
              @if (step() < def.steps.length - 1) {
                <button type="button" (click)="next()" class="rounded-full bg-brand-gold px-8 py-3 font-medium text-brand-black hover:bg-brand-white transition-colors">
                  Continue
                </button>
              } @else {
                <button type="submit" [disabled]="submitting()" class="rounded-full bg-brand-gold px-8 py-3 font-medium text-brand-black hover:bg-brand-white transition-colors disabled:opacity-50">
                  @if (submitting()) { Submitting… } @else { Submit }
                </button>
              }
              <a [routerLink]="cancelLink" class="sm:ml-auto self-center text-sm text-brand-white/40 hover:text-brand-gold">Cancel</a>
            </div>
          </form>
        </div>
      </section>
    }
  `,
  styles: [`:host { display: block; }`],
})
export class IntakeWizardComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly seo = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly formsApi = inject(FormSubmissionService);
  private readonly platformId = inject(PLATFORM_ID);

  def: IntakeFormDef | null = null;
  form = this.fb.group({});
  step = signal(0);
  submittedId = signal<string | null>(null);
  submitting = signal(false);
  private chipState: Record<string, string[]> = {};
  private formSlug = '';

  /** Crew category forms return to Film/TV Crew hub; others to Get Started. */
  get cancelLink(): string {
    return SLUG_TO_CREW_TRACK[this.formSlug] ? '/talent-network' : '/get-started';
  }

  currentStep = computed(() => this.def!.steps[this.step()]);

  ngOnInit(): void {
    const slug = this.route.snapshot.data['formSlug'] as string;
    this.formSlug = slug;
    this.def = INTAKE_FORMS[slug] ?? null;
    if (!this.def) return;

    this.seo.updateMetaTags({
      title: `${this.def.title} | YASHVI BAGGA PRODUCTIONS`,
      description: this.def.description,
    });

    const controls: Record<string, unknown> = {};
    for (const s of this.def.steps) {
      for (const f of s.fields) {
        controls[f.key] = this.controlFor(f);
        if (f.type === 'chips') this.chipState[f.key] = [];
      }
    }
    this.form = this.fb.group(controls);
  }

  private controlFor(f: IntakeField) {
    if (f.type === 'chips') return [[] as string[]];
    if (f.type === 'file') return [f.multiple === false ? null : ([] as DocumentUpload[])];
    if (f.type === 'checkbox') return [false, f.required ? Validators.requiredTrue : []];
    const vals = [];
    if (f.required) vals.push(Validators.required);
    if (f.type === 'email') vals.push(Validators.email);
    if (f.type === 'tel' && f.required) vals.push(indianMobileValidator());
    return ['', vals];
  }

  isChipOn(key: string, opt: string): boolean {
    return (this.chipState[key] || []).includes(opt);
  }

  fileAccept(field: IntakeField): AllowedFileKind[] {
    return field.accept?.length ? field.accept : ['mp4', 'jpg', 'png', 'pdf'];
  }

  toggleChip(key: string, opt: string): void {
    const cur = this.chipState[key] || [];
    this.chipState[key] = cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt];
    this.form.get(key)?.setValue(this.chipState[key]);
    this.form.get(key)?.markAsTouched();
  }

  private stepFieldsValid(): boolean {
    if (!this.def) return false;
    const fields = this.def.steps[this.step()].fields;
    for (const f of fields) {
      const c = this.form.get(f.key);
      if (!c) continue;
      c.markAsTouched();
      if (f.type === 'chips' && f.required) {
        if (!(this.chipState[f.key]?.length)) {
          this.toast.error(`Please select: ${f.label}`);
          return false;
        }
      } else if (f.type === 'file' && f.required) {
        const raw = c.value as DocumentUpload | DocumentUpload[] | null;
        const files = Array.isArray(raw) ? raw : raw ? [raw] : [];
        const ready = files.filter((x) => x.status === 'uploaded' || !!x.url);
        if (!ready.length) {
          this.toast.error(`Please upload: ${f.label}`);
          return false;
        }
      } else if (f.required && c.invalid) {
        this.toast.error(`Please complete: ${f.label}`);
        return false;
      }
    }
    return true;
  }

  next(): void {
    if (!this.stepFieldsValid()) return;
    this.step.update((s) => Math.min(s + 1, (this.def?.steps.length ?? 1) - 1));
  }

  prev(): void {
    this.step.update((s) => Math.max(s - 1, 0));
  }

  onSubmit(): void {
    if (!this.def || !this.stepFieldsValid() || this.submitting()) return;
    this.submitting.set(true);

    const payload = { ...this.form.getRawValue(), ...this.chipState } as Record<string, unknown>;

    let body;
    try {
      body = this.formsApi.buildFromIntake(this.formSlug, payload);
    } catch (err) {
      this.submitting.set(false);
      this.toast.error(err instanceof Error ? err.message : 'Invalid form');
      return;
    }

    if (!body.contactName || !body.contactEmail) {
      this.submitting.set(false);
      this.toast.error('Name and email are required.');
      return;
    }

    this.formsApi.submit(body).subscribe({
      next: (res) => {
        if (isPlatformBrowser(this.platformId)) {
          saveLocalApplication({
            id: res.applicationId,
            type: this.def!.idType,
            title: this.def!.title,
            payload,
            createdAt: new Date().toISOString(),
            status: 'Submitted',
          });
        }
        this.submitting.set(false);
        this.submittedId.set(res.applicationId);
        this.toast.success(`Application submitted: ${res.applicationId}`);
      },
      error: (err: Error) => {
        this.submitting.set(false);
        this.toast.error(err.message || 'Could not submit. Please try again.');
      },
    });
  }
}
