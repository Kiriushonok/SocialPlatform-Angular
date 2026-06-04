import { Component, inject } from '@angular/core';
import { SvgIcon } from "../../shared/components/svg-icon/svg-icon";
import { NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ProfileService } from '../../shared/services/profile';
import { AsyncPipe } from '@angular/common';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment';


@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, NgForOf, RouterLink, AsyncPipe, SubscriberCard, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  profileService = inject(ProfileService);

  baseApiUrl = environment.baseApiUrl;

  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    {
      label: "Моя страница",
      icon: "home-icon",
      link: "/profile/me"
    },
    {
      label: "Чаты",
      icon: "chat-icon",
      link: "/chats"
    },
    {
      label: "Поиск",
      icon: "search-icon",
      link: "/search"
    }
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
