import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, signal, ViewChild, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  standalone: true,
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule]
})
export class FilterComponent implements AfterViewInit {
  @ViewChild('filterContainer') filterContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('mainFilter') mainFilterRef!: ElementRef<HTMLDivElement>;
  @ViewChild('otherFilters') otherFiltersRef!: ElementRef<HTMLDivElement>;

  public $showOtherFiltersInline: WritableSignal<boolean> = signal(true);
  private mainFilterWidth = Infinity;
  private otherFiltersWidth = Infinity;

  private readonly CONTAINER_GAP_IN_PX = 16;

  public ngAfterViewInit(): void {
    setTimeout(() => this.checkAvailableSpace());
  }

  @HostListener('window:resize')
  public onResize() {
    this.checkAvailableSpace();
  }

  private checkAvailableSpace() {
    const containerWidth = this.filterContainer.nativeElement.getBoundingClientRect().width;
    const mainFilterWidth = this.mainFilterRef.nativeElement.getBoundingClientRect().width;

    const otherFiltersWidth = this.otherFiltersRef ? this.otherFiltersRef.nativeElement.getBoundingClientRect().width : this.otherFiltersWidth;
    if (otherFiltersWidth < this.otherFiltersWidth) this.otherFiltersWidth = otherFiltersWidth;

    if (this.otherFiltersRef) {
      this.mainFilterWidth = mainFilterWidth;
    }

    this.$showOtherFiltersInline.set(containerWidth >= this.mainFilterWidth + this.CONTAINER_GAP_IN_PX + otherFiltersWidth);
  }
}
