import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MobileHeaderComponent } from '@core/components/mobile-header/mobile-header.component';
import { SidenavModule } from '@core/components/sidenav/sidenav.module';
import { AuthenticatedRoutingModule } from './authenticated.routing';
import { AuthenticatedLayoutComponent } from './components/authenticated-layout/authenticated-layout.component';

@NgModule({
  declarations: [AuthenticatedLayoutComponent],
  imports: [CommonModule, AuthenticatedRoutingModule, RouterOutlet, SidenavModule, MatSidenavModule, MobileHeaderComponent]
})
export class AuthenticatedModule {}
