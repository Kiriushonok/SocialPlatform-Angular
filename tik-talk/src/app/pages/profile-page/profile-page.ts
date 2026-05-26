import { Component, inject } from '@angular/core';
import { ProfileService } from '../../shared/services/profile';
import { ProfileHeader } from "../../shared/components/profile-header/profile-header";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIcon } from "../../shared/components/svg-icon/svg-icon";
import { environment } from '../../../environment';
import { SkillTag } from "../../shared/components/skill-tag/skill-tag";
import { PostFeed } from "../../features/post-feed/post-feed";

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, AsyncPipe, RouterLink, SvgIcon, SkillTag, PostFeed],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);

  baseApiUrl = environment.baseApiUrl;

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(5);

  profile$ = this.route.params
    .pipe(
      switchMap(({ id }) => {
        if (id === "me") return this.me$

        return this.profileService.getAccount(id);
      })
    )
}
