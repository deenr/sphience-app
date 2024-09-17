import { fireEvent, render, screen } from '@testing-library/angular';
import { TableComponent } from './table.component';
import { TableModule } from './table.module';
import { TableColumnBuilder } from './builder/table-column-builder';
import { TableColumn } from './builder/table-column';
import { TableColumnDataType } from './table-column-data-type.enum';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { StubPersonFactory } from '@core/controllers/people/stub-person-factory';
import { TranslateModule } from '@ngx-translate/core';

describe('TableComponent', () => {
  const data = StubPersonFactory.getRandomPersons().map((person) => ({ ...person, flag: true, hidden: false }));
  const columns: TableColumn[] = [
    new TableColumnBuilder()
      .setField('profile')
      .setHeaderName('Profile')
      .setDataType(TableColumnDataType.PROFILE)
      .setProfileNameKey(['firstName', 'lastName'])
      .setProfileDescriptionKey('job.title')
      .build(),
    new TableColumnBuilder()
      .setField('skillSet')
      .setHeaderName('Most proficient skills')
      .setBadgePropertiesKey('skillSet')
      .setValueKey('%(skill.name) - %(level)')
      .setDataType(TableColumnDataType.BADGE)
      .build(),
    new TableColumnBuilder().setDataType(TableColumnDataType.DOWNLOAD).build(),
    new TableColumnBuilder().setDataType(TableColumnDataType.DELETE).build(),
    new TableColumnBuilder().setField('flag').setDataType(TableColumnDataType.FLAG).build(),
    new TableColumnBuilder().setField('visibility').setDataType(TableColumnDataType.VISIBILITY).build()
  ];

  it('should show the title of the table', async () => {
    const title = 'Test title';

    await render(TableComponent, { imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()], componentProperties: { title } });

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should set the header checkbox to unchecked when no rows are selected', async () => {
    await render(TableComponent, {
      imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
      componentProperties: { withSelection: true, data, columns }
    });

    expect(screen.getAllByTestId('mat-mdc-checkbox')[0].getAttribute('ng-reflect-indeterminate')).toBe('false');
    expect(screen.getAllByTestId('mat-mdc-checkbox')[0].getAttribute('ng-reflect-checked')).toBe('false');
  });

  it('should set the header checkbox to indeterminate when not all the rows are selected', async () => {
    await render(TableComponent, {
      imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
      componentProperties: { withSelection: true, data, columns }
    });

    fireEvent.change(screen.getAllByTestId('mat-mdc-checkbox')[1]);

    expect(screen.getAllByTestId('mat-mdc-checkbox')[0].getAttribute('ng-reflect-indeterminate')).toBe('true');
  });

  it('should set the header checkbox to indeterminate when not all the rows are selected', async () => {
    await render(TableComponent, {
      imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
      componentProperties: { data: [], columns }
    });

    expect(screen.getByText('COMPONENTS.TABLE.PAGINATION')).toBeInTheDocument();
  });

  it('should set the header checkbox to checked when all the rows are selected', async () => {
    await render(TableComponent, {
      imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
      componentProperties: { withSelection: true, data, columns }
    });

    screen.getAllByTestId('mat-mdc-checkbox').forEach((_, index: number) => {
      if (index !== 0) {
        fireEvent.change(screen.getAllByTestId('mat-mdc-checkbox')[index]);
      }
    });

    expect(screen.getAllByTestId('mat-mdc-checkbox')[0].getAttribute('ng-reflect-checked')).toBe('true');
  });

  describe('withSelection', () => {
    it('should show the checkboxes if withSelection is true', async () => {
      await render(TableComponent, {
        imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
        componentProperties: { withSelection: true, data, columns }
      });

      const checkboxes = screen.getAllByTestId('mat-mdc-checkbox');

      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('should not show the checkboxes if withSelection is false', async () => {
      await render(TableComponent, {
        imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
        componentProperties: { withSelection: false }
      });

      expect(screen.queryByTestId('mat-mdc-checkbox')).not.toBeInTheDocument();
    });
  });

  describe('withPaginator', () => {
    it('should show the paginator if withPaginator is true', async () => {
      await render(TableComponent, {
        imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
        componentProperties: { data, columns }
      });

      expect(screen.getByTestId('paginator')).toBeInTheDocument();
    });

    it('should hide the paginator if withPaginator if false', async () => {
      await render(TableComponent, {
        imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
        componentProperties: { withPaginator: false, data, columns }
      });

      expect(screen.getByTestId('paginator').classList).toContain('display-none');
    });
  });

  describe('withNoResultsOverlay', () => {
    it('should show the no results overlay if withNoResultsOverlay is true and there are no results', async () => {
      await render(TableComponent, {
        imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
        componentProperties: { data: [], columns }
      });

      expect(screen.getByText('No results found...')).toBeInTheDocument();
    });

    it('should not show the no results overlay if withNoResultsOverlay is false and there are no results', async () => {
      await render(TableComponent, {
        imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
        componentProperties: { withNoResultsOverlay: false, data: [], columns }
      });

      expect(screen.queryByText('No results found...')).not.toBeInTheDocument();
    });
  });

  describe('isAllSelected', () => {
    let component: TableComponent<any>;

    beforeEach(async () => {
      const { fixture } = await render(TableComponent, { imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()], componentProperties: { withSelection: true, data, columns } });

      component = fixture.componentInstance;
    });

    it('should return true if all the rows are selected', () => {
      component.selectionModel.select(...data);

      expect(component.isAllSelected()).toBe(true);
    });

    it('should return false if not all the rows are selected', () => {
      expect(component.isAllSelected()).toBe(false);
    });
  });

  describe('selectAll', () => {
    let component: TableComponent<any>;

    beforeEach(async () => {
      const { fixture } = await render(TableComponent, {
        imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
        componentProperties: { withSelection: true, data, columns }
      });

      component = fixture.componentInstance;
    });

    it('should select all rows when not all are selected', () => {
      const checkboxes = screen.getAllByTestId('mat-mdc-checkbox');
      const headerCheckbox = checkboxes[0];

      checkboxes.forEach((checkbox: HTMLElement) => {
        expect(checkbox.classList.contains('mat-mdc-checkbox-checked')).toBeFalsy();
      });

      jest.spyOn(component, 'selectAll');
      fireEvent.change(headerCheckbox);

      expect(component.selectAll).toHaveBeenCalled();

      checkboxes.forEach((checkbox: HTMLElement) => {
        expect(checkbox.classList.contains('mat-mdc-checkbox-checked')).toBeTruthy();
      });
    });

    it('should clear selection when all rows are selected', () => {
      component.selectionModel.select(...data);
      component.selectAll();

      expect(component.selectionModel.selected.length).toBe(0);
    });
  });

  describe('onCellDelete', () => {
    it('should remove the row when the delete icon of that row', async () => {
      const { fixture } = await render(TableComponent, {
        imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
        componentProperties: { data, columns }
      });

      const component = fixture.componentInstance;
      const indexToDelete = 2;

      jest.spyOn(component.delete, 'emit');
      fireEvent.click(screen.getAllByTestId('table-delete-icon')[indexToDelete]);

      expect(component.delete.emit).toHaveBeenCalledWith(data[indexToDelete]);
    });
  });

  describe('onCellFlag', () => {
    it('should emit on flag when flag cell is clicked', async () => {
      const { fixture } = await render(TableComponent, {
        imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
        componentProperties: { data, columns }
      });

      const component = fixture.componentInstance;
      const indexToFlag = 2;

      jest.spyOn(component.flag, 'emit');
      fireEvent.click(screen.getAllByTestId('table-flag-icon')[indexToFlag]);

      expect(component.flag.emit).toHaveBeenCalledWith(data[indexToFlag]);
    });
  });

  describe('visibilityToggle', () => {
    it('should emit on visibility toggle when eye icon cell is clicked', async () => {
      const { fixture } = await render(TableComponent, {
        imports: [TableModule, MatIconTestingModule, TranslateModule.forRoot()],
        componentProperties: { data, columns }
      });

      const component = fixture.componentInstance;
      const indexToToggleVisibility = 2;

      jest.spyOn(component.toggleVisibility, 'emit');
      fireEvent.click(screen.getAllByTestId('table-visibility-icon')[indexToToggleVisibility]);

      expect(component.toggleVisibility.emit).toHaveBeenCalledWith(data[indexToToggleVisibility]);
    });
  });
});
