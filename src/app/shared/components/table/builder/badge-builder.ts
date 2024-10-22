import { BadgeSize, BadgeType, Color } from '@shared/components/badge/badge.component';
import { TableColumnBuilder } from './table-column-builder';

export interface BadgeProperty {
  size: BadgeSize;
  colors: Map<any, Color>;
  type: BadgeType;
  key?: string;
  valueMap?: Map<any, string>;
}

export class BadgeBuilder {
  public constructor(private columnBuilder: TableColumnBuilder) {
    this.columnBuilder.badgeProperties = {
      size: BadgeSize.MD,
      colors: new Map(),
      type: BadgeType.NONE
    };
  }

  public setSize(size: BadgeSize): this {
    this.columnBuilder.badgeProperties!.size = size;
    return this;
  }

  public setType(type: BadgeType): this {
    this.columnBuilder.badgeProperties!.type = type;
    return this;
  }

  public setColors(colors: Map<any, Color>): this {
    this.columnBuilder.badgeProperties!.colors = colors;
    return this;
  }

  public setKey(key: string): this {
    this.columnBuilder.badgeProperties!.key = key;
    return this;
  }

  public setValueMap(valueMap: Map<any, string>): this {
    this.columnBuilder.badgeProperties!.valueMap = valueMap;
    return this;
  }

  public build(): TableColumnBuilder {
    return this.columnBuilder;
  }
}
