import { Pipe, PipeTransform } from '@angular/core';
import { getNestedValue } from '@shared/utils/object.utils';
import { TableColumn } from '../builder/table-column';

@Pipe({
  name: 'nestedValue'
})
export class NestedValuePipe implements PipeTransform {
  public transform(data: any, column: TableColumn): string {
    if (!data) {
      return '';
    }

    let valueKey = column?.valueKey;

    if (!valueKey) {
      return '';
    }

    const matches = valueKey.match(/%\((.*?)\)/g);

    return matches && matches.length > 0 ? valueKey.replace(/%\((.*?)\)/g, (_: string, placeholder: string) => getNestedValue(placeholder, data)) : getNestedValue(valueKey, data);
  }
}
