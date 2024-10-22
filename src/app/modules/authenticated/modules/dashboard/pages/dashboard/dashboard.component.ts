import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AvailableMicroscope, DocumentsMicroscope, PickupMicroscope, ReturnMicroscope, UnavailableMicroscope } from '@shared/components/device-card/device-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public primaryActionButton = { icon: 'plus', text: 'Make new reservation' };
  public secondaryActionButton = { icon: 'cloud-upload', text: 'Upload document' };

  public availableMicroscope: AvailableMicroscope = {
    name: 'hello',
    imageSrc: '',
    availableUntil: new Date()
  };
  public unavailableMicroscope: UnavailableMicroscope = {
    name: 'hello',
    imageSrc: '',
    availableFrom: new Date()
  };
  public pickupMicroscope: PickupMicroscope = {
    name: 'hello',
    imageSrc: '',
    reservationDate: new Date(Date.now() + 86400000)
  };
  public returnMicroscope: ReturnMicroscope = {
    name: 'hello',
    imageSrc: '',
    reservationEndDate: new Date(Date.now() + 86400000)
  };
  public documentsMicroscope: DocumentsMicroscope = {
    name: 'hello',
    imageSrc: '',
    documentCount: 12,
    users: ['', '', '']
  };

  public constructor(private readonly router: Router) {}

  public navigateToFavouriteDevices(): void {
    this.router.navigate(['/equipment'], { queryParams: { tab: 'favourites' } });
  }
}
