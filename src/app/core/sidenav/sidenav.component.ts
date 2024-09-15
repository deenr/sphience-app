import { Component, input, output } from '@angular/core';
import { SidenavItem } from './sidenav-item/sidenav-item.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  public topItems = input<SidenavItem[]>([
    { icon: 'home', text: 'Home', link: 'dashboard' },
    { icon: '3-layers', text: 'Equipment', link: 'equipment' },
    { icon: 'calendar', text: 'Reservation', link: 'reservation' },
    { icon: 'file', text: 'Documents', link: 'document' }
  ]);
  public bottomItems = input<SidenavItem[]>([
    { icon: 'buoy', text: 'Support', link: 'support' },
    { icon: 'settings', text: 'Settings', link: 'settings' }
  ]);

  public logout = output<void>();
}
