import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DeviceCardComponent } from '@shared/components/device-card/device-card.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { QuickActionComponent } from './components/quick-action/quick-action.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent, QuickActionComponent],
  imports: [DashboardRoutingModule, HeaderComponent, DeviceCardComponent, MatButtonModule, MatIconModule]
})
export class DashboardModule {}
