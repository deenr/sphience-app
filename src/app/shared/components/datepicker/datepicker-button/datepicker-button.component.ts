import { DatePipe } from '@angular/common';
import { Component, computed, output, signal, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointService } from '@core/services/breakpoint.service';
import { take } from 'rxjs';
import { DatepickerDialogComponent } from '../datepicker-dialog/datepicker-dialog.component';

@Component({
  selector: 'app-datepicker-button',
  templateUrl: './datepicker-button.component.html',
  styleUrls: ['./datepicker-button.component.scss']
})
export class DatepickerButtonComponent {
  public dateRangeChange = output<[Date, Date] | [null, null]>();

  public $dateRange: WritableSignal<[Date, Date] | [null, null]> = signal([null, null]);
  public $hasValidDateRange = computed(() => {
    const [startDate, endDate] = this.$dateRange();
    return startDate && endDate;
  });
  public $buttonText = computed(() => {
    const [startDate, endDate] = this.$dateRange();
    if (startDate && endDate) {
      return `${this.datePipe.transform(startDate)} – ${this.datePipe.transform(endDate)}`;
    }

    return 'Select dates';
  });

  public isDesktop$ = this.breakpointService.isDesktop$;

  public constructor(
    private readonly datePipe: DatePipe,
    private readonly breakpointService: BreakpointService,
    private readonly dialog: MatDialog
  ) {}

  public onDateChange(dates: [Date, Date]): void {
    this.$dateRange.set(dates);
    this.dateRangeChange.emit(dates);
  }

  public clearDates(): void {
    this.$dateRange.set([null, null]);
    this.dateRangeChange.emit([null, null]);
  }

  public openDatepickerDialog(): void {
    this.dialog
      .open<DatepickerDialogComponent>(DatepickerDialogComponent, {
        maxWidth: 'calc(100vw - 32px)',
        hasBackdrop: true,
        data: {
          dateRange: this.$dateRange(),
          withActions: true
        }
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((dates: [Date, Date]) => {
        if (dates) this.onDateChange(dates);
      });
  }
}
