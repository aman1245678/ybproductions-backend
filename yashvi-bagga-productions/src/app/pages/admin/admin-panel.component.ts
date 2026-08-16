import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { AdminActivity, AdminService, AdminSummary } from '../../shared/services/admin.service';
import { ToastService } from '../../shared/services/toast.service';
import { AdminApplicationsComponent } from './admin-applications.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminUsersComponent } from './admin-users.component';
import { initials } from './admin-ui';

type SectionId =
  | 'dashboard'
  | 'all'
  | 'hire'
  | 'join'
  | 'contact'
  | 'careers'
  | 'casting'
  | 'creative'
  | 'manpower'
  | 'users';

interface NavItem {
  id: SectionId;
  label: string;
  icon: string;
  subtitle: string;
  formType?: string;
  userKind?: 'INDUSTRY' | 'CANDIDATE';
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

/** Full-screen CRM shell: sidebar navigation + section workspace. */
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AdminDashboardComponent,
    AdminApplicationsComponent,
    AdminUsersComponent,
  ],
  template: `
    @if (!auth.isLoggedIn() || !isAdmin()) {
      <!-- Sign in -->
      <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-black px-4 py-16">
        <div class="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px]"></div>
        <div class="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-brand-gold/5 blur-[120px]"></div>

        <div class="relative w-full max-w-md">
          <div class="mb-8 text-center">
            <p class="text-[11px] uppercase tracking-[0.4em] text-brand-gold">Yashvi Bagga Productions</p>
            <h1 class="mt-3 font-playfair text-3xl text-brand-white">Control Center</h1>
            <p class="mt-2 text-sm text-brand-white/40">Sign in with your admin credentials.</p>
          </div>

          <div class="rounded-3xl border border-brand-gold/15 bg-brand-dark/80 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur">
            @if (auth.isLoggedIn() && !isAdmin()) {
              <div class="mb-5 rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {{ auth.user()?.email }} is signed in but has no Admin role.
                <button type="button" (click)="auth.logout()" class="mt-1 block text-xs text-brand-gold underline">Sign in with another account</button>
              </div>
            }

            <label class="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-brand-white/40">Email</label>
            <input
              [(ngModel)]="loginEmail"
              type="email"
              autocomplete="username"
              class="mb-4 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-brand-gold/40"
            />

            <label class="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-brand-white/40">Password</label>
            <input
              [(ngModel)]="loginPassword"
              type="password"
              autocomplete="current-password"
              (keyup.enter)="doLogin()"
              class="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-brand-gold/40"
            />

            @if (loginError()) {
              <p class="mt-4 text-sm text-rose-300">{{ loginError() }}</p>
            }

            <button
              type="button"
              (click)="doLogin()"
              [disabled]="busy()"
              class="mt-6 w-full rounded-xl bg-brand-gold py-3 text-sm font-medium text-brand-black transition hover:bg-brand-gold/90 disabled:opacity-50"
            >{{ busy() ? 'Signing in…' : 'Sign in' }}</button>

            <a routerLink="/" class="mt-4 block text-center text-xs text-brand-white/35 transition hover:text-brand-gold">← Back to website</a>
          </div>
        </div>
      </div>
    } @else {
      <div class="flex min-h-screen bg-brand-black text-brand-white">
        <!-- Sidebar -->
        <aside
          class="fixed inset-y-0 left-0 z-[70] flex w-72 flex-col border-r border-white/8 bg-brand-dark/95 backdrop-blur transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0"
          [class.-translate-x-full]="!menuOpen()"
        >
          <div class="flex items-center justify-between border-b border-white/8 px-6 py-5">
            <div>
              <p class="text-[10px] uppercase tracking-[0.34em] text-brand-gold">YBP Admin</p>
              <h2 class="mt-1 font-playfair text-lg leading-none">Control Center</h2>
            </div>
            <button type="button" (click)="menuOpen.set(false)" class="rounded-lg p-2 text-brand-white/40 lg:hidden" aria-label="Close menu">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
          </div>

          <nav class="flex-1 space-y-6 overflow-y-auto px-4 py-5">
            @for (group of navGroups; track group.title) {
              <div>
                <p class="mb-2 px-3 text-[10px] uppercase tracking-[0.24em] text-brand-white/25">{{ group.title }}</p>
                <ul class="space-y-1">
                  @for (item of group.items; track item.id) {
                    <li>
                      <button
                        type="button"
                        (click)="selectSection(item.id)"
                        class="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition"
                        [class]="section() === item.id
                          ? 'bg-brand-gold/12 text-brand-gold ring-1 ring-brand-gold/25'
                          : 'text-brand-white/60 hover:bg-white/[0.04] hover:text-brand-white'"
                      >
                        <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          @switch (item.icon) {
                            @case ('grid') {
                              <path stroke-width="1.7" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>
                            }
                            @case ('layers') {
                              <path stroke-linecap="round" stroke-width="1.7" d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5"/>
                            }
                            @case ('briefcase') {
                              <path stroke-width="1.7" d="M4 8h16v12H4zM9 8V5h6v3"/>
                            }
                            @case ('user-plus') {
                              <circle cx="10" cy="8" r="3.4" stroke-width="1.7"/>
                              <path stroke-linecap="round" stroke-width="1.7" d="M4 20c0-3.2 2.7-5 6-5M18 9v6M15 12h6"/>
                            }
                            @case ('mail') {
                              <path stroke-linecap="round" stroke-width="1.7" d="M3 7l9 6 9-6M3 7h18v10H3z"/>
                            }
                            @case ('star') {
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M12 4l2.4 5 5.6.8-4 3.9 1 5.5-5-2.8-5 2.8 1-5.5-4-3.9 5.6-.8L12 4z"/>
                            }
                            @case ('film') {
                              <path stroke-width="1.7" d="M4 5h16v14H4zM8 5v14M16 5v14"/>
                            }
                            @case ('camera') {
                              <path stroke-width="1.7" d="M4 8h11l5-2v12l-5-2H4z"/>
                            }
                            @case ('hardhat') {
                              <path stroke-linecap="round" stroke-width="1.7" d="M4 16a8 8 0 1116 0M3 18h18M10 8V5h4v3"/>
                            }
                            @default {
                              <circle cx="12" cy="8" r="3.5" stroke-width="1.7"/>
                              <path stroke-linecap="round" stroke-width="1.7" d="M5 20c0-3.3 3.1-5 7-5s7 1.7 7 5"/>
                            }
                          }
                        </svg>
                        <span class="min-w-0 flex-1 truncate">{{ item.label }}</span>
                        @if (badge(item) !== null) {
                          <span class="shrink-0 rounded-full bg-white/8 px-2 py-0.5 text-[10px] text-brand-white/60">{{ badge(item) }}</span>
                        }
                      </button>
                    </li>
                  }
                </ul>
              </div>
            }
          </nav>

          <div class="border-t border-white/8 px-4 py-4">
            <div class="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-3">
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gold/12 text-xs font-medium text-brand-gold ring-1 ring-brand-gold/20">
                {{ avatar() }}
              </span>
              <span class="min-w-0 flex-1">
                <span class="block truncate text-sm">{{ auth.user()?.fullName }}</span>
                <span class="block truncate text-[11px] text-brand-white/35">{{ auth.user()?.email }}</span>
              </span>
            </div>
            <div class="mt-3 flex items-center justify-between px-1 text-[11px] text-brand-white/35">
              <a routerLink="/" class="transition hover:text-brand-gold">← Website</a>
              <button type="button" (click)="auth.logout()" class="transition hover:text-rose-300">Log out</button>
            </div>
          </div>
        </aside>

        @if (menuOpen()) {
          <div class="fixed inset-0 z-[60] bg-black/60 lg:hidden" (click)="menuOpen.set(false)"></div>
        }

        <!-- Workspace -->
        <div class="flex min-w-0 flex-1 flex-col">
          <header class="sticky top-0 z-40 flex flex-wrap items-center gap-3 border-b border-white/8 bg-brand-black/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <button
              type="button"
              (click)="menuOpen.set(true)"
              class="rounded-lg border border-white/10 p-2 text-brand-white/60 lg:hidden"
              aria-label="Open menu"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="1.8" d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>

            <div class="min-w-0 flex-1">
              <p class="text-[10px] uppercase tracking-[0.28em] text-brand-gold/80">
                Admin · {{ current().subtitle }}
              </p>
              <h1 class="truncate font-playfair text-xl sm:text-2xl">{{ current().label }}</h1>
            </div>

            <div class="flex items-center gap-2">
              @if (lastSynced()) {
                <span class="hidden text-[11px] text-brand-white/30 sm:inline">Synced {{ lastSynced() | date: 'h:mm a' }}</span>
              }
              <button
                type="button"
                (click)="refreshAll()"
                class="flex items-center gap-2 rounded-xl border border-brand-gold/25 bg-brand-gold/10 px-4 py-2 text-xs text-brand-gold transition hover:bg-brand-gold/20"
              >
                <svg class="h-3.5 w-3.5" [class.animate-spin]="busy()" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="1.8" d="M20 12a8 8 0 11-2.3-5.7M20 4v4h-4"/></svg>
                Refresh
              </button>
            </div>
          </header>

          <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            @switch (section()) {
              @case ('dashboard') {
                @if (summary()) {
                  <app-admin-dashboard [summary]="summary()!" [activity]="activity()" />
                } @else {
                  <p class="text-sm text-brand-white/40">Loading overview…</p>
                }
              }
              @case ('users') {
                <app-admin-users [reloadToken]="reloadToken()" />
              }
              @default {
                <app-admin-applications
                  [formType]="current().formType || ''"
                  [userKind]="current().userKind || ''"
                  [reloadToken]="reloadToken()"
                  (changed)="loadSummary()"
                />
              }
            }
          </main>
        </div>
      </div>
    }
  `,
})
export class AdminPanelComponent implements OnInit {
  readonly auth = inject(AuthService);
  private readonly adminApi = inject(AdminService);
  private readonly toast = inject(ToastService);

