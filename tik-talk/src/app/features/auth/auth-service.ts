import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { AuthResponse } from './auth.interface';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);

  accessToken: string | null = null;
  refreshToken: string | null = null;

  get isAuthenticated() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get("accessToken");
      this.refreshToken = this.cookieService.get("refreshToken");
    }
    return !!this.accessToken;
  }

  login(payload: { username: string, password: string }) {
    const formData = new FormData();
    formData.append("username", payload.username);
    formData.append("password", payload.password);

    return this.httpClient.post<AuthResponse>(
      `${environment.baseApiUrl}/auth/token`, formData
    ).pipe(
      tap(val => this.saveTokens(val))
    );
  }

  refreshAuthToken() {
    return this.httpClient.post<AuthResponse>(`${environment.baseApiUrl}/auth/refresh`,
      {
        refresh_token: this.refreshToken
      }
    ).pipe(
      tap(val => this.saveTokens(val)),
      catchError(error => {
        this.logout()
        return throwError(error);
      })
    )
  }

  logout() {
    this.cookieService.deleteAll();
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(["/login"]);
  }

  saveTokens(response: AuthResponse) {
    this.accessToken = response.access_token;
    this.refreshToken = response.refresh_token;

    this.cookieService.set("accessToken", this.accessToken);
    this.cookieService.set("refreshToken", this.refreshToken);
  }
}
