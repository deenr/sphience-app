import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public primaryActionButton = { icon: 'plus', text: 'Make new reservation' };
  public secondaryActionButton = { icon: 'cloud-upload', text: 'Upload document' };

  public constructor(private readonly router: Router) {}

  public navigateToFavouriteDevices(): void {
    this.router.navigate(['/equipment'], { queryParams: { tab: 'favourites' } });
  }
}
