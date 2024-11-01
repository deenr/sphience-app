import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HasErrorDirective } from './has-error.directive';

@Component({
  standalone: true,
  imports: [MatFormFieldModule, HasErrorDirective, ReactiveFormsModule, MatInputModule],
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HasErrorTestComponent, BrowserAnimationsModule]
    }).compileComponents();
  });

  it('should show error template when form control has error', async () => {
    const fixture = TestBed.createComponent(HasErrorTestComponent);

    fixture.debugElement.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.nativeElement.querySelector('mat-error');
    expect(errorElement?.textContent).toBe('Required');
  });

  it('should show error template when form control is touched and invalid', async () => {
    const fixture = TestBed.createComponent(HasErrorTestComponent);
    const component = fixture.componentInstance;

    component.formGroup.get('control')?.markAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.nativeElement.querySelector('mat-error');
    expect(errorElement?.textContent).toBe('Required');
  });

  it('should not show error template when form control is untouched', async () => {
    const fixture = TestBed.createComponent(HasErrorTestComponent);
    fixture.detectChanges();

    const errorElement = fixture.debugElement.nativeElement.querySelector('mat-error');
    expect(errorElement).toBeNull();
  });

  it('should not show error template when form control is disabled', async () => {
    const fixture = TestBed.createComponent(HasErrorTestComponent);
    const component = fixture.componentInstance;

    component.formGroup.get('control')?.disable();
    component.formGroup.get('control')?.markAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.nativeElement.querySelector('mat-error');
    expect(errorElement).toBeNull();
  });
});