  readonly navGroups: NavGroup[] = [
    {
      title: 'Overview',
      items: [{ id: 'dashboard', label: 'Dashboard', subtitle: 'Overview', icon: 'grid' }],
    },
    {
      title: 'Pipeline',
      items: [
        { id: 'all', label: 'All submissions', subtitle: 'Pipeline', icon: 'layers' },
        { id: 'hire', label: 'Hire (Industry)', subtitle: 'Pipeline', icon: 'briefcase', userKind: 'INDUSTRY' },
        { id: 'join', label: 'Join (Candidates)', subtitle: 'Pipeline', icon: 'user-plus', userKind: 'CANDIDATE' },
      ],
    },
    {
      title: 'Channels',
      items: [
        { id: 'contact', label: 'Contact queries', subtitle: 'Channels', icon: 'mail', formType: 'CONTACT' },
        { id: 'careers', label: 'Careers signups', subtitle: 'Channels', icon: 'star', formType: 'JOIN_NETWORK' },
      ],
    },
    {
      title: 'Portals',
      items: [
        { id: 'casting', label: 'Casting / Talent', subtitle: 'Portals', icon: 'film', formType: 'FILM_TV_TALENT' },
        { id: 'creative', label: 'Creative / Media', subtitle: 'Portals', icon: 'camera', formType: 'CREATIVE_CAREER' },
        { id: 'manpower', label: 'Manpower hire', subtitle: 'Portals', icon: 'hardhat', formType: 'MANPOWER_HIRE' },
      ],
    },
    {
      title: 'People',
      items: [{ id: 'users', label: 'Registered users', subtitle: 'People', icon: 'users' }],
    },
  ];

