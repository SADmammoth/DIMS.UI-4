import maskNotSpecialCharsRegex from '../../helpers/maskHelpers/maskNotSpecialCharsRegex';

describe('maskNotSpecialCharsRegex', () => {
  test('Must match not special chars and include escaped', () => {
    const actual = '9\\9\\\\831aa\\'.match(maskNotSpecialCharsRegex);
    const expected = ['9\\', '\\\\', '8', '3', '1', 'a\\'];

    expect(actual).toStrictEqual(expected);
  });
});
