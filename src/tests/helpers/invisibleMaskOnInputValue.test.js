import invisibleMaskOnInputValue from '../../helpers/invisibleMaskOnInputValue';

describe('invisibleMaskOnInputValue', () => {
  test('Return value is object with correct structure', () => {
    const actual = invisibleMaskOnInputValue('name', 'value', ['v', 'a', 'l', 'u', 'e', 's']);

    expect(actual).toHaveProperty('target');
    expect(actual.target).toHaveProperty('name');
    expect(actual.target).toHaveProperty('value');
  });
  test('Return value must add not placeholder characters to input', () => {
    const actual = invisibleMaskOnInputValue('name', 'value', ['v', 'a', 'l', 'u', 'e', 's']);

    expect(actual.target.value).toBe('values');
  });
});
