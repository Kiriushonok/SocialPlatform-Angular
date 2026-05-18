import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCard } from './shared/components/profile-card/profile-card';
import { ProfileService } from './shared/services/profile';
import { Profile } from './shared/interfaces/Profile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  profileService = inject(ProfileService);
  profiles = signal<Profile[]>([]);

  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(value => {
        this.profiles.set(value);
      })
  }
}
