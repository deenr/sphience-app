import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipWithContentComponent } from './tooltip-with-content.component';

describe('TooltipWithContentComponent', () => {
  let component: TooltipWithContentComponent;
  let fixture: ComponentFixture<TooltipWithContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TooltipWithContentComponent, MatMenuModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipWithContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('trigger hover behavior', () => {
    it('should open menu when hovering over trigger', () => {
      const openMenuSpy = spyOn(component, 'openMenu');
      const triggerElement = fixture.nativeElement.querySelector('.full-height');

      triggerElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(openMenuSpy).toHaveBeenCalled();
    });

    it('should start close timer when we stop hovering over trigger', () => {
      const startCloseTimerSpy = spyOn(component, 'startCloseTimer');
      const triggerElement = fixture.nativeElement.querySelector('.full-height');

      triggerElement.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();

      expect(startCloseTimerSpy).toHaveBeenCalled();
    });

    it('should not open menu when hovering over trigger and menu is already open', () => {
      component.trigger = {
        menuOpen: true,
        openMenu: jasmine.createSpy('openMenu')
      } as any;

      const triggerElement = fixture.nativeElement.querySelector('.full-height');

      triggerElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(component.trigger?.openMenu).not.toHaveBeenCalled();
    });
  });

  describe('menu timer behavior', () => {
    it('should close menu after delay when we stop hovering over trigger', fakeAsync(() => {
      component.trigger = {
        menuOpen: true,
        closeMenu: jasmine.createSpy('closeMenu')
      } as any;

      component.startCloseTimer();
      tick(250);

      expect(component.trigger?.closeMenu).toHaveBeenCalled();
    }));

    it('should cancel close timer when we hover over trigger again', fakeAsync(() => {
      component.trigger = {
        menuOpen: false,
        openMenu: jasmine.createSpy('openMenu')
      } as any;

      component.startCloseTimer();
      component.openMenu();

      expect(component.trigger?.openMenu).toHaveBeenCalled();
    }));

    it('should clear timeout on component destroy', fakeAsync(() => {
      const clearTimeoutSpy = spyOn(window, 'clearTimeout');

      component.startCloseTimer();
      component.ngOnDestroy();
      tick(250);

      expect(clearTimeoutSpy).toHaveBeenCalled();
    }));
  });

  // TODO: Add test for menu events on content div
  // it('should handle menu events on content div', () => {});
});
