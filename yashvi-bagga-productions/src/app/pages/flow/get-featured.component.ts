import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { ToastService } from '../../shared/services/toast.service';
import { FormSubmissionService } from '../../shared/services/form-submission.service';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { indianMobileValidator } from '../../shared/validators/form.validators';
import { DocumentUpload } from '../../shared/models/document-upload.model';
import { saveLocalApplication } from '../../shared/utils/application-id.util';

@Component({
  selector: 'app-get-featured',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FileUploadComponent],
  template: `
    @if (submittedId()) {
      <section class="section-padding bg-brand-black pt-32">
        <div class="max-w-xl mx-auto px-6 text-center rounded-[28px] border border-brand-gold/20 bg-brand-dark/80 p-10">
          <p class="text-brand-gold text-xs uppercase tracking-[0.28em] mb-3">Submitted</p>
          <h1 class="heading-lg text-brand-white mb-4">Thank you!</h1>
          <p class="text-brand-white/60 text-sm mb-6">
            Our team will review your profile for showcase and collaboration opportunities.
          </p>
          <p class="text-brand-white/50 text-xs uppercase tracking-[0.2em] mb-2">Your Application ID</p>
          <p class="font-playfair text-2xl text-brand-gold mb-8">{{ submittedId() }}</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a routerLink="/" class="rounded-full bg-brand-gold px-6 py-3 text-brand-black font-medium hover:bg-brand-white transition-colors">Back to Home</a>
          </div>
        </div>
      </section>
    } @else {
      <section class="relative overflow-hidden bg-brand-black pt-32 pb-10">
        <div class="absolute top-20 right-10 h-64 w-64 rounded-full bg-brand-pink/10 blur-[100px]"></div>
        <div class="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span class="inline-block text-brand-gold font-poppins text-xs tracking-[0.28em] uppercase mb-3">Showcase</span>
          <h1 class="heading-xl text-brand-white mb-3">Get Featured</h1>
          <p class="body-lg text-brand-white/60 max-w-2xl mx-auto">
            Share your story, talent or brand for a chance to be featured on Yashvi Bagga Productions platforms.
          </p>
        </div>
      </section>

      <section class="section-padding bg-brand-dark relative">
        <div class="max-w-2xl mx-auto px-6">
          <form [formGroup]="form" class="glass-card p-6 md:p-10 space-y-5" (ngSubmit)="submit()">
            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Full Name *</label>
                <input formControlName="fullName" type="text" class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none" />
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Email *</label>
                <input formControlName="email" type="email" class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none" />
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Mobile *</label>
                <input formControlName="mobile" type="tel" class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none" />
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">City *</label>
                <input formControlName="city" type="text" class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Category *</label>
                <select formControlName="category" class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none">
                  <option value="">Select category</option>
                  @for (cat of categories; track cat) {
                    <option [value]="cat">{{ cat }}</option>
                  }
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Instagram / Social Link</label>
                <input formControlName="socialLink" type="text" placeholder="https://instagram.com/..." class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Tell us about yourself *</label>
                <textarea formControlName="about" rows="4" class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none resize-y"></textarea>
              </div>
              <div class="md:col-span-2">
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Why should we feature you? *</label>
                <textarea formControlName="pitch" rows="3" class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none resize-y"></textarea>
              </div>
              <div class="md:col-span-2">
                <app-file-upload
                  formControlName="media"
                  label="Upload Photo / Video / Portfolio (JPG, PNG, MP4 or PDF) *"
                  [multiple]="true"
                  [accept]="['jpg', 'png', 'mp4', 'pdf']"
                  [maxSizeMb]="80"
                  purpose="get-featured-media"
                />
              </div>
              <div class="md:col-span-2">
                <label class="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" formControlName="declaration" class="mt-1 accent-[#d4af37]" />
                  <span class="text-brand-white/70 text-sm leading-6">
                    I confirm the information is accurate and authorize YBP to contact me and use submitted materials for showcase review.
                  </span>
                </label>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <button type="submit" [disabled]="submitting()" class="rounded-full bg-brand-gold px-8 py-3 font-medium text-brand-black hover:bg-brand-white transition-colors disabled:opacity-50">
                @if (submitting()) { Submitting… } @else { Submit Application }
              </button>
              <a routerLink="/" class="sm:ml-auto self-center text-sm text-brand-white/40 hover:text-brand-gold">Cancel</a>
            </div>
          </form>
        </div>
      </section>
    }
  `,
  styles: [`:host { display: block; }`],
})
export class GetFeaturedComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly seo = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly formsApi = inject(FormSubmissionService);

  submittedId = signal<string | null>(null);
  submitting = signal(false);

  readonly categories = [
    'Actor / Performer',
    'Influencer / Content Creator',
    'Brand / Business',
    'Creative Professional',
    'Film & TV Project',
    'Social Cause / NGO',
    'Other',
  ];

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, indianMobileValidator()]],
    city: ['', Validators.required],
    category: ['', Validators.required],
    socialLink: [''],
    about: ['', Validators.required],
    pitch: ['', Validators.required],
    media: [[] as DocumentUpload[], Validators.required],
    declaration: [false, Validators.requiredTrue],
  });

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: 'Get Featured | YASHVI BAGGA PRODUCTIONS',
      description: 'Apply to be featured on Yashvi Bagga Productions — share your talent, brand or story.',
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('Please complete all required fields.');
      return;
    }

    const raw = this.form.getRawValue();
    const media = raw.media as DocumentUpload[];
    if (!media?.length) {
      this.toast.error('Please upload at least one photo, video or document.');
      return;
    }

    this.submitting.set(true);
    const payload = {
      intent: 'get-featured',
      category: raw.category,
      socialLink: raw.socialLink,
      about: raw.about,
      pitch: raw.pitch,
      media,
      city: raw.city,
    };

    this.formsApi
      .submit({
        formType: 'FILM_TV_TALENT',
        contactName: raw.fullName!,
        contactEmail: raw.email!,
        contactMobile: raw.mobile!,
        payload,
      })
      .subscribe({
        next: (res) => {
          this.submitting.set(false);
          this.submittedId.set(res.applicationId);
          saveLocalApplication({
            id: res.applicationId,
            type: 'FEATURED',
            title: 'Get Featured',
            payload,
            createdAt: new Date().toISOString(),
            status: 'Submitted',
          });
          this.toast.success('Application submitted successfully!');
        },
        error: (err: Error) => {
          this.submitting.set(false);
          this.toast.error(err.message || 'Submission failed. Please try again.');
        },
      });
  }
}
