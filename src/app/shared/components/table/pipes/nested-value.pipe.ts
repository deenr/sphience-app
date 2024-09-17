import { Pipe, PipeTransform } from '@angular/core';
import { SharedUtils } from '@shared/utils/shared-utils';
import { TableColumn } from '../builder/table-column';

@Pipe({
  name: 'nestedValue'
})
export class NestedValuePipe implements PipeTransform {
  public transform(data: any, column: TableColumn, type: 'value' | 'title' | 'description' = 'value'): string {
    if (SharedUtils.isNullOrUndefined(data)) {
      return '';
    }

    let valueKey = '';
    switch (type) {
      case 'title':
        valueKey = column?.titleValueKey;
        break;
      case 'description':
        valueKey = column?.descriptionValueKey;
        break;
      default:
        valueKey = column?.valueKey;
        break;
    }

    if (SharedUtils.isNullOrUndefined(valueKey)) {
      return '';
    }

    return valueKey.match(/%\((.*?)\)/g)?.length > 0
      ? valueKey.replace(/%\((.*?)\)/g, (_: string, placeholder: string) => SharedUtils.getNestedValue(placeholder, data))
      : SharedUtils.getNestedValue(valueKey, data);
  }
}
