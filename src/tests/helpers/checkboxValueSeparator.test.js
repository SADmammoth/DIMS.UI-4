import checkboxValueSeparator from '../../helpers/checkboxValueSeparator';

describe('checkboxValueSeparator', () => {
  test('Returns correct array for string input', () => {
    const input = 'value1,value2,value3,value4';

    const actual = checkboxValueSeparator(input);
    const expectedOutput = ['value1', 'value2', 'value3', 'value4'];

    expect(actual).toStrictEqual(expectedOutput);
  });

  test('Returns input if input is array', () => {
    const inputArray = ['value1', 'value2', 'value3', 'value4'];

    const actual = checkboxValueSeparator(inputArray);
    const expectedOutput = inputArray;

    expect(actual).toStrictEqual(expectedOutput);
  });

  test('Returns empty array if input is empty string', () => {
    const inputArray = '';

    const actual = checkboxValueSeparator(inputArray);
    const expectedOutput = [];

    expect(actual).toStrictEqual(expectedOutput);
  });
});
