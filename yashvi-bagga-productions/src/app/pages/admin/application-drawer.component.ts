import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApplication, AdminService } from '../../shared/services/admin.service';
import { ToastService } from '../../shared/services/toast.service';
import { environment } from '../../../environments/environment';
import {
  APPLICATION_STATUSES,
  initials,
  readPayload,
  statusChip,
  statusLabel,
  applicationDisplayTitle,
} from './admin-ui';

/** Right-side slide-over showing one submission with everything the team needs. */
@Component({
  selector: 'app-application-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 z-[90] flex justify-end">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" (click)="close.emit()"></div>

      <aside
        class="relative h-full w-full max-w-xl overflow-y-auto border-l border-brand-gold/15 bg-brand-dark shadow-[-24px_0_60px_rgba(0,0,0,0.5)] animate-[slideIn_.25s_ease-out]"
      >
        <header class="sticky top-0 z-10 border-b border-white/8 bg-brand-dark/95 px-6 py-5 backdrop-blur">
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-3">
              <span
                class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gold/12 font-medium text-brand-gold ring-1 ring-brand-gold/20"
              >{{ avatar() }}</span>
              <div>
                <h3 class="font-playfair text-xl leading-tight">{{ app().contactName }}</h3>
                <p class="mt-0.5 font-mono text-xs text-brand-gold/80">{{ app().applicationId }}</p>
              </div>
            </div>
            <button
              type="button"
              (click)="close.emit()"
              class="rounded-lg p-2 text-brand-white/40 transition hover:bg-white/5 hover:text-brand-white"
              aria-label="Close"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
          </div>

          <div class="mt-4 flex flex-wrap items-center gap-2">
            <span class="rounded-full px-2.5 py-1 text-[11px] ring-1 {{ chip(app().status) }}">{{ label(app().status) }}</span>
            <span class="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-brand-white/60 ring-1 ring-white/10">{{ displayTitle(app()) }}</span>
            <span class="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-brand-white/60 ring-1 ring-white/10">{{ app().source }}</span>
            <span class="text-[11px] text-brand-white/35">{{ app().createdAtUtc | date: 'medium' }}</span>
          </div>
        </header>

        <div class="space-y-6 px-6 py-6">
          <!-- Quick actions -->
          <section class="grid grid-cols-3 gap-2">
            <a
              [href]="'mailto:' + app().contactEmail"
              class="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-xs text-brand-white/70 transition hover:border-brand-gold/30 hover:text-brand-gold"
            >
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="1.8" d="M3 7l9 6 9-6M3 7v10h18V7H3z"/></svg>
              Email
            </a>
            <a
              [href]="'tel:' + (app().contactMobile || '')"
              [class.pointer-events-none]="!app().contactMobile"
              [class.opacity-40]="!app().contactMobile"
              class="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-xs text-brand-white/70 transition hover:border-brand-gold/30 hover:text-brand-gold"
            >
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="1.8" d="M4 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4c-9 0-16-7-16-16z"/></svg>
              Call
            </a>
            <a
              [href]="whatsappLink()"
              target="_blank"
              rel="noopener"
              [class.pointer-events-none]="!app().contactMobile && !app().contactWhatsapp"
              [class.opacity-40]="!app().contactMobile && !app().contactWhatsapp"
              class="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-xs text-brand-white/70 transition hover:border-emerald-400/30 hover:text-emerald-300"
            >
              <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.7 15L2 22l5.2-1.3A10 10 0 1012 2zm0 2a8 8 0 11-4.2 14.8l-.4-.2-2.8.7.7-2.7-.2-.4A8 8 0 0112 4z"/></svg>
              WhatsApp
            </a>
          </section>

          <!-- Status workflow -->
          <section class="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p class="mb-3 text-[11px] uppercase tracking-[0.2em] text-brand-white/40">Update status</p>
            <div class="flex flex-wrap gap-2">
              @for (s of statuses; track s) {
                <button
                  type="button"
                  (click)="pending.set(s)"
                  class="rounded-full px-3 py-1.5 text-[11px] ring-1 transition"
                  [class]="pending() === s ? chip(s) + ' ring-2' : 'bg-white/[0.03] text-brand-white/50 ring-white/10 hover:text-brand-white'"
                >{{ label(s) }}</button>
              }
            </div>
            <input
              [(ngModel)]="note"
              placeholder="Optional note (sent in the update email)"
              class="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none transition focus:border-brand-gold/40"
            />
            <button
              type="button"
              (click)="save()"
              [disabled]="saving() || pending() === app().status"
              class="mt-3 w-full rounded-xl bg-brand-gold py-2.5 text-sm font-medium text-brand-black transition hover:bg-brand-gold/90 disabled:opacity-40"
            >
              {{ saving() ? 'Saving…' : pending() === app().status ? 'Pick a new status' : 'Save & notify applicant' }}
            </button>
          </section>

          <!-- Contact -->
          <section>
            <p class="mb-3 text-[11px] uppercase tracking-[0.2em] text-brand-white/40">Contact</p>
            <dl class="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
              <div class="bg-brand-dark px-4 py-3">
                <dt class="text-[11px] text-brand-white/40">Email</dt>
                <dd class="mt-0.5 break-all text-sm">{{ app().contactEmail }}</dd>
              </div>
              <div class="bg-brand-dark px-4 py-3">
                <dt class="text-[11px] text-brand-white/40">Mobile</dt>
                <dd class="mt-0.5 text-sm">{{ app().contactMobile || '—' }}</dd>
              </div>
              <div class="bg-brand-dark px-4 py-3">
                <dt class="text-[11px] text-brand-white/40">Company</dt>
                <dd class="mt-0.5 text-sm">{{ app().companyName || '—' }}</dd>
              </div>
              <div class="bg-brand-dark px-4 py-3">
                <dt class="text-[11px] text-brand-white/40">Preferred channel</dt>
                <dd class="mt-0.5 text-sm">{{ channels() }}</dd>
              </div>
            </dl>
          </section>

          <!-- Attachments -->
          @if (payload().attachments.length) {
            <section>
              <p class="mb-3 text-[11px] uppercase tracking-[0.2em] text-brand-white/40">
                Attachments · {{ payload().attachments.length }}
              </p>
              <ul class="space-y-2">
                @for (file of payload().attachments; track file.url) {
                  <li class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                    <span class="grid h-9 w-9 place-items-center rounded-lg bg-brand-gold/10 text-brand-gold">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="1.8" d="M14 3v5h5M6 3h9l5 5v13H6V3z"/></svg>
                    </span>
                    <span class="min-w-0 flex-1">
                      <span class="block truncate text-sm">{{ file.name }}</span>
                      <span class="text-[11px] text-brand-white/40">{{ file.label }} · {{ file.kind }}</span>
                    </span>
                    <a
                      [href]="absolute(file.url)"
                      target="_blank"
                      rel="noopener"
                      class="shrink-0 rounded-lg border border-brand-gold/25 px-3 py-1.5 text-[11px] text-brand-gold transition hover:bg-brand-gold/10"
                    >Open</a>
                  </li>
                }
              </ul>
            </section>
          }

          <!-- Submitted details -->
          <section>
            <div class="mb-3 flex items-center justify-between">
              <p class="text-[11px] uppercase tracking-[0.2em] text-brand-white/40">Submitted details</p>
              <button
                type="button"
                (click)="showRaw.set(!showRaw())"
                class="text-[11px] text-brand-white/40 transition hover:text-brand-gold"
              >{{ showRaw() ? 'Hide JSON' : 'View JSON' }}</button>
            </div>

            @if (showRaw()) {
              <pre class="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-black/50 p-4 text-[11px] text-brand-white/60">{{ app().payload | json }}</pre>
            } @else {
              <dl class="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10">
                @for (field of payload().fields; track field.label + field.value) {
                  <div class="flex gap-4 px-4 py-3 text-sm">
                    <dt class="w-40 shrink-0 text-brand-white/40">{{ field.label }}</dt>
                    <dd class="min-w-0 flex-1 break-words text-brand-white/85">{{ field.value }}</dd>
                  </div>
                } @empty {
                  <p class="px-4 py-6 text-center text-sm text-brand-white/35">No extra details submitted.</p>
                }
              </dl>
            }
          </section>
        </div>
      </aside>
    </div>
  `,
  styles: [
    `
      @keyframes slideIn {
        from {
          transform: translateX(24px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class ApplicationDrawerComponent {
  readonly app = input.required<AdminApplication>();
  readonly close = output<void>();
  readonly updated = output<AdminApplication>();

  private readonly adminApi = inject(AdminService);
  private readonly toast = inject(ToastService);

  readonly statuses = APPLICATION_STATUSES;
  readonly saving = signal(false);
  readonly showRaw = signal(false);
  readonly pending = signal<string>('');
  note = '';

  readonly avatar = computed(() => initials(this.app().contactName));
  readonly payload = computed(() => readPayload(this.app().payload));
  readonly channels = computed(() => this.app().preferredCommunication?.join(', ') || '—');
  readonly whatsappLink = computed(() => {
    const raw = this.app().contactWhatsapp || this.app().contactMobile || '';
    const digits = raw.replace(/\D/g, '');
    return digits ? `https://wa.me/${digits.length === 10 ? '91' + digits : digits}` : '';
  });

  constructor() {
    // Preselect the current status whenever a different application is opened.
    effect(() => this.pending.set(this.app().status));
  }

  chip = statusChip;
  label = statusLabel;
  displayTitle = applicationDisplayTitle;

  absolute(url: string): string {
    if (/^https?:\/\//i.test(url)) return url;
    return `${environment.apiUrl.replace(/\/api\/v1$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
  }

  save(): void {
    const status = this.pending();
    if (!status || status === this.app().status) return;
    this.saving.set(true);
    this.adminApi.updateStatus(this.app().id, status, this.note).subscribe({
      next: (res) => {
        this.saving.set(false);
        this.note = '';
        this.toast.success(`${this.app().applicationId} → ${statusLabel(status)}`);
        this.updated.emit(res.application);
      },
      error: () => {
        this.saving.set(false);
        this.toast.error('Could not update status.');
      },
    });
  }
}
