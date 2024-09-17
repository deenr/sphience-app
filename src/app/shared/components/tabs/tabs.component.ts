import { ChangeDetectionStrategy, Component, input, model, OnInit, output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsItem } from './tabs-item.interface';

@Component({
  standalone: true,
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTabsModule]
})
export class TabsComponent<T> implements OnInit {
  public tabs = input.required<TabsItem<T>[]>();
  public activeTab = model<TabsItem<T> | null>(null);
  public activeTabChange = output<TabsItem<T>>();

  public ngOnInit(): void {
    if (!this.activeTab() && this.tabs()[0]) {
      this.changeActiveTab(this.tabs()[0]);
    }
  }

  public changeActiveTab(tab: TabsItem<T>): void {
    this.activeTabChange.emit(tab);
    this.activeTab.set(tab);
  }
}
