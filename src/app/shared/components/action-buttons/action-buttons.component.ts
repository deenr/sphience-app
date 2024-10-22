import { AfterViewInit, Component, computed, HostListener, input, signal, ViewChild, WritableSignal } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

interface ActionButton {
  text: string;
  icon?: string;
  action?: () => void;
}

@Component({
  standalone: true,
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
  imports: [MatButtonModule, MatMenuModule, MatIconModule]
})
export class ActionButtonsComponent implements AfterViewInit {
  @ViewChild('primaryBtn') primaryBtnRef!: MatButton;
  @ViewChild('secondaryBtn') secondaryBtnRef!: MatButton;

  private readonly CONTAINER_GAP_IN_PX = 12;
  private readonly MENU_BUTTON_WIDTH_IN_PX = 40;

  public primaryButton = input.required<ActionButton>();
  public secondaryButton = input<ActionButton>();
  public extraButtons = input<ActionButton[]>();

  public showPrimaryInline: WritableSignal<boolean> = signal(true);
  public showSecondaryInline: WritableSignal<boolean> = signal(true);

  public menuButtons = computed(() => {
    const buttons: ActionButton[] = [];

    if (!this.showPrimaryInline()) {
      const primary = this.primaryButton();
      if (primary) {
        buttons.push(primary);
      }
    }

    if (!this.showSecondaryInline()) {
      const secondary = this.secondaryButton();
      if (secondary) {
        buttons.push(secondary);
      }
    }
    const extraButtons = this.extraButtons();
    if (extraButtons) {
      buttons.push(...extraButtons);
    }

    return buttons;
  });

  private primaryButtonWidth: number = 0;
  private secondaryButtonWidth: number = 0;

  public constructor() {}

  public ngAfterViewInit(): void {
    const primaryWidth = (this.primaryBtnRef._elementRef.nativeElement as HTMLButtonElement)?.offsetWidth;
    if (primaryWidth) {
      this.primaryButtonWidth = primaryWidth;
    }

    const secondaryWidth = (this.secondaryBtnRef._elementRef.nativeElement as HTMLButtonElement)?.offsetWidth;
    if (secondaryWidth) {
      this.secondaryButtonWidth = secondaryWidth;
    }

    this.checkAvailableSpace();
  }

  @HostListener('window:resize')
  public onResize() {
    this.checkAvailableSpace();
  }

  private checkAvailableSpace() {
    setTimeout(() => {
      const containerElement = document.getElementsByTagName('app-action-buttons')[0].parentElement as HTMLDivElement;
      if (!containerElement) return;
      const containerWidth = containerElement.offsetWidth;

      const requiredWidthForSecondary = this.primaryButtonWidth + this.CONTAINER_GAP_IN_PX + this.secondaryButtonWidth + this.CONTAINER_GAP_IN_PX + this.MENU_BUTTON_WIDTH_IN_PX;
      this.showSecondaryInline.set(containerWidth >= requiredWidthForSecondary);

      const requiredWidthForPrimary = this.primaryButtonWidth + this.CONTAINER_GAP_IN_PX + this.MENU_BUTTON_WIDTH_IN_PX;
      this.showPrimaryInline.set(containerWidth >= requiredWidthForPrimary);
    });
  }
}
