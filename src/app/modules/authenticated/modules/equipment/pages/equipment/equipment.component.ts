import { Component, signal, WritableSignal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '@core/services/local-storage.service';
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
  public primaryActionButton = { icon: 'plus', text: 'Make new reservation' };
  public secondaryActionButton = { icon: 'cloud-upload', text: 'Upload document' };
  public extraActionButtons = [
    { icon: 'plus', text: 'Add device' },
    { icon: 'trash', text: 'Remove selected device(s)' }
  ];

  public tabs: TabsItem<EquipmentTabKey>[] = [
    { key: 'all', value: 'All devices' },
    { key: 'available', value: 'Available' },
    { key: 'favourites', value: 'Favourites' }
  ];
  public activeTab = this.tabs[0];

  public $equipmentView: WritableSignal<EquipmentView> = signal('list');

  public filterForm = this.formBuilder.group({
    name: this.formBuilder.control<string | null>(null),
    dates: this.formBuilder.group({
      startDate: this.formBuilder.control<Date | null>(null),
      endDate: this.formBuilder.control<Date | null>(null)
    })
  });

  public data = [
    { id: 1, name: 'hello', imageSrc: '', documentCount: 12, users: ['', '', ''] },
    { id: 2, name: 'hello', imageSrc: '', documentCount: 12, users: ['', '', ''] },
    { id: 2, name: 'hello', imageSrc: '', documentCount: 12, users: ['', '', ''] },
    { id: 3, name: 'hello', imageSrc: '', documentCount: 12, users: ['', '', ''] },
    { id: 4, name: 'hello', imageSrc: '', documentCount: 12, users: ['', '', ''] },
    { id: 5, name: 'hello', imageSrc: '', documentCount: 12, users: ['', '', ''] }
  ];

  public columns = [new TableColumnBuilder().setField('name').setHeaderName('Device name').build()];

  private readonly EQUIPMENT_VIEW_KEY = 'EQUIPMENT_VIEW';

  public constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {
    const tabKey = this.activatedRoute.snapshot.queryParams['tab'];
    const tab = this.tabs.find((tab) => tab.key === tabKey);
    if (tabKey && tab) {
      this.activeTab = tab;
    }

    const savedView = this.localStorageService.getItem(this.EQUIPMENT_VIEW_KEY);
    if (savedView) {
      this.onViewChange(savedView as EquipmentView);
    }
  }

  public onViewChange(view: EquipmentView): void {
    this.localStorageService.setItem(this.EQUIPMENT_VIEW_KEY, view);
    this.$equipmentView.set(view);
  }

  public onDateChange(dates: [Date, Date] | [null, null]): void {
    const { startDate, endDate } = this.filterForm.controls.dates.controls;
    startDate.setValue(dates[0]);
    endDate.setValue(dates[1]);
  }
}
