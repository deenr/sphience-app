import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { BadgeComponent, BadgeSize, BadgeType, Color } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BadgeComponent, MatIconTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('initialization', () => {
    it('should render with default styles', () => {
      const badge = fixture.nativeElement.querySelector('.badge');

      expect(badge.classList).toContain('grey');
      expect(badge.classList).toContain('md');
    });
  });

  describe('size handling', () => {
    it('should apply correct size class when set to large', () => {
      fixture.componentRef.setInput('size', BadgeSize.LG);
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.badge');
      expect(badge.classList.contains('lg')).toBeTruthy();
    });
  });

  describe('color handling', () => {
    it('should apply correct color class', () => {
      fixture.componentRef.setInput('color', Color.BLUE_LIGHT);
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.badge');
      expect(badge.classList.contains('blue-light')).toBeTruthy();
    });
  });

  describe('badge types', () => {
    it('should render dot element when type is DOT', () => {
      fixture.componentRef.setInput('type', BadgeType.DOT);
      fixture.detectChanges();

      const dot = fixture.nativeElement.querySelector('.badge div');
      expect(dot).toBeDefined();
    });

    it('should render leading icon with correct attributes', () => {
      fixture.componentRef.setInput('type', BadgeType.LEADING_ICON);
      fixture.componentRef.setInput('icon', 'test-icon');
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.badge');
      expect(badge.classList).toContain('leading-icon');
    });

    it('should render trailing icon with correct attributes', () => {
      fixture.componentRef.setInput('type', BadgeType.TRAILING_ICON);
      fixture.componentRef.setInput('icon', 'test-icon');
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.badge');
      expect(badge.classList).toContain('trailing-icon');
    });

    it('should render close icon with correct attributes', () => {
      fixture.componentRef.setInput('type', BadgeType.CLOSE);
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.badge');
      const icon = badge.querySelector('.icon');
      expect(badge.classList).toContain('close');
      expect(icon.getAttribute('svgIcon')).toBe('close-badge');
    });
  });

  describe('content rendering', () => {
    it('should render content in paragraph element', () => {
      const textContent = 'Test Badge Content';

      @Component({
        template: `<app-badge>{{ text }}</app-badge>`,
        standalone: true,
        imports: [BadgeComponent]
      })
      class BadgeTestComponent {
        text = textContent;
      }

      const testFixture = TestBed.createComponent(BadgeTestComponent);
      testFixture.detectChanges();

      const content = testFixture.nativeElement.querySelector('.badge p');
      expect(content.textContent.trim()).toBe(textContent);
    });
  });

  describe('click events', () => {
    it('should emit leadingClick when leading icon is clicked', () => {
      const leadingClickSpy = spyOn(component.leadingClick, 'emit');
      fixture.componentRef.setInput('type', BadgeType.LEADING_ICON);
      fixture.componentRef.setInput('icon', 'test-icon');
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.badge .icon');
      icon.click();

      expect(leadingClickSpy).toHaveBeenCalled();
    });

    it('should emit trailingClick when trailing icon is clicked', () => {
      const trailingClickSpy = spyOn(component.trailingClick, 'emit');
      fixture.componentRef.setInput('type', BadgeType.TRAILING_ICON);
      fixture.componentRef.setInput('icon', 'test-icon');
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.badge .icon');
      icon.click();

      expect(trailingClickSpy).toHaveBeenCalled();
    });

    it('should emit closeClick when close icon is clicked', () => {
      const closeClickSpy = spyOn(component.closeClick, 'emit');
      fixture.componentRef.setInput('type', BadgeType.CLOSE);
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.badge .icon');
      icon.click();

      expect(closeClickSpy).toHaveBeenCalled();
    });
  });
});
