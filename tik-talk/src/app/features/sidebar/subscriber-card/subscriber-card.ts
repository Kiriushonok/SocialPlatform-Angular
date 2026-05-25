import { Component, Input } from '@angular/core';
import { Profile } from '../../../shared/interfaces/Profile';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-subscriber-card',
  imports: [],
  templateUrl: './subscriber-card.html',
  styleUrl: './subscriber-card.scss',
})
export class SubscriberCard {
  @Input() profile!: Profile;

  protected readonly baseApiUrl = environment.baseApiUrl;
}
