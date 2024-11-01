import { Component, input } from '@angular/core';
import { EquipmentResponse } from '@core/models';

@Component({
  selector: 'app-equipment-grid',
  templateUrl: './equipment-grid.component.html',
  styleUrls: ['./equipment-grid.component.scss']
})
export class EquipmentGridComponent {
  public data = input.required<EquipmentResponse[]>();
}
