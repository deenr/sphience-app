import { Component, Input } from '@angular/core';
import { ProgressStep } from './progress-step.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-progress-steps',
  templateUrl: './progress-steps.component.html',
  styleUrls: ['./progress-steps.component.scss'],
  imports: [MatIconModule]
})
export class ProgressStepsComponent {
  @Input() public steps: ProgressStep[] = [];
}
