import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment';
import { Profile } from '../interfaces/Profile';
import { Pageble } from '../interfaces/Pageble';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  httpClient = inject(HttpClient);

  me = signal<Profile | null>(null);

  getTestAccounts() {
    return this.httpClient.get<Profile[]>(`${environment.baseApiUrl}/account/test_accounts`);
  }

  getMe() {
    return this.httpClient.get<Profile>(`${environment.baseApiUrl}/account/me`)
      .pipe(
        tap(res => this.me.set(res))
      );
  }

  getSubscribersShortList() {
    return this.httpClient.get<Pageble<Profile>>(`${environment.baseApiUrl}/account/subscribers/`)
      .pipe(
        map(result => result.items.slice(0, 3))
      );
  }
}
