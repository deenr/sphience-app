import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressStep } from './progress-step.interface';

@Component({
  standalone: true,
  selector: 'app-progress-steps',
  templateUrl: './progress-steps.component.html',
  styleUrls: ['./progress-steps.component.scss'],
  imports: [MatIconModule, TranslateModule]
})
export class ProgressStepsComponent {
  @Input() public steps: ProgressStep[] = [];
  @Input() public currentStep: ProgressStep | null = null;

  public isStepComplete(step: ProgressStep): boolean {
    let stepIndex = -1;
    let currentStepIndex = -1;

    for (let i = 0; i < this.steps.length; i++) {
      if (this.steps[i].stepName === step.stepName) {
        stepIndex = i;
      }
      if (this.steps[i].stepName === this.currentStep?.stepName) {
        currentStepIndex = i;
      }
      if (stepIndex !== -1 && currentStepIndex !== -1) {
        break;
      }
    }

    return stepIndex < currentStepIndex;
  }
}
