import maskSpecialCharsRegex from '../../helpers/maskSpecialCharsRegex';

describe('maskEscapedCharsRegex', () => {
  test('Must match special chars and not include escaped', () => {
    const actual = '9\\9\\\\831aa\\'.match(maskSpecialCharsRegex);
    const expected = ['9', 'a'];

    expect(actual).toStrictEqual(expected);
  });
});
