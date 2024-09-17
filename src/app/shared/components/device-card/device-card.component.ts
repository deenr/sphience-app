import { DatePipe } from '@angular/common';
import { Component, input, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AvatarGroupComponent, AvatarGroupSize } from '../avatar-group/avatar-group.component';
import { BadgeComponent, BadgeSize, Color } from '../badge/badge.component';

export interface BaseMicroscopeData {
  name: string;
  imageSrc: string;
}

export interface AvailableMicroscope extends BaseMicroscopeData {
  availableUntil: Date;
}

export interface UnavailableMicroscope extends BaseMicroscopeData {
  availableFrom: Date;
}

export interface PickupMicroscope extends BaseMicroscopeData {
  reservationDate: Date;
}

export interface ReturnMicroscope extends BaseMicroscopeData {
  reservationEndDate: Date;
}

export interface DocumentsMicroscope extends BaseMicroscopeData {
  documentCount: number;
  users: string[];
}

type MicroscopeData = AvailableMicroscope | UnavailableMicroscope | PickupMicroscope | ReturnMicroscope | DocumentsMicroscope;

@Component({
  standalone: true,
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
  imports: [MatIconModule, BadgeComponent, DatePipe, AvatarGroupComponent]
})
export class DeviceCardComponent {
  public data = input.required<MicroscopeData>();

  public Color = Color;
  public BadgeSize = BadgeSize;
  public AvatarGroupSize = AvatarGroupSize;

  public get availableData(): Signal<AvailableMicroscope> {
    return this.data as Signal<AvailableMicroscope>;
  }

  public get unavailableData(): Signal<UnavailableMicroscope> {
    return this.data as Signal<UnavailableMicroscope>;
  }

  public get pickupData(): Signal<PickupMicroscope> {
    return this.data as Signal<PickupMicroscope>;
  }

  public get returnData(): Signal<ReturnMicroscope> {
    return this.data as Signal<ReturnMicroscope>;
  }

  public get documentsData(): Signal<DocumentsMicroscope> {
    return this.data as Signal<DocumentsMicroscope>;
  }

  public get daysTillPickup(): number {
    return this.getDiffBetweenToDays(new Date(), this.pickupData().reservationDate);
  }

  public get daysTillDropoff(): number {
    return this.getDiffBetweenToDays(new Date(), this.returnData().reservationEndDate);
  }

  public isAvailableMicroscope(data: MicroscopeData): data is AvailableMicroscope {
    return 'availableUntil' in data;
  }

  public isUnavailableMicroscope(data: MicroscopeData): data is UnavailableMicroscope {
    return 'availableFrom' in data;
  }

  public isPickupMicroscope(data: MicroscopeData): data is PickupMicroscope {
    return 'reservationDate' in data;
  }

  public isReturnMicroscope(data: MicroscopeData): data is ReturnMicroscope {
    return 'reservationEndDate' in data;
  }

  public isDocumentsMicroscope(data: MicroscopeData): data is DocumentsMicroscope {
    return 'documentCount' in data && 'users' in data;
  }

  private getDiffBetweenToDays(dateA: Date, dateB: Date): number {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const utc1 = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
    const utc2 = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
}
