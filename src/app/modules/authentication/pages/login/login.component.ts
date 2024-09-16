import { Component, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressStepsComponent } from '@shared/components/progress-steps/progress-steps.component';
import { ButtonInProgressDirective } from '@shared/directives/button-in-progress/button-in-progress.directive';
import { HasErrorDirective } from '@shared/directives/has-error/has-error.directive';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, finalize, take } from 'rxjs';

type LoginForm = FormGroup<{
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  remember: FormControl<boolean | null>;
}>;

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    ProgressStepsComponent,
    MatInputModule,
    ButtonInProgressDirective,
    HasErrorDirective,
    TranslateModule,
    RouterModule
  ],
  providers: [AuthService]
})
export class LoginComponent {
  public loginForm: LoginForm = this.formBuilder.group({
    email: this.formBuilder.control<string | null>(null, [Validators.required, Validators.email]),
    password: this.formBuilder.control<string | null>(null, Validators.required),
    remember: this.formBuilder.control<boolean | null>({ value: false, disabled: true })
  });
  public $loadingLogin: WritableSignal<boolean> = signal(false);

  public constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {
    combineLatest([this.loginForm.controls.email.valueChanges, this.loginForm.controls.password.valueChanges])
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        if (this.loginForm.controls.email.hasError('invalid')) {
          this.loginForm.controls.email.setErrors({ invalid: null });
          this.loginForm.controls.email.updateValueAndValidity();
        }
        if (this.loginForm.controls.password.hasError('invalid')) {
          this.loginForm.controls.password.setErrors({ invalid: null });
          this.loginForm.controls.password.updateValueAndValidity();
        }
      });
  }

  public login(form: LoginForm): void {
    form.markAllAsTouched();

    if (form.valid) {
      const { email, password } = form.value;
      if (!email || !password) {
        return;
      }

      this.$loadingLogin.set(true);

      this.authService
        .login(email, password)
        .pipe(
          take(1),
          finalize(() => {
            this.$loadingLogin.set(false);
          })
        )
        .subscribe({
          next: () => {
            this.toastService.success('Welcome back to Sphience.', 'Succesfully logged in');
            setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/']);
              });
            });
          },
          error: () => {
            this.$loadingLogin.set(false);
            this.loginForm.controls.email.setErrors({ invalid: true });
            this.loginForm.controls.password.setErrors({ invalid: true });
          }
        });
    }
  }
}
