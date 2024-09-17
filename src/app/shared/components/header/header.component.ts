import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public title = input<string>();
  public description = input<string>();
}
