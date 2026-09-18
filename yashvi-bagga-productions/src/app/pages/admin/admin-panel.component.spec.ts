import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { signal } from '@angular/core';
import { AdminPanelComponent } from './admin-panel.component';
import { AuthService, AuthUser } from '../../shared/services/auth.service';
import { AdminService } from '../../shared/services/admin.service';
import { ToastService } from '../../shared/services/toast.service';

describe('AdminPanelComponent', () => {
  let fixture: ComponentFixture<AdminPanelComponent>;
  let component: AdminPanelComponent;
  let auth: jasmine.SpyObj<AuthService> & {
    isLoggedIn: ReturnType<typeof signal<boolean>>;
    user: ReturnType<typeof signal<AuthUser | null>>;
  };
  let adminApi: jasmine.SpyObj<AdminService>;
  let toast: jasmine.SpyObj<ToastService>;

  const adminUser: AuthUser = {
    id: '1',
    fullName: 'Admin',
    email: 'admin@example.com',
    mobile: null,
    roles: ['Admin'],
    status: 'Active',
    isEmailVerified: true,
  };

  beforeEach(async () => {
    auth = jasmine.createSpyObj('AuthService', ['login', 'logout'], {
      isLoggedIn: signal(false),
      user: signal<AuthUser | null>(null),
    }) as typeof auth;
    adminApi = jasmine.createSpyObj('AdminService', ['summary', 'activity']);
    toast = jasmine.createSpyObj('ToastService', ['error']);
    adminApi.summary.and.returnValue(
      of({
        total: 2,
        last7Days: 1,
        byStatus: {},
        byFormType: { CONTACT: 1 },
        bySource: {},
        users: { total: 3, last7Days: 1, byStatus: {} },
        trend: [],
      }),
    );
    adminApi.activity.and.returnValue(of({ items: [] }));

    await TestBed.configureTestingModule({
      imports: [AdminPanelComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AuthService, useValue: auth },
        { provide: AdminService, useValue: adminApi },
        { provide: ToastService, useValue: toast },
      ],
    })
      .overrideComponent(AdminPanelComponent, {
        set: { template: '<div>admin-shell</div>' },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('reports isAdmin only when roles include Admin', () => {
    expect(component.isAdmin()).toBeFalse();
    auth.user.set(adminUser);
    expect(component.isAdmin()).toBeTrue();
  });

  it('selectSection updates the active section and closes the menu', () => {
    component.menuOpen.set(true);
    component.selectSection('users');
    expect(component.section()).toBe('users');
    expect(component.menuOpen()).toBeFalse();
  });

  it('doLogin blocks non-admin accounts', fakeAsync(() => {
    auth.login.and.returnValue(
      of({
        user: { ...adminUser, roles: [] },
        accessToken: 't',
        refreshToken: 'r',
      }),
    );
    auth.user.set({ ...adminUser, roles: [] });
    auth.isLoggedIn.set(true);

    component.loginPassword = 'secret';
    component.doLogin();
    tick();

    expect(component.loginError()).toContain('Admin access');
    expect(adminApi.summary).not.toHaveBeenCalled();
  }));

  it('doLogin refreshes the dashboard for Admin users', fakeAsync(() => {
    auth.login.and.callFake(() => {
      auth.user.set(adminUser);
      auth.isLoggedIn.set(true);
      return of({ user: adminUser, accessToken: 't', refreshToken: 'r' });
    });

    component.loginPassword = 'secret';
    component.doLogin();
    tick();

    expect(component.loginError()).toBeNull();
    expect(adminApi.summary).toHaveBeenCalled();
  }));

  it('doLogin surfaces API failures', fakeAsync(() => {
    auth.login.and.returnValue(throwError(() => new Error('Invalid email or password.')));
    component.doLogin();
    tick();
    expect(component.loginError()).toBe('Invalid email or password.');
  }));
});
