import { MatTabsModule } from '@angular/material/tabs';
import { RenderResult, fireEvent, render, screen } from '@testing-library/angular';
import { TabsComponent } from './tabs.component';
import { TabsItem } from './tabs-item.interface';

describe('TabsComponent', () => {
  async function renderComponent(tabs: TabsItem[], activeTab: TabsItem): Promise<RenderResult<TabsComponent, TabsComponent>> {
    return await render(TabsComponent, {
      componentProperties: { tabs, activeTab },
      imports: [MatTabsModule]
    });
  }

  it('should emit the new active tab on click', async () => {
    const tabs = [
      { key: '1', value: 'Option one' },
      { key: '2', value: 'Option two' },
      { key: '3', value: 'Option three' }
    ];

    await renderComponent(tabs, null);

    expect(screen.getByText(tabs[0].value).parentElement.parentElement.classList.contains('mdc-tab--active')).toBe(true);
    expect(screen.getByText(tabs[1].value).parentElement.parentElement.classList.contains('mdc-tab--active')).toBe(false);

    fireEvent.click(screen.getByText(tabs[1].value));

    expect(screen.getByText(tabs[0].value).parentElement.parentElement.classList.contains('mdc-tab--active')).toBe(false);
    expect(screen.getByText(tabs[1].value).parentElement.parentElement.classList.contains('mdc-tab--active')).toBe(true);
  });
});
