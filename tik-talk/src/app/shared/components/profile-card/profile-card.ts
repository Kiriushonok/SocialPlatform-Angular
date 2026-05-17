import { Component } from '@angular/core';
import { SkillTag } from '../skill-tag/skill-tag';

@Component({
  selector: 'app-profile-card',
  imports: [SkillTag],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard { }
