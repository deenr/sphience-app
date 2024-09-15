import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  imports: [DashboardRoutingModule, DashboardComponent]
})
export class DashboardModule {}
