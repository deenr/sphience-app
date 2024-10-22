import { DatePipe } from '@angular/common';
import { Component, computed, output, signal, WritableSignal } from '@angular/core';

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

  public constructor(private readonly datePipe: DatePipe) {}

  public onDateChange(dates: [Date, Date]): void {
    this.$dateRange.set(dates);
    this.dateRangeChange.emit(dates);
  }

  public clearDates(): void {
    this.$dateRange.set([null, null]);
    this.dateRangeChange.emit([null, null]);
  }
}
