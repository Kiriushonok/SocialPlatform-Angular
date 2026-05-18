import { Component } from '@angular/core';
import { SkillTag } from '../skill-tag/skill-tag';
import { Button } from "../button/button";

@Component({
  selector: 'app-profile-card',
  imports: [SkillTag, Button],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard { }
