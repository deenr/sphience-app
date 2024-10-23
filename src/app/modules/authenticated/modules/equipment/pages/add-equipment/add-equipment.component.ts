import { Component } from '@angular/core';
import { TabsItem } from '@shared/components/tabs/tabs-item.interface';

export type AddEquipmentTabKey = 'details' | 'documents';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent {
  public tabs: TabsItem<AddEquipmentTabKey>[] = [
    { key: 'details', value: 'Device details' },
    { key: 'documents', value: 'Documents', disabled: true }
  ];
  public activeTab = this.tabs[0];
}
