import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HasErrorDirective } from './has-error.directive';
import { fireEvent, render, screen } from '@testing-library/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  template: `
    <mat-form-field [formGroup]="formGroup">
      <input matInput type="text" placeholder="Test control" formControlName="control" />
      <mat-error *hasError="'control'; code: 'required'">Required</mat-error>
    </mat-form-field>
    <button (click)="onSubmit()">Submit</button>
  `
})
class HasErrorTestComponent {
  public formGroup = new FormGroup({
    control: new FormControl(null, [Validators.required])
  });

  public onSubmit(): void {
    this.formGroup.markAllAsTouched();
  }
}

describe('HasErrorDirective', () => {
  it('should show error template when form control has error', async () => {
    await render(HasErrorTestComponent, {
      imports: [MatFormFieldModule, ReactiveFormsModule, HasErrorDirective, MatInputModule],
      declarations: [HasErrorTestComponent]
    });

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
