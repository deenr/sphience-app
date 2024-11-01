import { TableColumn, TableColumnDataType } from '../builder/table-column-builder';
import { NestedValuePipe } from './nested-value.pipe';

describe('NestedValuePipe', () => {
  let pipe: NestedValuePipe;

  beforeEach(() => {
    pipe = new NestedValuePipe();
  });

  it('should return an empty string for null data', () => {
    const column: TableColumn = { field: 'profile', name: 'Profile', type: TableColumnDataType.TEXT, valueKey: 'profile' };
    const data: any = null;

    const result = pipe.transform(data, column);

    expect(result).toEqual('');
  });

  it('should return an empty string for undefined data', () => {
    const column: TableColumn = { field: 'profile', name: 'Profile', type: TableColumnDataType.TEXT, valueKey: 'profile' };
    const data: any = undefined;

    const result = pipe.transform(data, column);

    expect(result).toEqual('');
  });

  it('should transform data to profile description', () => {
    const profile = 'Profile';
    const column: TableColumn = { field: 'profile', name: 'Profile', type: TableColumnDataType.TEXT, valueKey: 'profile' };
    const data = { profile };

    const result = pipe.transform(data, column);

    expect(result).toEqual(profile);
  });

  it('should transform data to profile description when the key has nested properties', () => {
    const title = 'Frontend Developer';

    const column: TableColumn = { field: 'profile', name: 'Profile', type: TableColumnDataType.TEXT, valueKey: 'job.title' };
    const data = { job: { title } };

    const result = pipe.transform(data, column);

    expect(result).toEqual(title);
  });

  it('should transform data to a custom sentence when the key has parameters', () => {
    const name = 'HTML';
    const level = 6;
    const skillByPerson = { skill: { name }, level };

    const column: TableColumn = { field: 'skill', name: 'Skill', type: TableColumnDataType.TEXT, valueKey: '%(skill.name) - %(level)' };
    const data = { ...skillByPerson };

    const result = pipe.transform(data, column);

    expect(result).toEqual(`${name} - ${level}`);
  });
});
