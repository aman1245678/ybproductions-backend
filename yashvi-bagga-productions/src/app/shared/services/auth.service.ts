import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  mobile: string | null;
  roles: string[];
  status: string;
  isEmailVerified: boolean;
}

export interface AuthResponse {
  message?: string;
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: string;
}

const ACCESS_KEY = 'ybp_access_token';
const REFRESH_KEY = 'ybp_refresh_token';
const USER_KEY = 'ybp_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly userSignal = signal<AuthUser | null>(null);
  private readonly accessTokenSignal = signal<string | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly accessToken = this.accessTokenSignal.asReadonly();
  readonly isLoggedIn = computed(() => !!this.accessTokenSignal());

  constructor() {
    this.hydrateFromStorage();
  }

  register(input: {
    fullName: string;
    email: string;
    mobile?: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/register`, {
        fullName: input.fullName.trim(),
        email: input.email.trim().toLowerCase(),
        mobile: input.mobile?.trim() || undefined,
        password: input.password,
      })
      .pipe(
        tap((res) => this.persistSession(res)),
        catchError((err) => throwError(() => this.toAuthError(err))),
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, {
        email: email.trim().toLowerCase(),
        password,
      })
      .pipe(
        tap((res) => this.persistSession(res)),
        catchError((err) => throwError(() => this.toAuthError(err))),
      );
  }

  logout(): void {
    const refreshToken = this.read(REFRESH_KEY);
    if (refreshToken) {
      this.http
        .post(`${environment.apiUrl}/auth/logout`, { refreshToken })
        .pipe(catchError(() => of(null)))
        .subscribe();
    }
    this.clearSession();
  }

  me(): Observable<AuthUser | null> {
    if (!this.accessTokenSignal()) return of(null);
    return this.http.get<{ user: AuthUser }>(`${environment.apiUrl}/auth/me`).pipe(
      map((res) => res.user),
      tap((user) => {
        this.userSignal.set(user);
        this.write(USER_KEY, JSON.stringify(user));
      }),
      catchError(() => {
        this.clearSession();
        return of(null);
      }),
    );
  }

  private persistSession(res: AuthResponse): void {
    this.accessTokenSignal.set(res.accessToken);
    this.userSignal.set(res.user);
    this.write(ACCESS_KEY, res.accessToken);
    this.write(REFRESH_KEY, res.refreshToken);
    this.write(USER_KEY, JSON.stringify(res.user));
  }

  private clearSession(): void {
    this.accessTokenSignal.set(null);
    this.userSignal.set(null);
    this.remove(ACCESS_KEY);
    this.remove(REFRESH_KEY);
    this.remove(USER_KEY);
  }

  private hydrateFromStorage(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const token = this.read(ACCESS_KEY);
    const rawUser = this.read(USER_KEY);
    if (token) this.accessTokenSignal.set(token);
    if (rawUser) {
      try {
        this.userSignal.set(JSON.parse(rawUser) as AuthUser);
      } catch {
        /* ignore */
      }
    }
  }

  private toAuthError(err: unknown): Error {
    if (err instanceof HttpErrorResponse) {
      const detail =
        (err.error && (err.error.detail || err.error.message || err.error.title)) ||
        err.message ||
        'Request failed';
      return new Error(typeof detail === 'string' ? detail : 'Request failed');
    }
    return err instanceof Error ? err : new Error('Request failed');
  }

  private read(key: string): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private write(key: string, value: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  }

  private remove(key: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }
}
