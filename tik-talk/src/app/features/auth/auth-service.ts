import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { AuthResponse } from './auth.interface';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  cookieService = inject(CookieService);

  accessToken: string | null = null;
  refreshToken: string | null = null;

  get isAuthenticated() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get("accessToken");
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
      tap(val => {
        this.accessToken = val.access_token;
        this.refreshToken = val.refresh_token;

        this.cookieService.set("accessToken", val.access_token);
        this.cookieService.set("refreshToken", val.refresh_token);
      })
    );
  }
}
