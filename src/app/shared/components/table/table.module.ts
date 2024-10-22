import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarGroupComponent } from '../avatar-group/avatar-group.component';
import { BadgeComponent } from '../badge/badge.component';
import { NestedValuePipe } from './pipes/nested-value.pipe';
import { TableOverlayComponent } from './table-overlay/table-overlay.component';
import { TableComponent } from './table.component';

@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatMenuModule,
    TranslateModule,
    BadgeComponent,
    AvatarGroupComponent
  ],
  declarations: [TableComponent, NestedValuePipe, TableOverlayComponent],
  exports: [TableComponent]
})
export class TableModule {}
