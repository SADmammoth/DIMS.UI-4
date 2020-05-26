import maskNotSpecialCharsRegex from '../../helpers/maskHelpers/maskNotSpecialCharsRegex';

describe('maskNotSpecialCharsRegex', () => {
  test('Must match not special mask chars and include escaped', () => {
    const input = '9\\9\\\\831aa\\';
    const actual = input.match(maskNotSpecialCharsRegex);
    const expected = ['9\\', '\\\\', '8', '3', '1', 'a\\'];

    expect(actual).toStrictEqual(expected);
  });
});
