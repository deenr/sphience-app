import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TableModule } from '@shared/components/table/table.module';
import { TabsComponent } from '@shared/components/tabs/tabs.component';
import { EquipmentRoutingModule } from './equipment.routing';
import { EquipmentComponent } from './pages/equipment/equipment.component';

@NgModule({
  declarations: [EquipmentComponent],
  imports: [EquipmentRoutingModule, HeaderComponent, MatButtonModule, MatIconModule, MatMenuModule, TableModule, TabsComponent, MatFormFieldModule, MatInputModule, MatButtonToggleModule]
})
export class EquipmentModule {}
