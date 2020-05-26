import invisibleMaskOnInputValue from '../../helpers/maskHelpers/invisibleMaskOnInputValue';

describe('invisibleMaskOnInputValue', () => {
  test('Returns object with structure {target: {name, value}}', () => {
    const actual = invisibleMaskOnInputValue('name', 'value', ['v', 'a', 'l', 'u', 'e', 's']);

    expect(actual).toHaveProperty('target');
    expect(actual.target).toHaveProperty('name');
    expect(actual.target).toHaveProperty('value');
  });
  test('Returned target.value in object do not include mask special characters', () => {
    const actual = invisibleMaskOnInputValue('name', 'value', ['v', 'a', 'l', 'u', 'e', 's', '9', '9']);

    expect(actual.target.value).toBe('values');
  });
});
