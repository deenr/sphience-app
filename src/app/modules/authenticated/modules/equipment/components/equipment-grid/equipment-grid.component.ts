import { Component, input } from '@angular/core';
import { Equipment } from '@core/models/types/equipment.interface';

@Component({
  selector: 'app-equipment-grid',
  templateUrl: './equipment-grid.component.html',
  styleUrls: ['./equipment-grid.component.scss']
})
export class EquipmentGridComponent {
  public data = input.required<Equipment[]>();
}
