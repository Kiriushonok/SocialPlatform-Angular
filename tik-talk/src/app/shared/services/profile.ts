import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { Profile } from '../interfaces/Profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  httpClient = inject(HttpClient);

  getTestAccounts() {
    return this.httpClient.get<Profile[]>(`${environment.baseApiUrl}/account/test_accounts`);
  }

  getMe() {
    return this.httpClient.get<Profile>(`${environment.baseApiUrl}/account/me`);
  }
}
