import getValueFromMask from '../../helpers/maskHelpers/getValueFromMask';

describe('getValueFromMask', () => {
  test('Cuts mask correct', () => {
    const input = '+375 (99) 9__-__-__';

    const actual = getValueFromMask(input);
    const expectedOutput = '+375 (99) 9';

    expect(actual).toBe(expectedOutput);
  });
  test('Cuts correct mask with no placeholders', () => {
    const input = '+375 (99) 9';

    const actual = getValueFromMask(input);
    const expectedOutput = '+375 (99) 9';

    expect(actual).toBe(expectedOutput);
  });
  test('Cuts correct mask with first char placeholder', () => {
    const input = '___-__-__';

    const actual = getValueFromMask(input);
    const expectedOutput = '';

    expect(actual).toBe(expectedOutput);
  });
});
