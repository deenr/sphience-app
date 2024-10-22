import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DatepickerButtonComponent } from './datepicker-button/datepicker-button.component';
import { DatepickerMenuComponent } from './datepicker-menu/datepicker-menu.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [MatIconModule, MatFormFieldModule, DatePipe, MatInputModule, MatButtonModule, MatMenuModule],
  declarations: [DatepickerMenuComponent, DatepickerButtonComponent],
  exports: [DatepickerButtonComponent]
})
export class DatepickerModule {}
