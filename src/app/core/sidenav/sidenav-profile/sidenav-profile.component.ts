import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-sidenav-profile',
  templateUrl: './sidenav-profile.component.html',
  styleUrls: ['./sidenav-profile.component.scss']
})
export class SidenavProfileComponent {
  public name = input.required<string>();
  public email = input.required<string>();

  public logout = output<void>();
}
