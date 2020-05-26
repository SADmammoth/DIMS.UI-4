import replaceSubstring from '../../helpers/formHelpers/replaceSubstring';

describe('replaceSubstring', () => {
  test('Must replace substring between indexes with provided new substring', () => {
    const inputString = 'textdeletedttext';
    const actual = replaceSubstring(inputString, 4, 12, 'text');
    const expected = 'texttexttext';

    expect(actual).toBe(expected);
  });
  test('Must return original string if incorrect indexes provided', () => {
    const inputString = 'textdeletedttext';
    const actual = replaceSubstring(inputString, 5, 2, 'text');
    const expected = 'textdeletedttext';

    expect(actual).toBe(expected);
  });
});
