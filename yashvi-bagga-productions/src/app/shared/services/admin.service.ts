import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AdminApplication {
  id: string;
  applicationId: string;
  formType: string;
  typeCode: string;
  userKind: string;
  source: string;
  status: string;
  contactName: string;
  contactEmail: string;
  contactMobile: string | null;
  contactWhatsapp?: string | null;
  companyName: string | null;
  preferredCommunication: string[];
  payload: Record<string, unknown>;
  userId?: string | null;
  createdAtUtc: string;
  updatedAtUtc: string | null;
  title: string;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  mobile: string | null;
  status: string;
  roles: string[];
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  createdAtUtc: string;
  updatedAtUtc: string | null;
  applicationCount?: number;
}

export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export type AdminListResponse = PagedResponse<AdminApplication>;

export interface AdminSummary {
  total: number;
  last7Days: number;
  byStatus: Record<string, number>;
  byFormType: Record<string, number>;
  bySource: Record<string, number>;
  users: {
    total: number;
    last7Days: number;
    byStatus: Record<string, number>;
  };
  trend: { day: string; count: number }[];
}

export interface AdminActivity {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  detail: string | null;
  occurredAtUtc: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin`;

  summary(): Observable<AdminSummary> {
    return this.http.get<AdminSummary>(`${this.base}/summary`);
  }

  activity(take = 12): Observable<{ items: AdminActivity[] }> {
    return this.http.get<{ items: AdminActivity[] }>(`${this.base}/activity`, {
      params: new HttpParams().set('take', String(take)),
    });
  }

  list(params: {
    page?: number;
    pageSize?: number;
    status?: string;
    formType?: string;
    source?: string;
    userKind?: string;
    q?: string;
    payloadIntent?: string;
    payloadCrewTrack?: string;
  }): Observable<AdminListResponse> {
    return this.http.get<AdminListResponse>(`${this.base}/applications`, {
      params: this.toParams(params),
    });
  }

  getOne(id: string): Observable<{ application: AdminApplication }> {
    return this.http.get<{ application: AdminApplication }>(`${this.base}/applications/${id}`);
  }

  updateStatus(id: string, status: string, note?: string): Observable<{ application: AdminApplication }> {
    return this.http.patch<{ application: AdminApplication }>(
      `${this.base}/applications/${id}/status`,
      { status, note: note || '' },
    );
  }

  users(params: {
    page?: number;
    pageSize?: number;
    status?: string;
    role?: string;
    q?: string;
  }): Observable<PagedResponse<AdminUser>> {
    return this.http.get<PagedResponse<AdminUser>>(`${this.base}/users`, {
      params: this.toParams(params),
    });
  }

  getUser(id: string): Observable<{ user: AdminUser; applications: AdminApplication[] }> {
    return this.http.get<{ user: AdminUser; applications: AdminApplication[] }>(
      `${this.base}/users/${id}`,
    );
  }

  updateUser(
    id: string,
    changes: { status?: string; roles?: string[]; fullName?: string; mobile?: string },
  ): Observable<{ user: AdminUser }> {
    return this.http.patch<{ user: AdminUser }>(`${this.base}/users/${id}`, changes);
  }

  private toParams(params: Record<string, unknown>): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        httpParams = httpParams.set(k, String(v));
      }
    });
    return httpParams;
  }
}
