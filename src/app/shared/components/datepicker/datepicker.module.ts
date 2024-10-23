import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { DatepickerButtonComponent } from './datepicker-button/datepicker-button.component';
import { DatepickerDialogComponent } from './datepicker-dialog/datepicker-dialog.component';
import { DatepickerMenuComponent } from './datepicker-menu/datepicker-menu.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatFormFieldModule, DatePipe, MatInputModule, MatButtonModule, MatMenuModule, MatDialogModule],
  declarations: [DatepickerMenuComponent, DatepickerButtonComponent, DatepickerDialogComponent],
  exports: [DatepickerButtonComponent]
})
export class DatepickerModule {}
