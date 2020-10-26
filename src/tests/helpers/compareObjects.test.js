import compareObjects from '../../helpers/compareObjects';

describe('compareObjects', () => {
  test('Returns true if references are same', () => {
    const object1 = { key1: 'value', key2: 'value2', key3: 'value3' };
    const object2 = object1;

    const actual = compareObjects(object1, object2);
    const expected = true;

    expect(actual).toBe(expected);
  });
  test('Returns true if objects have same key-value pairs', () => {
    const object1 = { key1: 'value', key2: 'value2', key3: 'value3' };
    const object2 = { key3: 'value3', key2: 'value2', key1: 'value' };

    const actual = compareObjects(object1, object2);
    const expected = true;

    expect(actual).toBe(expected);
  });

  test('Returns true if objects have same key-value, even if values are objects', () => {
    const object1 = { key1: 'value', key2: { key: { key: 'value' } }, key3: { key: 'value' } };
    const object2 = { key3: { key: 'value' }, key2: { key: { key: 'value' } }, key1: 'value' };

    const actual = compareObjects(object1, object2);
    const expected = true;

    expect(actual).toBe(expected);
  });
});