  private readonly navItems = this.navGroups.flatMap((g) => g.items);

  loginEmail = 'ybproductions2025@gmail.com';
  loginPassword = '';

  readonly busy = signal(false);
  readonly loginError = signal<string | null>(null);
  readonly summary = signal<AdminSummary | null>(null);
  readonly activity = signal<AdminActivity[]>([]);
  readonly section = signal<SectionId>('dashboard');
  readonly menuOpen = signal(false);
  readonly reloadToken = signal(0);
  readonly lastSynced = signal<Date | null>(null);

  readonly current = computed(
    () => this.navItems.find((n) => n.id === this.section()) || this.navItems[0],
  );
  readonly avatar = computed(() => initials(this.auth.user()?.fullName || this.auth.user()?.email));

  ngOnInit(): void {
    if (this.auth.isLoggedIn() && this.isAdmin()) {
      this.refreshAll();
    }
  }

  isAdmin(): boolean {
    return (this.auth.user()?.roles || []).includes('Admin');
  }

  /** Sidebar counter for a section, when the summary already knows it. */
  badge(item: NavItem): number | null {
    const s = this.summary();
    if (!s) return null;
    if (item.id === 'all') return s.total;
    if (item.id === 'users') return s.users?.total ?? null;
    if (item.formType) return s.byFormType?.[item.formType] ?? 0;
    return null;
  }

  selectSection(id: SectionId): void {
    this.section.set(id);
    this.menuOpen.set(false);
  }

  doLogin(): void {
    this.busy.set(true);
    this.loginError.set(null);
    this.auth.login(this.loginEmail, this.loginPassword).subscribe({
      next: () => {
        this.busy.set(false);
        if (!this.isAdmin()) {
          this.loginError.set('This account does not have Admin access.');
          return;
        }
        this.refreshAll();
      },
      error: (err: Error) => {
        this.busy.set(false);
        this.loginError.set(err.message || 'Login failed.');
      },
    });
  }

  refreshAll(): void {
    this.loadSummary();
    this.reloadToken.update((n) => n + 1);
  }

  loadSummary(): void {
    this.busy.set(true);
    this.adminApi.summary().subscribe({
      next: (s) => {
        this.summary.set(s);
        this.lastSynced.set(new Date());
        this.busy.set(false);
      },
      error: () => {
        this.busy.set(false);
        this.toast.error('Could not load the dashboard summary.');
      },
    });
    this.adminApi.activity(12).subscribe({
      next: (res) => this.activity.set(res.items),
      error: () => {
        /* activity feed is non-critical */
      },
    });
  }
}
