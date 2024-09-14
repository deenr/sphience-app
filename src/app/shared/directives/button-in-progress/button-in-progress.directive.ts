import { AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
  standalone: true,
  selector: 'button[inProgress]'
})
export class ButtonInProgressDirective implements OnInit, AfterViewInit {
  private buttonElement: HTMLElement | null = null;
  private buttonWidth: string | null = null;
  private textColor: string | null = null;

  private isComponentInitialized = false;
  private _inProgress: boolean = false;

  @Input() public set inProgress(value: boolean) {
    this._inProgress = value;

    if (this.isComponentInitialized) {
      this.toggleSpinner(value);
    }
  }

  public get inProgress(): boolean {
    return this._inProgress;
  }

  public constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef
  ) {}

  public ngOnInit(): void {
    this.createSpinner();
  }

  public ngAfterViewInit(): void {
    this.viewContainerRef.clear();

    this.setElementProperties();

    this.isComponentInitialized = true;
    this.toggleSpinner(this.inProgress);
  }

  private createSpinner(): HTMLElement {
    const matSpinner = this.viewContainerRef.createComponent(MatProgressSpinner);
    matSpinner.instance.diameter = 20;
    matSpinner.instance.mode = 'indeterminate';
    const spinnerElement = matSpinner.injector.get(MatProgressSpinner)._elementRef.nativeElement;
    (spinnerElement.getElementsByClassName('mdc-circular-progress__circle-clipper')[0] as HTMLElement).style.width = '100%';
    if (this.textColor) {
      (spinnerElement.getElementsByClassName('mdc-circular-progress__circle-clipper')[0] as HTMLElement).style.stroke = this.textColor;
    }

    return spinnerElement;
  }

  private setElementProperties(): void {
    this.buttonElement = this.elementRef.nativeElement as HTMLElement;
    if (this.buttonElement.style.width) {
      this.buttonWidth = `${this.buttonElement.offsetWidth}px`;
      this.buttonElement.style.setProperty('min-width', this.buttonWidth, 'important');
    }

    const buttonLabelElement = this.buttonElement.getElementsByClassName('mdc-button__label')[0] as HTMLSpanElement;
    const computedStyle = window.getComputedStyle(buttonLabelElement);
    this.textColor = computedStyle.color;
  }

  private toggleSpinner(show: boolean): void {
    show ? this.show() : this.hide();
  }

  private show(): void {
    const buttonLabelElement = this.buttonElement?.getElementsByClassName('mdc-button__label')[0] as HTMLSpanElement;

    this.buttonElement?.style.setProperty('pointer-events', 'none');
    buttonLabelElement.style.setProperty('display', 'none');
    Array.from(this.buttonElement?.getElementsByClassName('mat-icon') as HTMLCollectionOf<HTMLElement>).forEach((matIcon: HTMLElement) => {
      matIcon.style.display = 'none';
    });

    this.renderer.insertBefore(this.elementRef.nativeElement, this.createSpinner(), this.buttonElement?.children[0]);
  }

  private hide(): void {
    const buttonLabelElement = this.buttonElement?.getElementsByClassName('mdc-button__label')[0] as HTMLSpanElement;

    this.buttonElement?.style.setProperty('pointer-events', 'unset');
    Array.from(this.buttonElement?.getElementsByClassName('mat-icon') as HTMLCollectionOf<HTMLElement>).forEach((matIcon: HTMLElement) => {
      matIcon.style.display = 'inline-flex';
    });
    buttonLabelElement.style.setProperty('display', 'inline-flex');

    this.renderer.removeChild(this.elementRef.nativeElement, this.createSpinner());
  }
}
