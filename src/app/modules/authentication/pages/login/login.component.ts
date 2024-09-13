import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProgressStepsComponent } from '@shared/components/progress-steps/progress-steps.component';
import { MatInputModule } from '@angular/material/input';
import { ButtonInProgressDirective } from '@shared/directives/button-in-progress/button-in-progress.directive';
import { HasErrorDirective } from '@shared/directives/has-error/has-error.directive';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatCheckboxModule, ProgressStepsComponent, MatInputModule, ButtonInProgressDirective, HasErrorDirective]
})
export class LoginComponent {}
