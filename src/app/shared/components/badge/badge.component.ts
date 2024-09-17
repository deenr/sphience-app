import { Component, ElementRef, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export enum Color {
  GREY = 'GREY',
  PRIMARY = 'PRIMARY',
  ACCENT = 'ACCENT',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  GREY_BLUE = 'GREY_BLUE',
  GREY_COOL = 'GREY_COOL',
  GREY_MODERN = 'GREY_MODERN',
  GREY_NEUTRAL = 'GREY_NEUTRAL',
  GREY_IRON = 'GREY_IRON',
  GREY_TRUE = 'GREY_TRUE',
  GREY_WARM = 'GREY_WARM',
  MOSS = 'MOSS',
  GREEN_LIGHT = 'GREEN_LIGHT',
  GREEN = 'GREEN',
  TEAL = 'TEAL',
  CYAN = 'CYAN',
  BLUE_LIGHT = 'BLUE_LIGHT',
  BLUE = 'BLUE',
  BLUE_DARK = 'BLUE_DARK',
  INDIGO = 'INDIGO',
  VIOLET = 'VIOLET',
  PURPLE = 'PURPLE',
  FUCHSIA = 'FUCHSIA',
  PINK = 'PINK',
  ROSE = 'ROSE',
  DARK_ORANGE = 'DARK_ORANGE',
  ORANGE = 'ORANGE',
  YELLOW = 'YELLOW'
}

export enum BadgeSize {
  SM = 'SM',
  MD = 'MD',
  LG = 'LG'
}

export enum BadgeType {
  NONE = 'NONE',
  DOT = 'DOT',
  COUNTRY = 'COUNTRY',
  AVATAR = 'AVATAR',
  CLOSE = 'CLOSE',
  TRAILING_ICON = 'TRAILING_ICON',
  LEADING_ICON = 'LEADING_ICON'
}

@Component({
  standalone: true,
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  imports: [MatIconModule]
})
export class BadgeComponent {
  public color = input<Color>(Color.GREY);
  public size = input<BadgeSize>(BadgeSize.MD);
  public type = input<BadgeType>(BadgeType.NONE);
  public icon = input<string>();
  public leadingClick = output<void>();
  public trailingClick = output<void>();
  public closeClick = output<void>();

  public badgeType = BadgeType;

  public constructor(public elementRef: ElementRef) {}

  public getBadgeClasses(): string {
    return `badge ${this.color().toLowerCase().replace('_', '-')} ${this.size().toLowerCase()} ${this.type() !== BadgeType.NONE ? this.type().toLowerCase().replace('_', '-') : ''}`;
  }
}
