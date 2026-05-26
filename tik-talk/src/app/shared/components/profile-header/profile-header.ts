import { Component, input } from '@angular/core';
import { Profile } from '../../interfaces/Profile';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-profile-header',
  imports: [],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
})
export class ProfileHeader {
  protected readonly baseApiUrl = environment.baseApiUrl;

  profile = input<Profile>();
}
