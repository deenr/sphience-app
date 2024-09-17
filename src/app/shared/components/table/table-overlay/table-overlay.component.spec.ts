import { MatIconModule } from '@angular/material/icon';
import { TableOverlayComponent } from './table-overlay.component';
import { render, screen } from '@testing-library/angular';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('TableOverlayComponent', () => {
  it('should render the elements', async () => {
    await render(TableOverlayComponent, {
      imports: [MatIconModule, MatIconTestingModule]
    });

    expect(screen.getByText('No results found...')).toBeInTheDocument();
    expect(screen.getByText('Please refine your search criteria and try again.')).toBeInTheDocument();
  });
});
