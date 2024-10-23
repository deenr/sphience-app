import { Component, Inject, signal, WritableSignal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-datepicker-dialog',
  templateUrl: 'datepicker-dialog.component.html',
  styleUrls: ['datepicker-dialog.component.scss']
})
export class DatepickerDialogComponent {
  private $dateRange = signal<[Date, Date] | [null, null]>([null, null]);
  public $withActions = signal<boolean>(false);
  public $unavailableDates = signal<Date[]>([]);

  public currentDateInView: Date;

  public $selectedStartDate: WritableSignal<Date | null> = signal(null);
  public $selectedEndDate: WritableSignal<Date | null> = signal(null);

  public calendarDates: Date[] = [];
  public currentMonth: string;
  public weekdays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  public constructor(
    public dialogRef: MatDialogRef<DatepickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      dateRange: [Date, Date] | [null, null];
      withActions: boolean;
      unavailableDates?: Date[];
    }
  ) {
    const today = new Date();
    this.currentDateInView = today;
    this.currentMonth = this.getMonthYearString(this.currentDateInView);
    this.generateCalendarDates(this.currentDateInView);

    if (this.data) {
      this.$withActions.set(this.data.withActions);
      if (this.data.unavailableDates) this.$unavailableDates.set(this.data.unavailableDates);

      if (this.data.dateRange) {
        const [startDate, endDate] = this.data.dateRange;
        this.$selectedStartDate.set(startDate);
        this.$selectedEndDate.set(endDate);
        this.$dateRange.set(this.data.dateRange);

        if (startDate) {
          this.currentDateInView = new Date(startDate);
          this.currentMonth = this.getMonthYearString(this.currentDateInView);
          this.generateCalendarDates(this.currentDateInView);
        }
      }
    }
  }

  public changeToToday(): void {
    const today = new Date();
    this.currentDateInView = today;
    this.currentMonth = this.getMonthYearString(this.currentDateInView);
    this.generateCalendarDates(this.currentDateInView);
  }

  public goToPreviousMonth(): void {
    if (this.currentDateInView) {
      this.currentDateInView.setFullYear(this.currentDateInView.getMonth() === 1 ? this.currentDateInView.getFullYear() - 1 : this.currentDateInView.getFullYear());
      this.currentDateInView.setMonth(this.currentDateInView.getMonth() === 1 ? 12 : this.currentDateInView.getMonth() - 1);
      this.currentMonth = this.getMonthYearString(this.currentDateInView);
      this.generateCalendarDates(this.currentDateInView);
    }
  }

  public goToNextMonth(): void {
    if (this.currentDateInView) {
      this.currentDateInView.setFullYear(this.currentDateInView.getMonth() === 12 ? this.currentDateInView.getFullYear() + 1 : this.currentDateInView.getFullYear());
      this.currentDateInView.setMonth(this.currentDateInView.getMonth() === 12 ? 1 : this.currentDateInView.getMonth() + 1);
      this.currentMonth = this.getMonthYearString(this.currentDateInView);
      this.generateCalendarDates(this.currentDateInView);
    }
  }

  public selectDate(date: Date): void {
    if (this.isDateUnavailable(date)) {
      return;
    }

    if (!this.$selectedStartDate()) {
      this.$selectedStartDate.set(date);
    } else if (!this.$selectedEndDate()) {
      const startDate = this.$selectedStartDate();
      if (startDate && this.isDateBefore(date, startDate)) {
        this.$selectedEndDate.set(this.$selectedStartDate());
        this.$selectedStartDate.set(date);
      } else {
        this.$selectedEndDate.set(date);
      }
    } else if (this.$selectedStartDate() && this.$selectedEndDate()) {
      this.$selectedStartDate.set(date);
      this.$selectedEndDate.set(null);
    }
  }

  public isDateToday(date: Date): boolean {
    const today = new Date();

    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear() && date.getDate() === today.getDate();
  }

  public isDateInRange(date: Date): boolean {
    const startDate = this.$selectedStartDate();
    const endDate = this.$selectedEndDate();
    if (startDate && endDate) {
      return date.getTime() > startDate?.getTime() && date.getTime() <= endDate?.getTime();
    }
    return false;
  }

  public isDateInRangeAndSaturday(date: Date): boolean {
    return this.isDateInRange(date) && date.getDay() === 6 && date.getHours() > 12;
  }

  public isDateInRangeAndSunday(date: Date): boolean {
    return this.isDateInRange(date) && date.getDay() === 0 && date.getHours() < 12;
  }

  public isDateInCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDateInView?.getMonth();
  }

  public getRangeDates(): Date[] {
    const rangeDates: Date[] = [];
    this.calendarDates.forEach((date: Date) => {
      const morningDate = new Date(date);
      morningDate.setHours(0, 0, 0, 0);
      rangeDates.push(morningDate);

      const nightDate = new Date(date);
      nightDate.setHours(23, 59, 59, 999);

      rangeDates.push(nightDate);
    });

    return rangeDates;
  }

  public isDateEqual(date1: Date | null, date2: Date | null): boolean {
    if (!date1 || !date2) {
      return false;
    }

    return date1?.getDate() === date2?.getDate() && date1?.getMonth() === date2?.getMonth() && date1?.getFullYear() === date2?.getFullYear();
  }

  public isDateUnavailable(date: Date): boolean {
    return this.$unavailableDates()?.some((unavailableDate: Date) => this.isDateEqual(unavailableDate, date));
  }

  public isDateRangeUnavailable(date: Date): boolean {
    return this.$unavailableDates().some((unavailableDate: Date, index: number) => {
      const dayBefore = this.$unavailableDates()[index - 1];
      const dayAfter = this.$unavailableDates()[index + 1];

      const hasRange = (dayBefore && dayBefore.getDate() === unavailableDate.getDate() - 1) || (dayAfter && dayAfter.getDate() === unavailableDate.getDate() + 1);

      if (!hasRange || !this.isDateEqual(unavailableDate, date)) {
        return false;
      }

      const firstDayInRange = this.findFirstDateOfRange(date, this.$unavailableDates());
      const lastDayInRange = this.findLastDateOfRange(date, this.$unavailableDates());

      if (firstDayInRange && this.isDateEqual(firstDayInRange, date)) {
        return firstDayInRange.getHours() > 0;
      } else if (lastDayInRange && this.isDateEqual(lastDayInRange, date)) {
        return lastDayInRange.getHours() === 0;
      }

      return true;
    });
  }

  public apply(): void {
    const startDate = this.$selectedStartDate();
    const endDate = this.$selectedEndDate();
    if (startDate && endDate) {
      this.dialogRef.close([startDate, endDate]);
    }
  }

  private findFirstDateOfRange(targetDate: Date, dateRange: Date[]): Date {
    let targetDateIndex = dateRange.findIndex((date: Date) => this.isDateEqual(targetDate, date));

    let firstDateOfRange = targetDate;
    let previousDate = dateRange[targetDateIndex - 1];

    while (previousDate && previousDate.getDate() === firstDateOfRange.getDate() - 1) {
      firstDateOfRange = previousDate;
      targetDateIndex = targetDateIndex - 1;
      previousDate = dateRange[targetDateIndex - 1];
    }

    return firstDateOfRange;
  }

  private findLastDateOfRange(targetDate: Date, dateRange: Date[]): Date {
    let targetDateIndex = dateRange.findIndex((date: Date) => this.isDateEqual(targetDate, date));

    let firstDateOfRange = targetDate;
    let previousDate = dateRange[targetDateIndex + 1];

    while (previousDate && previousDate.getDate() === firstDateOfRange.getDate() + 1) {
      firstDateOfRange = previousDate;
      targetDateIndex = targetDateIndex + 1;
      previousDate = dateRange[targetDateIndex + 1];
    }

    return firstDateOfRange;
  }

  private getMonthYearString(date: Date): string {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  private generateCalendarDates(date: Date): void {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), firstDayOfMonth.getDate());
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDayOfMonth.getDate());
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    this.calendarDates = [];
    let currentDate = new Date(startDate);
    while (currentDate.getTime() <= endDate.getTime()) {
      this.calendarDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  private isDateBefore(date1: Date, date2: Date): boolean {
    return date1.getTime() < date2.getTime();
  }

  private isDateAfter(date1: Date, date2: Date): boolean {
    return date1.getTime() > date2.getTime();
  }
}
