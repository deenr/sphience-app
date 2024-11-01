import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { By } from '@angular/platform-browser';
import { TabsItem } from './tabs-item.interface';
import { TabsComponent } from './tabs.component';

type TabKey = '1' | '2' | '3';

describe('TabsComponent', () => {
  const tabs: TabsItem<TabKey>[] = [
    { key: '1', value: 'Option one' },
    { key: '2', value: 'Option two' },
    { key: '3', value: 'Option three' }
  ];

  let fixture: ComponentFixture<TabsComponent<TabKey>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TabsComponent, MatTabsModule]
    }).compileComponents();

    fixture = TestBed.createComponent<TabsComponent<TabKey>>(TabsComponent);
  });

  it('should initialise the first tab as active when no active tab is defined', async () => {
    const defaultActiveIndex = 0;

    fixture.componentRef.setInput('tabs', tabs);
    fixture.detectChanges();

    const tabElements = fixture.debugElement.queryAll(By.css('a'));
    tabElements.forEach((tab, index) => {
      const isTabSelected = tab.nativeElement.getAttribute('aria-selected') === 'true';
      if (index === defaultActiveIndex) {
        expect(isTabSelected).toBeTrue();
      } else {
        expect(isTabSelected).toBeFalse();
      }
    });
  });

  it('should initialise the correct tab as active when active tab is defined', async () => {
    const activeIndex = 2;
    const activeTab = tabs[activeIndex];

    fixture.componentRef.setInput('tabs', tabs);
    fixture.componentRef.setInput('activeTab', activeTab);
    fixture.detectChanges();

    fixture.debugElement.queryAll(By.css('a')).forEach((tab, index) => {
      const isTabSelected = tab.nativeElement.getAttribute('aria-selected') === 'true';
      if (index === activeIndex) {
        expect(isTabSelected).toBeTrue();
      } else {
        expect(isTabSelected).toBeFalse();
      }
    });
  });

  it('should set tab as active on click', async () => {
    const newActiveIndex = 1;

    fixture.componentRef.setInput('tabs', tabs);
    fixture.detectChanges();

    const tabElements = fixture.debugElement.nativeElement.querySelectorAll('a');
    tabElements[newActiveIndex].click();
    fixture.detectChanges();

    fixture.debugElement.queryAll(By.css('a')).forEach((tab, index) => {
      const isTabSelected = tab.nativeElement.getAttribute('aria-selected') === 'true';
      if (index === newActiveIndex) {
        expect(isTabSelected).toBeTrue();
      } else {
        expect(isTabSelected).toBeFalse();
      }
    });
  });
});
