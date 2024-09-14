import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { render, screen } from '@testing-library/angular';
import { ButtonInProgressDirective } from './button-in-progress.directive';

@Component({
  template: '<button mat-flat-button [inProgress]="inProgress">Button</button>'
})
class ButtonTestComponent {
  @Input() public inProgress = false;
}

describe('ButtonInProgressDirective', () => {
  it('should show the spinner when inProgress is set to true', async () => {
    await render(ButtonTestComponent, {
      imports: [MatProgressSpinnerModule, MatButtonModule, ButtonInProgressDirective],
      declarations: [ButtonTestComponent],
      componentProperties: { inProgress: true }
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should not show the spinner when inProgress is set to false', async () => {
    await render(ButtonTestComponent, {
      imports: [MatProgressSpinnerModule, MatButtonModule, ButtonInProgressDirective],
      declarations: [ButtonTestComponent],
      componentProperties: { inProgress: false }
    });

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('should be able to toggle the spinner on run time', async () => {
    const { fixture } = await render(ButtonTestComponent, {
      imports: [MatProgressSpinnerModule, MatButtonModule, ButtonInProgressDirective],
      declarations: [ButtonTestComponent],
      componentProperties: { inProgress: false }
    });

    const component = fixture.componentInstance;

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();

    component.inProgress = !component.inProgress;
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    component.inProgress = !component.inProgress;
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
