import { Component } from '@angular/core';
import { TableColumnBuilder } from '@shared/components/table/builder/table-column-builder';
import { TabsItem } from '@shared/components/tabs/tabs-item.interface';

export type EquipmentTabKey = 'all' | 'available' | 'favourites';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent {
  public tabs: TabsItem<EquipmentTabKey>[] = [
    { key: 'all', value: 'All devices' },
    { key: 'available', value: 'Available' },
    { key: 'favourites', value: 'Favourites' }
  ];

  public data = [
    {
      id: 1,
      name: 'Dean Reymen'
    },
    {
      id: 2,
      name: 'Marc Baeten'
    },
    {
      id: 3,
      name: 'Dirc Moulaerts'
    },
    {
      id: 1,
      name: 'Dean Reymen'
    },
    {
      id: 2,
      name: 'Marc Baeten'
    },
    {
      id: 3,
      name: 'Dirc Moulaerts'
    },
    {
      id: 1,
      name: 'Dean Reymen'
    },
    {
      id: 2,
      name: 'Marc Baeten'
    },
    {
      id: 3,
      name: 'Dirc Moulaerts'
    },
    {
      id: 1,
      name: 'Dean Reymen'
    },
    {
      id: 2,
      name: 'Marc Baeten'
    },
    {
      id: 3,
      name: 'Dirc Moulaerts'
    },
    {
      id: 1,
      name: 'Dean Reymen'
    },
    {
      id: 2,
      name: 'Marc Baeten'
    },
    {
      id: 3,
      name: 'Dirc Moulaerts'
    },
    {
      id: 1,
      name: 'Dean Reymen'
    },
    {
      id: 2,
      name: 'Marc Baeten'
    },
    {
      id: 3,
      name: 'Dirc Moulaerts'
    }
  ];

  public columns = [new TableColumnBuilder().setField('name').setHeaderName('Device name').build()];
}
