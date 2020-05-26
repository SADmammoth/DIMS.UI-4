import getUniqueItems from '../../helpers/getUniqueItems';

describe('getUniqueItems', () => {
  test('Retrieves unique items from array', () => {
    const input = [1, 2, 1, 123, 3, 2, 123, 3, 2];

    const actual = getUniqueItems(input);
    const expected = [1, 2, 3, 123];

    expect(actual.length).toEqual(expected.length);
    expect(actual).toEqual(expect.arrayContaining(expected));
  });
  test('Returns same array if all items unique', () => {
    const input = [1, 2, 5, 3, 4];

    const actual = getUniqueItems(input);
    const expected = [1, 2, 5, 3, 4];

    expect(actual).toStrictEqual(expected);
  });
});
