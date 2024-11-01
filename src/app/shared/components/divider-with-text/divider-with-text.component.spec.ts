import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DividerWithTextComponent } from './divider-with-text.component';

describe('DividerWithTextComponent', () => {
  let fixture: ComponentFixture<DividerWithTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DividerWithTextComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DividerWithTextComponent);
    fixture.detectChanges();
  });

  describe('text handling', () => {
    it('should not display text element when text input is null', () => {
      fixture.componentRef.setInput('text', null);
      fixture.detectChanges();

      const textElement = fixture.nativeElement.querySelector('.divider__text');
      expect(textElement).toBeNull();
    });

    it('should display text element with correct content when text is provided', () => {
      const testText = 'Test Divider Text';
      fixture.componentRef.setInput('text', testText);
      fixture.detectChanges();

      const textElement = fixture.nativeElement.querySelector('.divider__text');
      expect(textElement).toBeDefined();
      expect(textElement.textContent.trim()).toBe(testText);
    });
  });
});
