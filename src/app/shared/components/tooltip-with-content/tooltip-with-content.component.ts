import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

@Component({
  standalone: true,
  selector: 'app-tooltip-with-content',
  templateUrl: './tooltip-with-content.component.html',
  styleUrls: ['./tooltip-with-content.component.scss'],
  imports: [MatMenuModule]
})
export class TooltipWithContentComponent implements OnDestroy {
  @ViewChild(MatMenuTrigger) public trigger: MatMenuTrigger | undefined;

  private closeMenuTimer: any | null = null;

  public ngOnDestroy() {
    if (this.closeMenuTimer) {
      clearTimeout(this.closeMenuTimer);
    }
  }

  public openMenu() {
    if (!this.trigger?.menuOpen) {
      this.trigger!.openMenu();
    }
    this.cancelCloseTimer();
  }

  public startCloseTimer() {
    this.closeMenuTimer = setTimeout(() => {
      if (this.trigger?.menuOpen) {
        this.trigger.closeMenu();
      }
    }, 250);
  }

  private cancelCloseTimer() {
    if (this.closeMenuTimer) {
      clearTimeout(this.closeMenuTimer);
      this.closeMenuTimer = null;
    }
  }
}
