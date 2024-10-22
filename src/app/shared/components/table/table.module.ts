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
import { TooltipWithContentComponent } from '../tooltip-with-content/tooltip-with-content.component';
import { NestedValuePipe } from './pipes/nested-value.pipe';
import { TableImageComponent } from './table-image/table-image.component';
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
    AvatarGroupComponent,
    MatTooltipModule,
    TooltipWithContentComponent
  ],
  declarations: [TableComponent, NestedValuePipe, TableOverlayComponent, TableImageComponent],
  exports: [TableComponent]
})
export class TableModule {}
