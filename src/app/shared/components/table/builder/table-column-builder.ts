import { BadgeBuilder, BadgeProperty } from './badge-builder';

export enum TableColumnDataType {
  TEXT = 'TEXT',
  TITLE_AND_DESCRIPTION = 'TITLE_AND_DESCRIPTION',
  BADGE = 'BADGE',
  AVATAR_GROUP = 'AVATAR_GROUP',
  IMAGE = 'IMAGE',
  EDIT = 'EDIT',
  DELETE = 'DELETE'
}

export class TableColumn {
  public constructor(
    public field: string,
    public name: string,
    public type: TableColumnDataType,
    public valueKey: string,
    public badgeProperties?: BadgeProperty,
    public titleKey?: string,
    public descriptionKey?: string
  ) {}
}

export class TableColumnBuilder {
  public badgeProperties?: BadgeProperty;
  private static _index = 0;
  private _field?: string;
  private _name: string = '';
  private _type = TableColumnDataType.TEXT;
  private _valueKey?: string;
  private _titleKey?: string;
  private _descriptionKey?: string;

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

  public setBadge(configureBadge: (badgeBuilder: BadgeBuilder) => void): this {
    if (this._type === TableColumnDataType.BADGE) {
      const badgeBuilder = new BadgeBuilder(this);
      configureBadge(badgeBuilder);
    } else {
      throw new Error('setBadge method can only be used with TableColumnDataType.BADGE');
    }
    return this;
  }

  public setTitleAndDescription(titleKey: string, descriptionKey: string): this {
    if (this._type === TableColumnDataType.TITLE_AND_DESCRIPTION) {
      this._titleKey = titleKey;
      this._descriptionKey = descriptionKey;
    } else {
      throw new Error('setTitleAndDescription method can only be used with TableColumnDataType.TITLE_AND_DESCRIPTION');
    }
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

    if (!this.badgeProperties?.key) {
      this.badgeProperties?.key === this._valueKey;
    }

    return new TableColumn(this._field, this._name, this._type, this._valueKey, this.badgeProperties, this._titleKey, this._descriptionKey);
  }
}
