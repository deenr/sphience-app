import { MatIconTestingModule } from '@angular/material/icon/testing';
import { render, screen } from '@testing-library/angular';
import { MatIconModule } from '@angular/material/icon';
import { TableTitleAndDescriptionComponent } from './table-title-and-description.component';

describe('TableTitleAndDescriptionComponent', () => {
  it('should show the title of the person', async () => {
    const title = 'Test title';

    await render(TableTitleAndDescriptionComponent, {
      componentProperties: { title },
      imports: [MatIconModule, MatIconTestingModule]
    });

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should show the description of the person', async () => {
    const description = 'Test description';

    await render(TableTitleAndDescriptionComponent, {
      componentProperties: { description },
      imports: [MatIconModule, MatIconTestingModule]
    });

    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
