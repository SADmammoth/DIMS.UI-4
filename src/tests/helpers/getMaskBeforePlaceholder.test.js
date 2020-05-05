import getMaskCharsBeforePlaceholder from '../../helpers/maskHelpers/getMaskCharsBeforePlaceholder';
import maskEscapedCharsOrEmptyRegex from '../../helpers/maskHelpers/maskEscapedCharsOrEmptyRegex';

describe('getMaskCharsBeforePlaceholder', () => {
  test('Trims mask correct', () => {
    const input = '+375 (9\\9\\) 999-99-99'.split(maskEscapedCharsOrEmptyRegex).filter((el) => el);

    const actual = getMaskCharsBeforePlaceholder(input);
    const expectedOutput = '+375 (99) ';

    expect(actual).toBe(expectedOutput);
  });
  test('Trims correct mask with no placeholders', () => {
    const input = '+375 (9\\9\\)'.split(maskEscapedCharsOrEmptyRegex).filter((el) => el);

    const actual = getMaskCharsBeforePlaceholder(input);
    const expectedOutput = '+375 (99)';

    expect(actual).toBe(expectedOutput);
  });
});
