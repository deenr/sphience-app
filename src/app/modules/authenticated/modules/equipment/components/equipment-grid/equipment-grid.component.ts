import { Component, input } from '@angular/core';
import { MicroscopeData } from '@shared/components/device-card/device-card.component';

@Component({
  selector: 'app-equipment-grid',
  templateUrl: './equipment-grid.component.html',
  styleUrls: ['./equipment-grid.component.scss']
})
export class EquipmentGridComponent {
  public data = input.required<MicroscopeData[]>();
}
