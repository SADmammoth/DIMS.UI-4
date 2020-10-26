import arraysSubtraction from '../../helpers/arraysSubtraction';

describe('maskNotSpecialCharsRegex', () => {
  test('Must return elements of left array that not in right array', () => {
    const leftArray = [1, 2, 3, 4, 6, 1, 7, 8];
    const rightArray = [2, 5, 1, 3, 2];
    const actual = arraysSubtraction(leftArray, rightArray).sort((a, b) => {
      return a - b;
    });
    const expected = [4, 6, 7, 8];

    expect(actual).toStrictEqual(expected);
  });

  test('Must return empty array if left array has no elements that not in right array', () => {
    const leftArray = [];
    const rightArray = [2, 5, 1, 3, 2];

    const actual = arraysSubtraction(leftArray, rightArray);
    const expected = [];

    expect(actual).toStrictEqual(expected);
  });

  test('Must return left array if no elements in right array', () => {
    const leftArray = [1, 2, 3, 4, 6, 1, 7, 8];
    const rightArray = [];

    const actual = arraysSubtraction(leftArray, rightArray);
    const expected = [1, 2, 3, 4, 6, 1, 7, 8];

    expect(actual).toStrictEqual(expected);
  });
});
