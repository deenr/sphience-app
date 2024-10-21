import { Component, input, output } from '@angular/core';

export interface SidenavItem {
  icon: string;
  text: string;
  link: string;
}

@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent {
  public icon = input.required<string>();
  public text = input.required<string>();
  public link = input.required<string>();
  public sidenavItemClick = output<void>();
}
