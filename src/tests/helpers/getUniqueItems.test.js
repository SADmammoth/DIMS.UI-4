import getUniqueItems from '../../helpers/getUniqueItems';

describe('getUniqueItems', () => {
  test('Retrieves unique items from array', () => {
    const input = [1, 2, 1, 123, 3, 2, 123, 3, 2];

    const actual = getUniqueItems(input).sort((a, b) => a - b);
    const expectedOutput = [1, 2, 3, 123];

    expect(actual).toStrictEqual(expectedOutput);
  });
  test('Returns same array if all items unique', () => {
    const input = [1, 2, 5, 3, 4];

    const actual = getUniqueItems(input);
    const expectedOutput = [1, 2, 5, 3, 4];

    expect(actual).toStrictEqual(expectedOutput);
  });
});
