import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { DeviceDocument } from '@core/models';
import { AvatarComponent, AvatarSize } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvatarComponent, MatIconTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('initialization', () => {
    it('should set default size to MD', () => {
      expect(component.size()).toBe(AvatarSize.MD);
    });

    it('should initialize without document by default', () => {
      expect(component.document()).toBeUndefined();
    });
  });

  describe('placeholder behavior', () => {
    it('should display placeholder icon when no document is provided', () => {
      const placeholderIcon = fixture.nativeElement.querySelector('mat-icon');

      expect(placeholderIcon).toBeDefined();
      expect(placeholderIcon.getAttribute('svgIcon')).toBe('user');
    });
  });

  describe('avatar display', () => {
    it('should display user avatar when document with uploadedBy is provided', () => {
      const mockDocument: Partial<DeviceDocument> = {
        file: new File([], 'test.jpg'),
        uploadedBy: {
          id: 1,
          avatar: 'test-avatar.jpg',
          name: 'Test User',
          email: 'test@test.com'
        }
      };

      fixture.componentRef.setInput('document', mockDocument as DeviceDocument);
      fixture.detectChanges();

      const avatarImg = fixture.nativeElement.querySelector('img');
      expect(avatarImg).toBeDefined();
      expect(avatarImg.src).toContain('test-avatar.jpg');
      expect(avatarImg.alt).toBe('Test User');
    });
  });

  describe('size handling', () => {
    it('should apply correct size class', () => {
      const sizes = Object.values(AvatarSize);

      sizes.forEach((size) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const avatarDiv = fixture.nativeElement.querySelector('.avatar');
        expect(avatarDiv.classList.contains(size.toLowerCase())).toBeTruthy();
      });
    });
  });
});
