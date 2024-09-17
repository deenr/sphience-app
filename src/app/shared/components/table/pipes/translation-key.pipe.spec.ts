import { TableColumn } from '../builder/table-column';
import { TableColumnDataType } from '../table-column-data-type.enum';
import { TranslationKeyPipe } from './translation-key.pipe';

describe('TranslationKeyPipe', () => {
  let pipe: TranslationKeyPipe;

  beforeEach(() => {
    pipe = new TranslationKeyPipe();
  });

  it('should return an empty string for null data', () => {
    const column: TableColumn = { field: 'name', name: 'Name', type: TableColumnDataType.TEXT };
    const data: any = null;

    const result = pipe.transform(data, column);

    expect(result).toEqual('');
  });

  it('should return an empty string for undefined data', () => {
    const column: TableColumn = { field: 'name', name: 'Name', type: TableColumnDataType.TEXT };
    const data: any = undefined;

    const result = pipe.transform(data, column);

    expect(result).toEqual('');
  });

  it('should transform the value to a translation key', () => {
    const translationKey = 'GENERAL.ENUMS.USER_ROLE';
    const column: TableColumn = { field: 'name', name: 'Name', type: TableColumnDataType.TEXT, translationKey };
    const data = 'SUPER_ADMIN';

    const result = pipe.transform(data, column);

    expect(result).toEqual(`${translationKey}.${data}`);
  });
});
