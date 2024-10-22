import { DatePipe } from '@angular/common';
import { Component, input, signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Equipment } from '@core/models/types/equipment.interface';
import { AvatarGroupComponent, AvatarGroupSize } from '../avatar-group/avatar-group.component';
import { BadgeComponent, BadgeSize, Color } from '../badge/badge.component';

export type DeviceCardView = 'availability' | 'documents';

@Component({
  standalone: true,
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
  imports: [MatIconModule, BadgeComponent, DatePipe, AvatarGroupComponent]
})
export class DeviceCardComponent {
  public data = input.required<Equipment>();

  public Color = Color;
  public BadgeSize = BadgeSize;
  public AvatarGroupSize = AvatarGroupSize;

  public $currentCardView: WritableSignal<DeviceCardView> = signal('availability');

  public toggle(): void {
    this.$currentCardView.update((current) => (current === 'availability' ? 'documents' : 'availability'));
  }
}
