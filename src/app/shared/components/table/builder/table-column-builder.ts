import { TableColumnDataType } from '../table-column-data-type.enum';
import { TableColumn } from './table-column';

export class TableColumnBuilder {
  private static _index = 0;
  private _field?: string;
  private _name: string = '';
  private _type = TableColumnDataType.TEXT;
  private _valueKey?: string;

  public setField(field: string): this {
    this._field = field;
    return this;
  }

  public setHeaderName(name: string): this {
    this._name = name;
    return this;
  }

  public setValueKey(valueKey: string): this {
    this._valueKey = valueKey;
    return this;
  }

  public setDataType(type: TableColumnDataType): this {
    this._type = type;
    return this;
  }

  public build(): TableColumn {
    if (!this._field) {
      this._field = TableColumnBuilder._index.toString();
      TableColumnBuilder._index += 1;
    }

    if (!this._valueKey) {
      this._valueKey = this._field;
    }

    return new TableColumn(this._field, this._name, this._type, this._valueKey);
  }
}
