import { Component, input } from '@angular/core';
import { AvatarComponent, AvatarSize } from '../avatar/avatar.component';

export enum AvatarGroupSize {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD'
}

@Component({
  standalone: true,
  selector: 'app-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.scss'],
  imports: [AvatarComponent]
})
export class AvatarGroupComponent {
  public size = input<AvatarGroupSize>(AvatarGroupSize.MD);
  public imagesSrc = input<string[]>();

  public get avatarSize(): AvatarSize {
    return this.size() as any as AvatarSize;
  }
}
