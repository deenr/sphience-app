import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { DeviceDocument } from '@core/models';
import { AvatarComponent } from '../avatar/avatar.component';
import { AvatarGroupComponent, AvatarGroupSize } from './avatar-group.component';

describe('AvatarGroupComponent', () => {
  let component: AvatarGroupComponent;
  let fixture: ComponentFixture<AvatarGroupComponent>;

  const mockDocuments: Partial<DeviceDocument>[] = [
    { file: new File([], 'test1.jpg'), uploadedBy: { id: 1, avatar: 'avatar1.jpg', name: 'User 1', email: 'user1@test.com' } },
    { file: new File([], 'test2.jpg'), uploadedBy: { id: 2, avatar: 'avatar2.jpg', name: 'User 2', email: 'user2@test.com' } },
    { file: new File([], 'test3.jpg'), uploadedBy: { id: 3, avatar: 'avatar3.jpg', name: 'User 3', email: 'user3@test.com' } }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvatarGroupComponent, AvatarComponent, MatIconTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarGroupComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('documents', mockDocuments as DeviceDocument[]);
    fixture.detectChanges();
  });

  describe('initialization', () => {
    it('should set default size to MD', () => {
      const avatarGroup = fixture.nativeElement.querySelector('.avatar');
      expect(avatarGroup.classList.contains('md')).toBeTrue();

      const avatars = fixture.nativeElement.querySelectorAll('app-avatar');
      avatars.forEach((avatar: HTMLElement) => {
        expect(avatar.getAttribute('ng-reflect-size')).toBe(AvatarGroupSize.MD);
      });
    });

    it('should set default maxItems to Infinity', () => {
      expect(component.maxItems()).toBe(Infinity);
    });

    it('should require documents input', () => {
      const template = fixture.nativeElement;
      expect(template.querySelectorAll('app-avatar').length).toBe(3);
    });
  });

  describe('avatar display', () => {
    it('should display all avatars when maxItems is not set', () => {
      const avatars = fixture.nativeElement.querySelectorAll('app-avatar');
      expect(avatars.length).toBe(3);
    });

    it('should limit displayed avatars when maxItems is set', () => {
      fixture.componentRef.setInput('maxItems', 2);
      fixture.detectChanges();

      const avatars = fixture.nativeElement.querySelectorAll('app-avatar');
      expect(avatars.length).toBe(1);

      const extraCount = fixture.nativeElement.querySelector('.extra');
      expect(extraCount.textContent).toBe('+2');
    });
  });

  describe('size handling', () => {
    it('should apply correct size class', () => {
      fixture.componentRef.setInput('size', AvatarGroupSize.XS);
      fixture.detectChanges();

      const avatarGroup = fixture.nativeElement.querySelector('.avatar');
      const avatars = fixture.nativeElement.querySelectorAll('app-avatar');
      expect(avatarGroup.classList.contains('xs')).toBeTruthy();
      avatars.forEach((avatar: HTMLElement) => {
        expect(avatar.getAttribute('ng-reflect-size')).toBe(AvatarGroupSize.XS);
      });
    });
  });

  describe('computed properties', () => {
    it('should correctly determine if there are more images', () => {
      fixture.componentRef.setInput('maxItems', 2);
      fixture.detectChanges();

      const extraCount = fixture.nativeElement.querySelector('.extra');
      expect(extraCount).toBeDefined();
      expect(extraCount.textContent).toBe('+2');

      fixture.componentRef.setInput('maxItems', 4);
      fixture.detectChanges();

      const noExtraCount = fixture.nativeElement.querySelector('.extra');
      expect(noExtraCount).toBeNull();
    });

    it('should correctly display visible avatars based on maxItems', () => {
      fixture.componentRef.setInput('maxItems', 2);
      fixture.detectChanges();

      const avatars = fixture.nativeElement.querySelectorAll('app-avatar');
      expect(avatars.length).toBe(1);

      fixture.componentRef.setInput('maxItems', 4);
      fixture.detectChanges();

      const moreAvatars = fixture.nativeElement.querySelectorAll('app-avatar');
      expect(moreAvatars.length).toBe(3);
    });
  });
});
