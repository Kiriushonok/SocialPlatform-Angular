import { Component, inject, signal } from '@angular/core';
import { ProfileService } from '../../shared/services/profile';
import { ProfileCard } from "../../shared/components/profile-card/profile-card";
import { ProfileFilters } from '../../shared/components/profile-filters/profile-filters';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFilters, AsyncPipe],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;

  constructor() { }
}
