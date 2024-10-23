import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEquipmentComponent } from './pages/add-equipment/add-equipment.component';
import { EquipmentComponent } from './pages/equipment/equipment.component';

const routes: Routes = [
  {
    path: 'equipment',
    component: EquipmentComponent
  },
  {
    path: 'equipment/add',
    component: AddEquipmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule {}
