import { Component, inject, signal } from '@angular/core';
import { ProfileService } from '../../shared/services/profile';
import { Profile } from '../../shared/interfaces/Profile';
import { ProfileCard } from "../../shared/components/profile-card/profile-card";

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  profileService = inject(ProfileService);
  profiles = signal<Profile[]>([]);

  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(value => {
        this.profiles.set(value);
      })
  }
}
