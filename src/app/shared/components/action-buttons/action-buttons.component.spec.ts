import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActionButtonsComponent } from './action-buttons.component';

describe('ActionButtonsComponent', () => {
  let fixture: ComponentFixture<ActionButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ActionButtonsComponent, MatButtonModule, MatIconTestingModule, MatMenuModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionButtonsComponent);
  });

  it('should show primary button by default', () => {
    fixture.componentRef.setInput('primaryButton', { text: 'Primary' });
    fixture.detectChanges();

    const primaryButton = fixture.nativeElement.querySelector('button[color="primary"]');
    expect(primaryButton.textContent.trim()).toBe('Primary');
  });

  it('should show secondary button when provided', () => {
    fixture.componentRef.setInput('primaryButton', { text: 'Primary' });
    fixture.componentRef.setInput('secondaryButton', { text: 'Secondary' });
    fixture.detectChanges();

    const secondaryButton = fixture.nativeElement.querySelector('button[mat-stroked-button]:not(.icon-only)');
    expect(secondaryButton.textContent.trim()).toBe('Secondary');
  });

  it('should show icons when provided', () => {
    fixture.componentRef.setInput('primaryButton', { text: 'Primary', icon: 'test-icon' });
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('button[color="primary"]').querySelector('mat-icon');
    expect(icon).toBeDefined();
  });

  it('should execute action when button is clicked', () => {
    const mockAction = jasmine.createSpy('mockAction');
    fixture.componentRef.setInput('primaryButton', { text: 'Primary', action: mockAction });
    fixture.detectChanges();

    const primaryButton = fixture.nativeElement.querySelector('button[color="primary"]');
    primaryButton.click();

    expect(mockAction).toHaveBeenCalled();
  });

  it('should show extra buttons in menu when provided', async () => {
    const extraButtons = [{ text: 'Extra 1' }, { text: 'Extra 2' }];

    fixture.componentRef.setInput('primaryButton', { text: 'Primary' });
    fixture.componentRef.setInput('extraButtons', extraButtons);
    fixture.detectChanges();

    const menuButton = fixture.nativeElement.querySelector('button[mat-stroked-button].icon-only');
    menuButton.click();

    await fixture.whenStable();

    const menuItems = document.querySelectorAll('button[mat-menu-item]');
    expect(menuItems.length).toBe(extraButtons.length);
    extraButtons.forEach((button, index) => {
      expect(menuItems[index].textContent?.trim()).toBe(button.text);
    });
  });

  describe('responsive behavior', () => {
    let containerElement: HTMLDivElement;
    let originalParentElement: HTMLElement;
    let originalAppElement: HTMLElement;

    beforeEach(() => {
      originalParentElement = fixture.nativeElement.parentElement;
      originalAppElement = fixture.nativeElement;

      setContainerWidth('999999px');
    });

    afterEach(() => {
      if (originalParentElement && originalAppElement) {
        originalParentElement.appendChild(originalAppElement);
      }
    });

    function setContainerWidth(width: string) {
      if (containerElement?.children?.length > 0) {
        document.body.removeChild(containerElement);
      }
      containerElement = document.createElement('div');
      containerElement.style.width = width;
      const appElement = document.createElement('app-action-buttons');
      containerElement.appendChild(appElement);
      document.body.appendChild(containerElement);
    }

    it('should move secondary button to menu when space is limited', async () => {
      fixture.componentRef.setInput('primaryButton', { text: 'Primary' });
      fixture.componentRef.setInput('secondaryButton', { text: 'Secondary' });
      fixture.detectChanges();

      const initialSecondaryButton = fixture.nativeElement.querySelector('button[mat-stroked-button]:not(.icon-only)');
      expect(initialSecondaryButton).toBeDefined();

      setContainerWidth('200px');
      await fixture.whenStable();
      fixture.detectChanges();

      const secondaryButton = fixture.nativeElement.querySelector('button[mat-stroked-button]:not(.icon-only)');
      expect(secondaryButton).toBeNull();

      const menuButton = fixture.nativeElement.querySelector('button[mat-stroked-button].icon-only');
      menuButton.click();
      await fixture.whenStable();
      fixture.detectChanges();

      const menuItems = document.querySelectorAll('button[mat-menu-item]');
      expect(menuItems.length).toBe(1);
      expect(menuItems[0].textContent?.trim()).toBe('Secondary');
    });

    it('should move primary button to menu when space is very limited', async () => {
      fixture.componentRef.setInput('primaryButton', { text: 'Primary' });
      fixture.detectChanges();

      const initialPrimaryButton = fixture.nativeElement.querySelector('button[color="primary"]');
      expect(initialPrimaryButton).toBeDefined();

      setContainerWidth('100px');
      await fixture.whenStable();
      fixture.detectChanges();

      const primaryButton = fixture.nativeElement.querySelector('button[color="primary"]');
      expect(primaryButton).toBeNull();

      const menuButton = fixture.nativeElement.querySelector('button[mat-stroked-button].icon-only');
      menuButton.click();
      await fixture.whenStable();
      fixture.detectChanges();

      const menuItems = document.querySelectorAll('button[mat-menu-item]');
      expect(menuItems.length).toBe(1);
      expect(menuItems[0].textContent?.trim()).toBe('Primary');
    });
  });
});
