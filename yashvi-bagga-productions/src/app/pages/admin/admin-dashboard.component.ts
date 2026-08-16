import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminActivity, AdminSummary } from '../../shared/services/admin.service';
import { APPLICATION_STATUSES, humanizeKey, statusChip, statusLabel, toBars } from './admin-ui';

/** KPI + analytics overview for the admin CRM. */
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-5">
      <!-- KPI cards -->
      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        @for (card of cards(); track card.label) {
          <div class="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5">
            <div class="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-gold/5 blur-2xl transition group-hover:bg-brand-gold/10"></div>
            <div class="flex items-start justify-between">
              <p class="text-[11px] uppercase tracking-[0.18em] text-brand-white/40">{{ card.label }}</p>
              <span class="grid h-8 w-8 place-items-center rounded-lg bg-brand-gold/10 text-brand-gold">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  @switch (card.icon) {
                    @case ('inbox') {
                      <path stroke-linecap="round" stroke-width="1.8" d="M8 4h8l4 4v12H4V4h4zm0 8h8M8 16h5" />
                    }
                    @case ('clock') {
                      <circle cx="12" cy="12" r="8" stroke-width="1.8" />
                      <path stroke-linecap="round" stroke-width="1.8" d="M12 8v4l3 2" />
                    }
                    @case ('users') {
                      <circle cx="12" cy="8" r="3.5" stroke-width="1.8" />
                      <path stroke-linecap="round" stroke-width="1.8" d="M5 20c0-3.3 3.1-5 7-5s7 1.7 7 5" />
                    }
                    @default {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 13l4 4L19 7" />
                    }
                  }
                </svg>
              </span>
            </div>
            <p class="mt-3 font-playfair text-3xl text-brand-white">{{ card.value }}</p>
            <p class="mt-1 text-[11px] text-brand-white/35">{{ card.hint }}</p>
          </div>
        }
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <!-- Trend -->
        <div class="rounded-2xl border border-white/10 bg-brand-dark/60 p-5 lg:col-span-2">
          <div class="mb-5 flex items-baseline justify-between">
            <div>
              <p class="text-[11px] uppercase tracking-[0.18em] text-brand-white/40">Submissions</p>
              <h3 class="mt-1 font-playfair text-lg">Last 14 days</h3>
            </div>
            <p class="text-xs text-brand-white/35">{{ trendTotal() }} in period</p>
          </div>
          <div class="flex h-40 items-end gap-1.5">
            @for (bar of bars(); track bar.day) {
              <div class="group relative flex flex-1 flex-col items-center justify-end">
                <span class="pointer-events-none absolute -top-7 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[10px] text-brand-white opacity-0 transition group-hover:opacity-100">
                  {{ bar.count }} on {{ bar.day | date: 'd MMM' }}
                </span>
                <div
                  class="w-full rounded-t bg-gradient-to-t from-brand-gold/25 to-brand-gold transition-all duration-300 group-hover:from-brand-gold/50"
                  [style.height.%]="bar.height || 2"
                ></div>
              </div>
            } @empty {
              <p class="w-full text-center text-sm text-brand-white/30">No data yet.</p>
            }
          </div>
          <div class="mt-2 flex justify-between text-[10px] text-brand-white/25">
            <span>{{ bars()[0]?.day | date: 'd MMM' }}</span>
            <span>Today</span>
          </div>
        </div>

        <!-- Pipeline -->
        <div class="rounded-2xl border border-white/10 bg-brand-dark/60 p-5">
          <p class="text-[11px] uppercase tracking-[0.18em] text-brand-white/40">Pipeline</p>
          <h3 class="mt-1 mb-4 font-playfair text-lg">By status</h3>
          <ul class="space-y-3">
            @for (row of pipeline(); track row.status) {
              <li>
                <div class="mb-1.5 flex items-center justify-between text-xs">
                  <span class="rounded-full px-2 py-0.5 text-[10px] ring-1 {{ chip(row.status) }}">{{ label(row.status) }}</span>
                  <span class="text-brand-white/50">{{ row.count }}</span>
                </div>
                <div class="h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div class="h-full rounded-full bg-brand-gold/60" [style.width.%]="row.percent"></div>
                </div>
              </li>
            }
          </ul>
        </div>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <!-- By form type -->
        <div class="rounded-2xl border border-white/10 bg-brand-dark/60 p-5">
          <p class="text-[11px] uppercase tracking-[0.18em] text-brand-white/40">Demand</p>
          <h3 class="mt-1 mb-4 font-playfair text-lg">By form type</h3>
          <ul class="space-y-2.5">
            @for (row of formTypes(); track row.key) {
              <li class="flex items-center gap-3">
                <span class="w-44 shrink-0 truncate text-sm text-brand-white/70">{{ row.label }}</span>
                <span class="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                  <span class="block h-full rounded-full bg-gradient-to-r from-brand-gold/40 to-brand-gold" [style.width.%]="row.percent"></span>
                </span>
                <span class="w-8 shrink-0 text-right text-sm text-brand-gold">{{ row.count }}</span>
              </li>
            } @empty {
              <p class="text-sm text-brand-white/30">No submissions yet.</p>
            }
          </ul>
        </div>

        <!-- Activity -->
        <div class="rounded-2xl border border-white/10 bg-brand-dark/60 p-5">
          <p class="text-[11px] uppercase tracking-[0.18em] text-brand-white/40">Audit trail</p>
          <h3 class="mt-1 mb-4 font-playfair text-lg">Recent activity</h3>
          <ol class="relative space-y-4 border-l border-white/8 pl-5">
            @for (item of activity(); track item.id) {
              <li class="relative">
                <span class="absolute -left-[1.4rem] top-1.5 h-2 w-2 rounded-full bg-brand-gold/70 ring-4 ring-brand-dark"></span>
                <p class="text-sm text-brand-white/80">{{ item.detail || item.action }}</p>
                <p class="mt-0.5 text-[11px] text-brand-white/35">
                  {{ item.entityType }} · {{ item.occurredAtUtc | date: 'd MMM y, h:mm a' }}
                </p>
              </li>
            } @empty {
              <p class="text-sm text-brand-white/30">Nothing logged yet.</p>
            }
          </ol>
        </div>
      </div>
    </section>
  `,
})
export class AdminDashboardComponent {
  readonly summary = input.required<AdminSummary>();
  readonly activity = input<AdminActivity[]>([]);

  chip = statusChip;
  label = statusLabel;

  readonly bars = computed(() => toBars(this.summary().trend || []));
  readonly trendTotal = computed(() =>
    (this.summary().trend || []).reduce((sum, t) => sum + t.count, 0),
  );

  readonly cards = computed(() => {
    const s = this.summary();
    const open =
      (s.byStatus['Received'] || 0) + (s.byStatus['UnderReview'] || 0) + (s.byStatus['InProgress'] || 0);
    return [
      {
        label: 'Total submissions',
        value: s.total,
        hint: `${s.last7Days} in the last 7 days`,
        icon: 'inbox',
      },
      {
        label: 'Needs attention',
        value: open,
        hint: 'New, under review or in progress',
        icon: 'clock',
      },
      {
        label: 'Registered users',
        value: s.users?.total ?? 0,
        hint: `${s.users?.last7Days ?? 0} signed up this week`,
        icon: 'users',
      },
      {
        label: 'Closed / won',
        value: s.byStatus['Closed'] || 0,
        hint: `${s.byStatus['Rejected'] || 0} rejected`,
        icon: 'check',
      },
    ];
  });

  readonly pipeline = computed(() => {
    const byStatus = this.summary().byStatus || {};
    const max = Math.max(1, ...Object.values(byStatus));
    return APPLICATION_STATUSES.map((status) => ({
      status,
      count: byStatus[status] || 0,
      percent: Math.round(((byStatus[status] || 0) / max) * 100),
    }));
  });

  readonly formTypes = computed(() => {
    const entries = Object.entries(this.summary().byFormType || {}).sort((a, b) => b[1] - a[1]);
    const max = Math.max(1, ...entries.map(([, v]) => v));
    return entries.map(([key, count]) => ({
      key,
      label: humanizeKey(key),
      count,
      percent: Math.round((count / max) * 100),
    }));
  });
}
