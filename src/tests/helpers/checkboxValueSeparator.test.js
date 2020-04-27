import checkboxValueSeparator from '../../helpers/checkboxValueSeparator';

describe('checkboxValueSeparator', () => {
  test('Returns correct array for string input', () => {
    let input = 'value1,value2,value3,value4';
    let expectedOutput = ['value1', 'value2', 'value3', 'value4'];
    expect(checkboxValueSeparator(input)).toStrictEqual(expectedOutput);
  });
  test("Returns input if it's array", () => {
    const inputArray = ['value1', 'value2', 'value3', 'value4'];

    expect(checkboxValueSeparator(inputArray)).toBe(inputArray);
  });
});
