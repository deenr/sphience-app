import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from '@shared/components/header/header.component';
import { EquipmentRoutingModule } from './equipment.routing';
import { EquipmentComponent } from './pages/equipment/equipment.component';

@NgModule({
  declarations: [EquipmentComponent],
  imports: [EquipmentRoutingModule, HeaderComponent, MatButtonModule, MatIconModule, MatMenuModule]
})
export class EquipmentModule {}
