import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skill-tag',
  imports: [],
  templateUrl: './skill-tag.html',
  styleUrl: './skill-tag.scss',
})
export class SkillTag {
  text = input.required<string>();
  isMain = input(false);
}
