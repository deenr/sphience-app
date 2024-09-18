import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableColumnBuilder } from '@shared/components/table/builder/table-column-builder';
import { TabsItem } from '@shared/components/tabs/tabs-item.interface';

export type EquipmentTabKey = 'all' | 'available' | 'favourites';
type EquipmentView = 'grid' | 'list';

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
  public activeTab = this.tabs[0];

  public $equipmentView: WritableSignal<EquipmentView> = signal('list');

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

  public constructor(private readonly activatedRoute: ActivatedRoute) {
    const tabKey = this.activatedRoute.snapshot.queryParams['tab'];
    const tab = this.tabs.find((tab) => tab.key === tabKey);
    if (tabKey && tab) {
      this.activeTab = tab;
    }
  }

  public onViewChange(view: EquipmentView): void {
    this.$equipmentView.set(view);
  }
}
