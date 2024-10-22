import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
  imports: [MatIconModule, MatDivider]
})
export class MobileHeaderComponent {
  public sidenavOpened = input.required<boolean>();
  @Output() public sidenavToggle = new EventEmitter();
}
