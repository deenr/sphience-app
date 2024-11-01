import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressStep, ProgressStepsComponent } from './progress-steps.component';

describe('ProgressStepsComponent', () => {
  let fixture: ComponentFixture<ProgressStepsComponent>;
  const mockSteps: ProgressStep[] = [
    { stepName: 'step1', title: 'Step 1', description: 'First step', svgIcon: 'step1' },
    { stepName: 'step2', title: 'Step 2', description: 'Second step', svgIcon: 'step2' },
    { stepName: 'step3', title: 'Step 3', description: 'Third step', svgIcon: 'step3' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProgressStepsComponent, MatIconTestingModule, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressStepsComponent);
  });

  describe('steps rendering', () => {
    it('should render all provided steps', () => {
      fixture.componentRef.setInput('steps', mockSteps);
      fixture.detectChanges();

      const stepElements = fixture.nativeElement.querySelectorAll('.step__base');
      expect(stepElements.length).toBe(3);

      const stepContents = fixture.nativeElement.querySelectorAll('.base__content');
      mockSteps.forEach((step, index) => {
        const stepTexts = stepContents[index].querySelectorAll('p');
        expect(stepTexts[0].textContent).toContain(step.title);
        expect(stepTexts[1].textContent).toContain(step.description);
      });
    });
  });

  describe('current step handling', () => {
    it('should highlight current step with correct opacity', () => {
      fixture.componentRef.setInput('steps', mockSteps);
      fixture.componentRef.setInput('currentStep', mockSteps[1]);
      fixture.detectChanges();

      const stepContents = fixture.nativeElement.querySelectorAll('.base__content');
      expect(stepContents[1].classList).toContain('current');
      expect(stepContents[0].classList).not.toContain('current');
      expect(stepContents[2].classList).not.toContain('current');
    });

    it('should mark previous steps as complete and show correct opacity', () => {
      fixture.componentRef.setInput('steps', mockSteps);
      fixture.componentRef.setInput('currentStep', mockSteps[2]);
      fixture.detectChanges();

      const lines = fixture.nativeElement.querySelectorAll('.line');
      expect(lines[0].classList).toContain('complete');
      expect(lines[1].classList).toContain('complete');

      const stepContents = fixture.nativeElement.querySelectorAll('.base__content');
      expect(stepContents[0].classList).not.toContain('current');
      expect(stepContents[1].classList).not.toContain('current');
      expect(stepContents[2].classList).toContain('current');
    });

    it('should not mark future steps as complete and show correct opacity', () => {
      fixture.componentRef.setInput('steps', mockSteps);
      fixture.componentRef.setInput('currentStep', mockSteps[0]);
      fixture.detectChanges();

      const lines = fixture.nativeElement.querySelectorAll('.line');
      expect(lines[0].classList).not.toContain('complete');
      expect(lines[1].classList).not.toContain('complete');

      const stepContents = fixture.nativeElement.querySelectorAll('.base__content');
      expect(stepContents[0].classList).toContain('current');
      expect(stepContents[1].classList).not.toContain('current');
      expect(stepContents[2].classList).not.toContain('current');
    });
  });

  describe('empty states', () => {
    it('should handle empty steps array', () => {
      fixture.componentRef.setInput('steps', []);
      fixture.detectChanges();

      const stepElements = fixture.nativeElement.querySelectorAll('.step__base');
      expect(stepElements.length).toBe(0);
    });
  });
});
