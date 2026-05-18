import { Component, Input } from '@angular/core';
import { SkillTag } from '../skill-tag/skill-tag';
import { Button } from "../button/button";
import { Profile } from '../../interfaces/Profile';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-profile-card',
  imports: [SkillTag, Button],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  @Input() profile!: Profile;

  protected readonly baseApiUrl = environment.baseApiUrl;
}
