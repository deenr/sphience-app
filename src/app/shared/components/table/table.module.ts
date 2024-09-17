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
import { NestedValuePipe } from './pipes/nested-value.pipe';
import { TranslationKeyPipe } from './pipes/translation-key.pipe';
import { TableOverlayComponent } from './table-overlay/table-overlay.component';
import { TableTitleAndDescriptionComponent } from './table-title-and-description/table-title-and-description.component';
import { TableComponent } from './table.component';

@NgModule({
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatCheckboxModule, MatIconModule, MatChipsModule, MatProgressBarModule, MatTooltipModule, MatMenuModule, TranslateModule],
  declarations: [TableComponent, TableTitleAndDescriptionComponent, NestedValuePipe, TableOverlayComponent, TranslationKeyPipe],
  exports: [TableComponent]
})
export class TableModule {}
