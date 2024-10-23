import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActionButtonsComponent } from '@shared/components/action-buttons/action-buttons.component';
import { DatepickerModule } from '@shared/components/datepicker/datepicker.module';
import { DeviceCardComponent } from '@shared/components/device-card/device-card.component';
import { FilterComponent } from '@shared/components/filter/filter.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TableModule } from '@shared/components/table/table.module';
import { TabsComponent } from '@shared/components/tabs/tabs.component';
import { EquipmentGridComponent } from './components/equipment-grid/equipment-grid.component';
import { EquipmentRoutingModule } from './equipment.routing';
import { AddEquipmentComponent } from './pages/add-equipment/add-equipment.component';
import { EquipmentComponent } from './pages/equipment/equipment.component';

@NgModule({
  declarations: [EquipmentComponent, EquipmentGridComponent, AddEquipmentComponent],
  providers: [DatePipe],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TableModule,
    TabsComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDialogModule,
    ReactiveFormsModule,
    DeviceCardComponent,
    ActionButtonsComponent,
    DatepickerModule,
    FilterComponent,
    MatDividerModule,
    MatSelectModule
  ]
})
export class EquipmentModule {}
