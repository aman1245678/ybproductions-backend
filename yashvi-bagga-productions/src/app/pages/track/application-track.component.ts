import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormSubmissionService } from '../../shared/services/form-submission.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-application-track',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="bg-brand-dark border-t border-white/5 py-12 px-6">
      <div class="max-w-xl mx-auto">
        <h2 class="text-xl font-playfair text-brand-white mb-2">Track Your Application</h2>
        <p class="text-brand-white/50 font-poppins text-sm mb-6">
          Enter your reference ID (e.g. YBP-BR-20260805-0001) from the confirmation message.
        </p>
        <form [formGroup]="form" (ngSubmit)="lookup()" class="flex flex-col sm:flex-row gap-3">
          <input
            formControlName="applicationId"
            type="text"
            class="flex-1 bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none"
            placeholder="Application reference ID"
          />
          <button
            type="submit"
            [disabled]="form.invalid || busy()"
            class="px-6 py-3 bg-brand-gold text-brand-black font-poppins font-semibold text-sm rounded-full hover:bg-brand-white transition-colors disabled:opacity-50"
          >
            {{ busy() ? 'Checking…' : 'Check Status' }}
          </button>
        </form>
        @if (result()) {
          <div class="mt-6 rounded-2xl border border-brand-gold/20 bg-brand-black/60 p-6 space-y-2">
            <p class="text-brand-gold font-poppins text-xs uppercase tracking-wider">Reference</p>
            <p class="text-brand-white font-mono text-sm">{{ result()!.applicationId }}</p>
            <p class="text-brand-white/60 font-poppins text-sm">{{ result()!.title }}</p>
            <p class="text-brand-white font-poppins text-sm">
              Status: <span class="text-brand-gold font-medium">{{ result()!.status }}</span>
            </p>
            <p class="text-brand-white/40 font-poppins text-xs">Submitted: {{ result()!.createdAtUtc }}</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class ApplicationTrackComponent {
  private readonly fb = inject(FormBuilder);
  private readonly formsApi = inject(FormSubmissionService);
  private readonly toast = inject(ToastService);

  busy = signal(false);
  result = signal<{
    applicationId: string;
    title: string;
    status: string;
    createdAtUtc: string;
  } | null>(null);

  form = this.fb.group({
    applicationId: ['', [Validators.required, Validators.minLength(8)]],
  });

  lookup(): void {
    if (this.form.invalid) return;
    this.busy.set(true);
    this.result.set(null);
    const id = this.form.value.applicationId!.trim();
    this.formsApi.lookupByCode(id).subscribe({
      next: (res) => {
        this.busy.set(false);
        this.result.set(res);
      },
      error: (err: Error) => {
        this.busy.set(false);
        this.toast.error(err.message || 'Application not found.');
      },
    });
  }
}
