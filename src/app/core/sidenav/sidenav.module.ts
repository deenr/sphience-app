import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { SidenavProfileComponent } from './sidenav-profile/sidenav-profile.component';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  exports: [SidenavComponent],
  declarations: [SidenavComponent, SidenavItemComponent, SidenavProfileComponent],
  imports: [MatIconModule, MatDividerModule, RouterModule]
})
export class SidenavModule {}
