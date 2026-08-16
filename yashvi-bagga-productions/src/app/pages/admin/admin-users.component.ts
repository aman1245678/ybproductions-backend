import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApplication, AdminService, AdminUser } from '../../shared/services/admin.service';
import { ToastService } from '../../shared/services/toast.service';
import {
  ROLE_OPTIONS,
  USER_STATUSES,
  initials,
  statusChip,
  statusLabel,
  userStatusChip,
} from './admin-ui';

/** Registered accounts (signups) with role + access management. */
@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="space-y-4">
      <!-- Toolbar -->
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative min-w-[14rem] flex-1">
          <svg class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke-width="1.8"/><path stroke-linecap="round" stroke-width="1.8" d="M20 20l-3.5-3.5"/></svg>
          <input
            [(ngModel)]="search"
            (ngModelChange)="onSearchChange()"
            (keyup.enter)="reload()"
            placeholder="Search users by name, email or mobile…"
            class="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-brand-white/30 focus:border-brand-gold/40"
          />
        </div>
        <select
          [(ngModel)]="roleFilter"
          (ngModelChange)="reload()"
          class="rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-xs text-brand-white/70 outline-none focus:border-brand-gold/40"
        >
          <option value="">All roles</option>
          @for (role of roles; track role) {
            <option [value]="role">{{ role }}</option>
          }
        </select>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          (click)="setStatus('')"
          class="rounded-full px-3 py-1.5 text-[11px] ring-1 transition"
          [class]="statusFilter() === '' ? 'bg-brand-gold text-brand-black ring-brand-gold' : 'bg-white/[0.03] text-brand-white/50 ring-white/10 hover:text-brand-white'"
        >All</button>
        @for (s of userStatuses; track s) {
          <button
            type="button"
            (click)="setStatus(s)"
            class="rounded-full px-3 py-1.5 text-[11px] ring-1 transition"
            [class]="statusFilter() === s ? userChip(s) + ' ring-2' : 'bg-white/[0.03] text-brand-white/50 ring-white/10 hover:text-brand-white'"
          >{{ s }}</button>
        }
      </div>

      <!-- Table -->
      <div class="overflow-hidden rounded-2xl border border-white/10 bg-brand-dark/60">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[52rem] text-left text-sm">
            <thead class="bg-white/[0.03] text-[11px] uppercase tracking-[0.15em] text-brand-white/40">
              <tr>
                <th class="px-5 py-3 font-normal">User</th>
                <th class="px-5 py-3 font-normal">Roles</th>
                <th class="px-5 py-3 font-normal">Verified</th>
                <th class="px-5 py-3 font-normal">Submissions</th>
                <th class="px-5 py-3 font-normal">Status</th>
                <th class="px-5 py-3 font-normal">Joined</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              @if (loading()) {
                @for (i of skeletons; track i) {
                  <tr><td colspan="6" class="px-5 py-4"><div class="h-4 animate-pulse rounded bg-white/5"></div></td></tr>
                }
              } @else {
                @for (user of items(); track user.id) {
                  <tr class="cursor-pointer transition hover:bg-white/[0.03]" (click)="openUser(user)">
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gold/10 text-xs font-medium text-brand-gold ring-1 ring-brand-gold/15">
                          {{ avatar(user.fullName) }}
                        </span>
                        <span class="min-w-0">
                          <span class="block truncate font-medium text-brand-white/90">{{ user.fullName }}</span>
                          <span class="block truncate text-xs text-brand-white/40">{{ user.email }}</span>
                          @if (user.mobile) {
                            <span class="text-[11px] text-brand-white/30">{{ user.mobile }}</span>
                          }
                        </span>
                      </div>
                    </td>
                    <td class="px-5 py-4">
                      <div class="flex flex-wrap gap-1">
                        @for (role of user.roles; track role) {
                          <span class="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-brand-white/60 ring-1 ring-white/10">{{ role }}</span>
                        } @empty {
                          <span class="text-xs text-brand-white/25">No role</span>
                        }
                      </div>
                    </td>
                    <td class="px-5 py-4">
                      <div class="flex gap-1.5 text-[10px]">
                        <span
                          class="rounded-md px-1.5 py-0.5 ring-1"
                          [class]="user.isEmailVerified ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/20' : 'bg-white/5 text-brand-white/35 ring-white/10'"
                        >Email</span>
                        <span
                          class="rounded-md px-1.5 py-0.5 ring-1"
                          [class]="user.isMobileVerified ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/20' : 'bg-white/5 text-brand-white/35 ring-white/10'"
                        >SMS</span>
                      </div>
                    </td>
                    <td class="px-5 py-4 text-brand-gold">{{ user.applicationCount ?? 0 }}</td>
                    <td class="px-5 py-4">
                      <span class="rounded-full px-2.5 py-1 text-[11px] ring-1 {{ userChip(user.status) }}">{{ user.status }}</span>
                    </td>
                    <td class="px-5 py-4 text-xs text-brand-white/40">{{ user.createdAtUtc | date: 'd MMM y' }}</td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="px-5 py-16 text-center">
                      <p class="text-brand-white/50">No registered users match this filter.</p>
                      <p class="mt-1 text-xs text-brand-white/30">Accounts created from the website or mobile app appear here.</p>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 px-5 py-3 text-xs text-brand-white/45">
          <span>{{ total() }} user{{ total() === 1 ? '' : 's' }} · page {{ page() }} of {{ totalPages() }}</span>
          <div class="flex items-center gap-1">
            <button type="button" [disabled]="page() <= 1" (click)="goTo(page() - 1)" class="rounded-lg px-3 py-1.5 transition hover:bg-white/5 hover:text-brand-gold disabled:opacity-25">Prev</button>
            <button type="button" [disabled]="page() >= totalPages()" (click)="goTo(page() + 1)" class="rounded-lg px-3 py-1.5 transition hover:bg-white/5 hover:text-brand-gold disabled:opacity-25">Next</button>
          </div>
        </div>
      </div>
    </section>

    <!-- User drawer -->
    @if (selected()) {
      <div class="fixed inset-0 z-[90] flex justify-end">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" (click)="selected.set(null)"></div>
        <aside class="relative h-full w-full max-w-xl overflow-y-auto border-l border-brand-gold/15 bg-brand-dark">
          <header class="sticky top-0 z-10 border-b border-white/8 bg-brand-dark/95 px-6 py-5 backdrop-blur">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="grid h-12 w-12 place-items-center rounded-full bg-brand-gold/12 font-medium text-brand-gold ring-1 ring-brand-gold/20">
                  {{ avatar(selected()!.fullName) }}
                </span>
                <div>
                  <h3 class="font-playfair text-xl leading-tight">{{ selected()!.fullName }}</h3>
                  <p class="text-xs text-brand-white/45">{{ selected()!.email }}</p>
                </div>
              </div>
              <button type="button" (click)="selected.set(null)" class="rounded-lg p-2 text-brand-white/40 transition hover:bg-white/5 hover:text-brand-white" aria-label="Close">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M6 6l12 12M18 6L6 18"/></svg>
              </button>
            </div>
          </header>

          <div class="space-y-6 px-6 py-6">
            <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div class="bg-brand-dark px-4 py-3">
                <dt class="text-[11px] text-brand-white/40">Mobile</dt>
                <dd class="mt-0.5 text-sm">{{ selected()!.mobile || '—' }}</dd>
              </div>
              <div class="bg-brand-dark px-4 py-3">
                <dt class="text-[11px] text-brand-white/40">Joined</dt>
                <dd class="mt-0.5 text-sm">{{ selected()!.createdAtUtc | date: 'medium' }}</dd>
              </div>
            </dl>

            <!-- Access control -->
            <section class="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p class="mb-3 text-[11px] uppercase tracking-[0.2em] text-brand-white/40">Account status</p>
              <div class="flex flex-wrap gap-2">
                @for (s of userStatuses; track s) {
                  <button
                    type="button"
                    (click)="draftStatus.set(s)"
                    class="rounded-full px-3 py-1.5 text-[11px] ring-1 transition"
                    [class]="draftStatus() === s ? userChip(s) + ' ring-2' : 'bg-white/[0.03] text-brand-white/50 ring-white/10 hover:text-brand-white'"
                  >{{ s }}</button>
                }
              </div>

              <p class="mb-3 mt-5 text-[11px] uppercase tracking-[0.2em] text-brand-white/40">Roles</p>
              <div class="flex flex-wrap gap-2">
                @for (role of roles; track role) {
                  <button
                    type="button"
                    (click)="toggleRole(role)"
                    class="rounded-full px-3 py-1.5 text-[11px] ring-1 transition"
                    [class]="draftRoles().includes(role) ? 'bg-brand-gold/15 text-brand-gold ring-brand-gold/30' : 'bg-white/[0.03] text-brand-white/50 ring-white/10 hover:text-brand-white'"
                  >{{ role }}</button>
                }
              </div>

              <button
                type="button"
                (click)="saveUser()"
                [disabled]="savingUser() || !hasChanges()"
                class="mt-4 w-full rounded-xl bg-brand-gold py-2.5 text-sm font-medium text-brand-black transition hover:bg-brand-gold/90 disabled:opacity-40"
              >{{ savingUser() ? 'Saving…' : hasChanges() ? 'Save changes' : 'No changes' }}</button>
            </section>

            <!-- Their submissions -->
            <section>
              <p class="mb-3 text-[11px] uppercase tracking-[0.2em] text-brand-white/40">
                Submissions · {{ userApps().length }}
              </p>
              <ul class="space-y-2">
                @for (app of userApps(); track app.id) {
                  <li class="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                    <div class="flex items-start justify-between gap-3">
                      <div class="min-w-0">
                        <p class="truncate text-sm text-brand-white/85">{{ app.title }}</p>
                        <p class="font-mono text-[10px] text-brand-gold/60">{{ app.applicationId }}</p>
                      </div>
                      <span class="shrink-0 rounded-full px-2.5 py-1 text-[11px] ring-1 {{ chip(app.status) }}">{{ label(app.status) }}</span>
                    </div>
                    <p class="mt-1 text-[11px] text-brand-white/30">{{ app.createdAtUtc | date: 'd MMM y, h:mm a' }}</p>
                  </li>
                } @empty {
                  <p class="rounded-xl border border-white/10 px-4 py-6 text-center text-sm text-brand-white/35">
                    This user hasn't submitted any form yet.
                  </p>
                }
              </ul>
            </section>
          </div>
        </aside>
      </div>
    }
  `,
})
export class AdminUsersComponent {
  readonly reloadToken = input<number>(0);

  private readonly adminApi = inject(AdminService);
  private readonly toast = inject(ToastService);
  private searchTimer: ReturnType<typeof setTimeout> | null = null;

  readonly roles = ROLE_OPTIONS;
  readonly userStatuses = USER_STATUSES;
  readonly skeletons = [0, 1, 2, 3, 4];

  readonly items = signal<AdminUser[]>([]);
  readonly loading = signal(false);
  readonly page = signal(1);
  readonly totalPages = signal(1);
  readonly total = signal(0);
  readonly statusFilter = signal('');
  search = '';
  roleFilter = '';

  readonly selected = signal<AdminUser | null>(null);
  readonly userApps = signal<AdminApplication[]>([]);
  readonly draftStatus = signal('');
  readonly draftRoles = signal<string[]>([]);
  readonly savingUser = signal(false);

  constructor() {
    effect(() => {
      this.reloadToken();
      untracked(() => this.load());
    });
  }

  avatar = initials;
  chip = statusChip;
  label = statusLabel;
  userChip = userStatusChip;

  setStatus(status: string): void {
    this.statusFilter.set(status);
    this.reload();
  }

  reload(): void {
    this.page.set(1);
    this.load();
  }

  goTo(page: number): void {
    this.page.set(page);
    this.load();
  }

  onSearchChange(): void {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.reload(), 350);
  }

  load(): void {
    this.loading.set(true);
    this.adminApi
      .users({
        page: this.page(),
        pageSize: 20,
        status: this.statusFilter(),
        role: this.roleFilter,
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
          this.toast.error(err?.error?.detail || 'Failed to load users.');
        },
      });
  }

  openUser(user: AdminUser): void {
    this.selected.set(user);
    this.draftStatus.set(user.status);
    this.draftRoles.set([...user.roles]);
    this.userApps.set([]);
    this.adminApi.getUser(user.id).subscribe({
      next: (res) => {
        this.selected.set(res.user);
        this.draftStatus.set(res.user.status);
        this.draftRoles.set([...res.user.roles]);
        this.userApps.set(res.applications);
      },
      error: () => this.toast.error('Could not load user detail.'),
    });
  }

  toggleRole(role: string): void {
    this.draftRoles.update((list) =>
      list.includes(role) ? list.filter((r) => r !== role) : [...list, role],
    );
  }

  hasChanges(): boolean {
    const user = this.selected();
    if (!user) return false;
    const rolesChanged =
      [...this.draftRoles()].sort().join(',') !== [...user.roles].sort().join(',');
    return rolesChanged || this.draftStatus() !== user.status;
  }

  saveUser(): void {
    const user = this.selected();
    if (!user || !this.hasChanges()) return;
    this.savingUser.set(true);
    this.adminApi
      .updateUser(user.id, { status: this.draftStatus(), roles: this.draftRoles() })
      .subscribe({
        next: (res) => {
          this.savingUser.set(false);
          this.selected.set({ ...user, ...res.user });
          this.items.update((list) =>
            list.map((u) => (u.id === user.id ? { ...u, ...res.user } : u)),
          );
          this.toast.success(`${user.fullName} updated.`);
        },
        error: (err) => {
          this.savingUser.set(false);
          this.toast.error(err?.error?.detail || 'Could not update user.');
        },
      });
  }
}
