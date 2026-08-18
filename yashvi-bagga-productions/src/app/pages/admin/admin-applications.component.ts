import { Component, computed, effect, inject, input, output, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApplication, AdminService } from '../../shared/services/admin.service';
import { ToastService } from '../../shared/services/toast.service';
import { ApplicationDrawerComponent } from './application-drawer.component';
import { APPLICATION_STATUSES, initials, statusChip, statusLabel, applicationDisplayTitle } from './admin-ui';

/** Filterable submissions table — the main CRM pipeline view. */
@Component({
  selector: 'app-admin-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, ApplicationDrawerComponent],
  template: `
    <section class="space-y-4">
      <!-- Toolbar -->
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative min-w-[14rem] flex-1">
          <svg class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke-width="1.8"/><path stroke-linecap="round" stroke-width="1.8" d="M20 20l-3.5-3.5"/></svg>
          <input
            [(ngModel)]="search"
            (keyup.enter)="applyFilters()"
            (ngModelChange)="onSearchChange()"
            placeholder="Search name, email, phone or application ID…"
            class="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-brand-white/30 focus:border-brand-gold/40"
          />
        </div>
        <button
          type="button"
          (click)="exportCsv()"
          class="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-brand-white/60 transition hover:border-brand-gold/30 hover:text-brand-gold"
        >Export CSV</button>
      </div>

      <!-- Status chips -->
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          (click)="setStatus('')"
          class="rounded-full px-3 py-1.5 text-[11px] ring-1 transition"
          [class]="filterStatus() === '' ? 'bg-brand-gold text-brand-black ring-brand-gold' : 'bg-white/[0.03] text-brand-white/50 ring-white/10 hover:text-brand-white'"
        >All</button>
        @for (s of statuses; track s) {
          <button
            type="button"
            (click)="setStatus(s)"
            class="rounded-full px-3 py-1.5 text-[11px] ring-1 transition"
            [class]="filterStatus() === s ? chip(s) + ' ring-2' : 'bg-white/[0.03] text-brand-white/50 ring-white/10 hover:text-brand-white'"
          >{{ label(s) }}</button>
        }
      </div>

      <!-- Table -->
      <div class="overflow-hidden rounded-2xl border border-white/10 bg-brand-dark/60">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[52rem] text-left text-sm">
            <thead class="bg-white/[0.03] text-[11px] uppercase tracking-[0.15em] text-brand-white/40">
              <tr>
                <th class="px-5 py-3 font-normal">Applicant</th>
                <th class="px-5 py-3 font-normal">Type</th>
                <th class="px-5 py-3 font-normal">Source</th>
                <th class="px-5 py-3 font-normal">Status</th>
                <th class="px-5 py-3 font-normal">Received</th>
                <th class="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              @if (loading()) {
                @for (i of skeletons; track i) {
                  <tr>
                    <td colspan="6" class="px-5 py-4">
                      <div class="h-4 w-full animate-pulse rounded bg-white/5"></div>
                    </td>
                  </tr>
                }
              } @else {
                @for (row of items(); track row.id) {
                  <tr class="group cursor-pointer transition hover:bg-white/[0.03]" (click)="open(row)">
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-gold/10 text-xs font-medium text-brand-gold ring-1 ring-brand-gold/15">
                          {{ avatar(row.contactName) }}
                        </span>
                        <span class="min-w-0">
                          <span class="block truncate font-medium text-brand-white/90">{{ row.contactName }}</span>
                          <span class="block truncate text-xs text-brand-white/40">{{ row.contactEmail }}</span>
                          <span class="font-mono text-[10px] text-brand-gold/60">{{ row.applicationId }}</span>
                        </span>
                      </div>
                    </td>
                    <td class="px-5 py-4">
                      <span class="text-brand-white/80">{{ displayTitle(row) }}</span>
                      <span class="mt-0.5 block text-[11px] text-brand-white/35">{{ row.userKind }}</span>
                    </td>
                    <td class="px-5 py-4 text-xs text-brand-white/50">{{ row.source }}</td>
                    <td class="px-5 py-4" (click)="$event.stopPropagation()">
                      <select
                        class="cursor-pointer rounded-full border-0 px-3 py-1.5 text-[11px] ring-1 outline-none {{ chip(row.status) }}"
                        [ngModel]="row.status"
                        (ngModelChange)="changeStatus(row, $event)"
                      >
                        @for (s of statuses; track s) {
                          <option [value]="s" class="bg-brand-dark text-brand-white">{{ label(s) }}</option>
                        }
                      </select>
                    </td>
                    <td class="px-5 py-4 text-xs text-brand-white/40">{{ row.createdAtUtc | date: 'd MMM y, h:mm a' }}</td>
                    <td class="px-5 py-4 text-right">
                      <span class="text-xs text-brand-white/30 transition group-hover:text-brand-gold">View →</span>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="px-5 py-16 text-center">
                      <p class="text-brand-white/50">No submissions here yet.</p>
                      <p class="mt-1 text-xs text-brand-white/30">New entries land here the moment someone submits a form.</p>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 px-5 py-3 text-xs text-brand-white/45">
          <span>{{ total() }} record{{ total() === 1 ? '' : 's' }} · page {{ page() }} of {{ totalPages() }}</span>
          <div class="flex items-center gap-1">
            <button
              type="button"
              [disabled]="page() <= 1"
              (click)="goTo(page() - 1)"
              class="rounded-lg px-3 py-1.5 transition hover:bg-white/5 hover:text-brand-gold disabled:opacity-25 disabled:hover:bg-transparent"
            >Prev</button>
            <button
              type="button"
              [disabled]="page() >= totalPages()"
              (click)="goTo(page() + 1)"
              class="rounded-lg px-3 py-1.5 transition hover:bg-white/5 hover:text-brand-gold disabled:opacity-25 disabled:hover:bg-transparent"
            >Next</button>
          </div>
        </div>
      </div>
    </section>

    @if (selected()) {
      <app-application-drawer
        [app]="selected()!"
        (close)="selected.set(null)"
        (updated)="onUpdated($event)"
      />
    }
  `,
})
export class AdminApplicationsComponent {
  readonly formType = input<string>('');
  readonly userKind = input<string>('');
  readonly payloadIntent = input<string>('');
  readonly reloadToken = input<number>(0);
  readonly changed = output<void>();

