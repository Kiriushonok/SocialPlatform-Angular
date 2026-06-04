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
  filteredProfiles = signal<Profile[]>([]);

  getTestAccounts() {
    return this.httpClient.get<Profile[]>(`${environment.baseApiUrl}/account/test_accounts`);
  }

  getMe() {
    return this.httpClient.get<Profile>(`${environment.baseApiUrl}/account/me`)
      .pipe(
        tap(res => this.me.set(res))
      );
  }

  getAccount(id: number) {
    return this.httpClient.get<Profile>(`${environment.baseApiUrl}/account/${id}`);
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.httpClient.get<Pageble<Profile>>(`${environment.baseApiUrl}/account/subscribers/`)
      .pipe(
        map(result => result.items.slice(0, subsAmount))
      );
  }

  patchProfile(profile: Partial<Profile>) {
    return this.httpClient.patch<Profile>(
      `${environment.baseApiUrl}/account/me`,
      profile
    )
  }

  uploadAvatar(file: File) {
    const fomrData = new FormData();

    fomrData.append("image", file);

    return this.httpClient.post<Profile>(
      `${environment.baseApiUrl}/account/upload_image`,
      fomrData
    )
  }

  filterProfiles(params: Record<string, any>) {
    return this.httpClient.get<Pageble<Profile>>(`${environment.baseApiUrl}/account/accounts`, { params })
      .pipe(
        tap(res => this.filteredProfiles.set(res.items))
      )
  }
}
