import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent {
  public $isExtraOptionsOpen: WritableSignal<boolean> = signal(false);
}
