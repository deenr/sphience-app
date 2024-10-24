import { Component, computed, input } from '@angular/core';
import { EquipmentDocument } from '@core/models';
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
  public documents = input.required<EquipmentDocument[]>();
  public maxItems = input<number>(Infinity);

  public get avatarSize(): AvatarSize {
    return this.size() as any as AvatarSize;
  }

  public $visibleDocuments = computed(() => (this.$hasMoreImages() ? [...this.documents()]?.splice(0, this.maxItems() - 1) : [...this.documents()]));

  public $hasMoreImages = computed(() => {
    const documents = this.documents();
    return !!documents && documents?.length > this.maxItems();
  });
}
