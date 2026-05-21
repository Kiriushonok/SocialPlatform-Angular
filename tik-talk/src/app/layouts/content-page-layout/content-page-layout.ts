import { Component, inject } from '@angular/core';
import { Sidebar } from "../../features/sidebar/sidebar";
import { RouterOutlet } from "@angular/router";
import { ProfileService } from '../../shared/services/profile';

@Component({
  selector: 'app-content-page-layout',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './content-page-layout.html',
  styleUrl: './content-page-layout.scss',
})
export class ContentPageLayout {
  profileService = inject(ProfileService);

  ngOnInit() {
    this.profileService.getMe().subscribe();
  }
}
