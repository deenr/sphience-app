import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, input, Output, Signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { getNestedValue } from '@shared/utils/object.utils';
import { TableColumn } from './builder/table-column';
import { MatPaginatorIntlService } from './mat-paginator-intl.service';
import { TableColumnDataType } from './table-column-data-type.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlService, deps: [TranslateService] }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> {
  @ViewChild(MatPaginator, { static: true }) public paginator?: MatPaginator;

  public data = input.required<T[]>();
  public columns = input.required<TableColumn[]>();
  public withSelection = input(false);
  public withPaginator = input(true);
  public withNoResultsOverlay = input(true);
  public title = input<string>('');

  @Output() public rowClicked = new EventEmitter<T>();
  @Output() public edit = new EventEmitter<T>();
  @Output() public delete = new EventEmitter<T>();

  public displayedColumns = computed(() => this.columns().map((column: TableColumn) => column.field));
  public dataSource: Signal<MatTableDataSource<T>> = computed(() => {
    const dataSource = new MatTableDataSource(this.data());
    if (this.paginator) dataSource.paginator = this.paginator;

    return dataSource;
  });
  public selectionModel = new SelectionModel<T>(true, []);
  public tableColumnDataType = TableColumnDataType;

  private differ: any;

  public constructor(private readonly translateService: TranslateService) {}

  public isAllSelected(): boolean {
    const numSelected = this.selectionModel.selected.length;
    const numRows = this.dataSource().data.length;
    return numSelected === numRows;
  }

  public selectAll(): void {
    this.isAllSelected() ? this.selectionModel.clear() : this.dataSource().data.forEach((row) => this.selectionModel.select(row));
  }

  public onCellEdit(event: MouseEvent, object: T): void {
    event.stopPropagation();
    this.edit.emit(object);
  }

  public onCellDelete(event: MouseEvent, object: T): void {
    event.stopPropagation();
    this.delete.emit(object);
  }

  public onRowClick(object: T): void {
    if (this.withSelection()) {
      this.selectionModel.toggle(object);
    } else {
      this.rowClicked.emit(object);
    }
  }

  public isCellClickedObserved(): boolean {
    return this.rowClicked.observed;
  }

  public isActionColumn(data: TableColumn): boolean {
    return [TableColumnDataType.DELETE, TableColumnDataType.EDIT].includes(data.type);
  }

  public getArray(data: T | T[], badgePropertiesKey: string): any[] {
    const nestedData = getNestedValue(badgePropertiesKey, data);
    return Array.isArray(nestedData) ? nestedData : [nestedData];
  }
}
