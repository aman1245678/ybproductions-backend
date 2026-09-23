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
  | 'get-featured'
  | 'crew-content'
  | 'crew-influencer'
  | 'crew-leads'
  | 'crew-behind'
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
  payloadIntent?: string;
  payloadCrewTrack?: string;
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
  templateUrl: './admin-panel.component.html',
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
        { id: 'casting', label: 'Casting / Talent (All)', subtitle: 'Portals', icon: 'film', formType: 'FILM_TV_TALENT' },
        { id: 'get-featured', label: 'Get Featured', subtitle: 'Portals', icon: 'star', formType: 'FILM_TV_TALENT', payloadIntent: 'get-featured' },
        { id: 'crew-content', label: 'Content Creator', subtitle: 'Film/TV Crew', icon: 'video', formType: 'FILM_TV_TALENT', payloadCrewTrack: 'content-creator' },
        { id: 'crew-influencer', label: 'Social Influencer', subtitle: 'Film/TV Crew', icon: 'share', formType: 'FILM_TV_TALENT', payloadCrewTrack: 'social-influencer' },
        { id: 'crew-leads', label: 'Film/TV Leads', subtitle: 'Film/TV Crew', icon: 'user', formType: 'FILM_TV_TALENT', payloadCrewTrack: 'film-tv-leads' },
        { id: 'crew-behind', label: 'Behind the Camera', subtitle: 'Film/TV Crew', icon: 'camera', formType: 'FILM_TV_TALENT', payloadCrewTrack: 'behind-camera' },
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
