import getMaskCharsBeforePlaceholder from '../../helpers/maskHelpers/getMaskCharsBeforePlaceholder';

describe('getMaskCharsBeforePlaceholder', () => {
  test('Cuts mask correct', () => {
    const input = ['+', '3', '7', '5', ' ', '(', '9\\', '9\\', ')', ' ', '9', '9', '9', '-', '9', '9', '-', '9', '9'];

    const actual = getMaskCharsBeforePlaceholder(input);
    const expectedOutput = '+375 (99) ';

    expect(actual).toBe(expectedOutput);
  });
  test('Cuts correct mask with no placeholders', () => {
    const input = ['+', '3', '7', '5', ' ', '(', '9\\', '9\\', ')'];

    const actual = getMaskCharsBeforePlaceholder(input);
    const expectedOutput = '+375 (99)';

    expect(actual).toBe(expectedOutput);
  });
});
