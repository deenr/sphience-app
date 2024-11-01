import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonInProgressDirective } from './button-in-progress.directive';

@Component({
  standalone: true,
  imports: [ButtonInProgressDirective, MatButtonModule],
  template: `<button mat-flat-button [inProgress]="$inProgress()" (click)="toggleSpinner()">Submit</button>`
})
class ButtonInProgressTestComponent {
  public $inProgress = signal(false);

  public toggleSpinner(): void {
    this.$inProgress.update((value) => !value);
  }
}

describe('ButtonInProgressDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonInProgressTestComponent, BrowserAnimationsModule]
    }).compileComponents();
  });

  it('should toggle spinner if button is clicked', async () => {
    const fixture = TestBed.createComponent(ButtonInProgressTestComponent);
    const button = fixture.debugElement.nativeElement.querySelector('button');

    const getSpinner = () => fixture.debugElement.nativeElement.getElementsByTagName('mat-progress-spinner');

    expect(getSpinner().length).toBe(0);

    button.click();
    fixture.detectChanges();

    expect(getSpinner().length).toBe(1);

    button.click();
    fixture.detectChanges();

    expect(getSpinner().length).toBe(0);
  });
});
