import { Pipe, PipeTransform } from '@angular/core';
import { SharedUtils } from '@shared/utils/shared-utils';
import { TableColumn } from '../builder/table-column';

@Pipe({
  name: 'translationKey'
})
export class TranslationKeyPipe implements PipeTransform {
  public transform(value: string, column: TableColumn): string {
    if (SharedUtils.isNullOrUndefined(value)) {
      return '';
    }

    const translationKey = column?.translationKey;
    return translationKey ? `${translationKey}.${value}` : value;
  }
}
