import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DeviceDocument } from '@core/models';

export enum AvatarSize {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL'
}

@Component({
  standalone: true,
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  imports: [MatIconModule]
})
export class AvatarComponent {
  public size = input<AvatarSize>(AvatarSize.MD);
  public document = input<DeviceDocument>();
}
