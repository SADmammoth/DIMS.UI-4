import maskEscapedCharsRegex from '../../helpers/maskHelpers/maskEscapedCharsRegex';

describe('maskEscapedCharsRegex', () => {
  test('Must match escaped chars', () => {
    const actual = '9\\9\\\\8312a\\'.match(maskEscapedCharsRegex);
    const expected = ['9\\', '\\\\', 'a\\'];

    expect(actual).toStrictEqual(expected);
  });
});
