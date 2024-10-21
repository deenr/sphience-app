import { DatePipe } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

@Component({
  standalone: true,
  selector: 'app-datepicker-menu',
  templateUrl: 'datepicker-menu.component.html',
  styleUrls: ['datepicker-menu.component.scss'],
  imports: [MatIconModule, MatFormFieldModule, DatePipe, MatInputModule]
})
export class DatepickerMenuComponent {
  public date = input.required<Date | DateRange>();
  @Input() public actions = false;
  @Input() public unavailableDates: Date[] = [];
  @Output() public dateChange = new EventEmitter<Date | DateRange>();

  public currentDateInView: Date;

  public selectedSingleDate: Date | null = null;
  public selectedStartDate: Date | null = null;
  public selectedEndDate: Date | null = null;

  public calendarDates: Date[] = [];
  public currentMonth: string;
  public weekdays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  public constructor() {
    const today = new Date();
    this.currentDateInView = today;
    this.currentMonth = this.getMonthYearString(this.currentDateInView);
    this.generateCalendarDates(this.currentDateInView);
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

    if (this.date instanceof Date) {
      this.selectedSingleDate = date;
      this.dateChange.emit(this.selectedSingleDate);
    } else {
      if (!this.selectedStartDate) {
        this.selectedStartDate = date;
      } else if (!this.selectedEndDate) {
        if (this.isDateBefore(date, this.selectedStartDate)) {
          this.selectedEndDate = this.selectedStartDate;
          this.selectedStartDate = date;
        } else {
          this.selectedEndDate = date;
        }
      } else if (this.selectedStartDate && this.selectedEndDate) {
        this.selectedStartDate = date;
        this.selectedEndDate = null;
      }

      if (this.selectedStartDate && this.selectedEndDate) {
        this.dateChange.emit({ startDate: this.selectedStartDate, endDate: this.selectedEndDate });
      }
    }
  }

  public isDateToday(date: Date): boolean {
    const today = new Date();

    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear() && date.getDate() === today.getDate();
  }

  public isDateInRange(date: Date): boolean {
    if (this.selectedStartDate && this.selectedEndDate) {
      return date.getTime() > this.selectedStartDate?.getTime() && date.getTime() <= this.selectedEndDate?.getTime();
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
    return this.unavailableDates?.some((unavailableDate: Date) => this.isDateEqual(unavailableDate, date));
  }

  public isDateRangeUnavailable(date: Date): boolean {
    return this.unavailableDates.some((unavailableDate: Date, index: number) => {
      const dayBefore = this.unavailableDates[index - 1];
      const dayAfter = this.unavailableDates[index + 1];

      const hasRange = (dayBefore && dayBefore.getDate() === unavailableDate.getDate() - 1) || (dayAfter && dayAfter.getDate() === unavailableDate.getDate() + 1);

      if (!hasRange || !this.isDateEqual(unavailableDate, date)) {
        return false;
      }

      const firstDayInRange = this.findFirstDateOfRange(date, this.unavailableDates);
      const lastDayInRange = this.findLastDateOfRange(date, this.unavailableDates);

      if (firstDayInRange && this.isDateEqual(firstDayInRange, date)) {
        return firstDayInRange.getHours() > 0;
      } else if (lastDayInRange && this.isDateEqual(lastDayInRange, date)) {
        return lastDayInRange.getHours() === 0;
      }

      return true;
    });
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
