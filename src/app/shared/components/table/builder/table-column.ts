import { TableColumnDataType } from '../table-column-data-type.enum';

export class TableColumn {
  public constructor(
    public field: string,
    public name: string,
    public type: TableColumnDataType,
    public valueKey: string
  ) {}
}