  private readonly adminApi = inject(AdminService);
  private readonly toast = inject(ToastService);
  private searchTimer: ReturnType<typeof setTimeout> | null = null;

  readonly statuses = APPLICATION_STATUSES;
  readonly skeletons = [0, 1, 2, 3, 4];

  readonly items = signal<AdminApplication[]>([]);
  readonly loading = signal(false);
  readonly page = signal(1);
  readonly totalPages = signal(1);
  readonly total = signal(0);
  readonly filterStatus = signal('');
  readonly selected = signal<AdminApplication | null>(null);
  search = '';

  readonly scope = computed(() => ({
    formType: this.formType(),
    userKind: this.userKind(),
    payloadIntent: this.payloadIntent(),
  }));

  constructor() {
    effect(() => {
      // Reload whenever the section scope or an external refresh token changes.
      this.scope();
      this.reloadToken();
      untracked(() => {
        this.page.set(1);
        this.load();
      });
    });
  }

  chip = statusChip;
  label = statusLabel;
  avatar = initials;
  displayTitle = applicationDisplayTitle;

  setStatus(status: string): void {
    this.filterStatus.set(status);
    this.page.set(1);
    this.load();
  }

  applyFilters(): void {
    this.page.set(1);
    this.load();
  }

  onSearchChange(): void {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.applyFilters(), 350);
  }

  goTo(page: number): void {
    this.page.set(page);
    this.load();
  }

  open(row: AdminApplication): void {
    this.selected.set(row);
  }

  load(): void {
    this.loading.set(true);
    this.adminApi
      .list({
        page: this.page(),
        pageSize: 20,
        status: this.filterStatus(),
        formType: this.formType(),
        userKind: this.userKind(),
        payloadIntent: this.payloadIntent(),
        q: this.search,
      })
      .subscribe({
        next: (res) => {
          this.items.set(res.items);
          this.total.set(res.total);
          this.totalPages.set(res.totalPages);
          this.page.set(res.page);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.toast.error(err?.error?.detail || 'Failed to load submissions.');
        },
      });
  }

  changeStatus(row: AdminApplication, status: string): void {
    if (status === row.status) return;
    this.adminApi.updateStatus(row.id, status).subscribe({
      next: (res) => {
        this.patchRow(res.application);
        this.toast.success(`${row.applicationId} → ${statusLabel(status)}`);
        this.changed.emit();
      },
      error: () => this.toast.error('Status update failed.'),
    });
  }

  onUpdated(app: AdminApplication): void {
    this.patchRow(app);
    this.selected.set(app);
    this.changed.emit();
  }

  private patchRow(app: AdminApplication): void {
    this.items.update((list) => list.map((x) => (x.id === app.id ? { ...x, ...app } : x)));
  }

  exportCsv(): void {
    const rows = this.items();
    if (!rows.length) {
      this.toast.info('Nothing to export on this page.');
      return;
    }
    const header = ['Application ID', 'Name', 'Email', 'Mobile', 'Company', 'Type', 'Source', 'Status', 'Received'];
    const escape = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [
      header.join(','),
      ...rows.map((r) =>
        [
          r.applicationId,
          r.contactName,
          r.contactEmail,
          r.contactMobile || '',
          r.companyName || '',
          r.title,
          r.source,
          r.status,
          r.createdAtUtc,
        ]
          .map(escape)
          .join(','),
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ybp-submissions-page-${this.page()}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
