import { CommonModule } from '@angular/common';
import { Component, computed, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { UserRole } from '@core/models';
import { TranslateModule } from '@ngx-translate/core';
import { DividerWithTextComponent } from '@shared/components/divider-with-text/divider-with-text.component';
import { ProgressStep } from '@shared/components/progress-steps/progress-step.interface';
import { ProgressStepsComponent } from '@shared/components/progress-steps/progress-steps.component';
import { ButtonInProgressDirective } from '@shared/directives/button-in-progress/button-in-progress.directive';
import { HasErrorDirective } from '@shared/directives/has-error/has-error.directive';
import { PasswordMatchValidator } from '@shared/validators/password-match.validator';
import { ToastrService } from 'ngx-toastr';
import { finalize, take } from 'rxjs';
import { RegistrationStep } from './registration-step.enum';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    MatIconModule,
    DividerWithTextComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ProgressStepsComponent,
    HasErrorDirective,
    MatButtonModule,
    TranslateModule,
    MatSelectModule,
    ButtonInProgressDirective,
    RouterModule,
    CommonModule
  ]
})
export class RegisterComponent {
  public RegistrationStep = RegistrationStep;

  private readonly headerTranslationKeys: Record<RegistrationStep, { title: string; description: string }> = {
    [RegistrationStep.EMAIL]: {
      title: 'REGISTER.CREATE_ACCOUNT.TITLE',
      description: 'REGISTER.CREATE_ACCOUNT.DESCRIPTION'
    },
    [RegistrationStep.PASSWORD]: {
      title: 'REGISTER.CHOOSE_PASSWORD.TITLE',
      description: 'REGISTER.CHOOSE_PASSWORD.DESCRIPTION'
    },
    [RegistrationStep.DETAILS]: {
      title: 'REGISTER.ENTER_DETAILS.TITLE',
      description: 'REGISTER.ENTER_DETAILS.DESCRIPTION'
    }
  };

  public $loadingRegistration: WritableSignal<boolean> = signal(false);

  private $currentStepIndex: WritableSignal<number> = signal(0);
  public $currentStep = computed(() => this.steps[this.$currentStepIndex()]);

  public $title = computed(() => this.headerTranslationKeys[this.$currentStep().stepName as RegistrationStep].title);
  public $description = computed(() => this.headerTranslationKeys[this.$currentStep().stepName as RegistrationStep].description);

  public emailFormControl: FormControl<string | null> = this.formBuilder.control<string | null>(null, [Validators.required, Validators.email]);

  public passwordForm: FormGroup<{
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
  }> = this.formBuilder.group({
    password: this.formBuilder.control<string | null>(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: this.formBuilder.control<string | null>(null, Validators.required)
  });

  public detailsForm: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    role: FormControl<UserRole | null>;
  }> = this.formBuilder.group({
    firstName: this.formBuilder.control<string | null>(null, Validators.required),
    lastName: this.formBuilder.control<string | null>(null, Validators.required),
    role: this.formBuilder.control<UserRole | null>(null, Validators.required)
  });

  public roles = Object.keys(UserRole);

  private readonly _steps = [
    {
      stepName: RegistrationStep.EMAIL,
      svgIcon: 'user',
      title: 'REGISTER.CREATE_ACCOUNT.PROGRESS_TITLE',
      description: 'REGISTER.CREATE_ACCOUNT.PROGRESS_DESCRIPTION'
    },
    {
      stepName: RegistrationStep.PASSWORD,
      svgIcon: 'lock',
      title: 'REGISTER.CHOOSE_PASSWORD.TITLE',
      description: 'REGISTER.CHOOSE_PASSWORD.PROGRESS_DESCRIPTION'
    },
    {
      stepName: RegistrationStep.DETAILS,
      svgIcon: 'file',
      title: 'REGISTER.ENTER_DETAILS.PROGRESS_TITLE',
      description: 'REGISTER.ENTER_DETAILS.PROGRESS_DESCRIPTION'
    }
  ] as ProgressStep[];

  public get steps(): ProgressStep[] {
    return this._steps;
  }

  public constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {
    const { password, confirmPassword } = this.passwordForm.controls;

    password.valueChanges.pipe(takeUntilDestroyed()).subscribe((passwordText: string | null) => {
      confirmPassword.setValidators(passwordText && passwordText.length >= 8 ? [(Validators.required, PasswordMatchValidator.createValidator(password))] : Validators.required);

      confirmPassword.updateValueAndValidity({ emitEvent: false });
    });
  }

  public back(): void {
    this.$currentStepIndex.set(this.$currentStepIndex() - 1);
  }

  public goToPassword(): void {
    this.validateFormAndProceed(this.emailFormControl, () => this.incrementStep());
  }

  public goToDetails(): void {
    this.validateFormAndProceed(this.passwordForm, () => this.incrementStep());
  }

  public signUp(): void {
    this.validateFormAndProceed(this.detailsForm, () => {
      if (this.emailFormControl.valid && this.passwordForm.valid && this.detailsForm.valid) {
        this.processSignUp();
      }
    });
  }

  private incrementStep(): void {
    this.$currentStepIndex.set(this.$currentStepIndex() + 1);
  }

  private validateFormAndProceed(form: AbstractControl | FormGroup, nextStep: () => void): void {
    if (form instanceof FormGroup) {
      form.markAllAsTouched();
    } else {
      form.markAsTouched();
    }

    if (form.valid) {
      nextStep();
    }
  }

  private processSignUp(): void {
    const email = this.emailFormControl.value;
    const { password } = this.passwordForm.value;
    const { firstName, lastName, role } = this.detailsForm.value;

    if (email && password && firstName && lastName && role) {
      this.$loadingRegistration.set(true);

      this.authService
        .register(email, password, firstName, lastName, role)
        .pipe(
          take(1),
          finalize(() => {
            this.$loadingRegistration.set(false);
          })
        )
        .subscribe({
          next: () => {
            this.toastService.success('Your profile was successfully created', 'Succesfully created profile');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/']);
            });
          },
          error: () => {
            this.toastService.error('Please try creating your profile one more time', 'Unable to create profile');
            this.$currentStepIndex.set(0);
            this.$loadingRegistration.set(false);

            this.emailFormControl.reset();
            this.passwordForm.reset();
            this.detailsForm.reset();
          }
        });
    }
  }
}
