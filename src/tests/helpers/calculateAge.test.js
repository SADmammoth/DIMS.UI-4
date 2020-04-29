import calculateAge from '../../helpers/calculateAge';

describe('calculateAge', () => {
  test('Calculates age correct, if birthday is before current date', () => {
    const now = new Date();
    const birthDate = new Date(2000, 7, 18);

    const actual = calculateAge(birthDate);
    const expected = now.getFullYear() - 2000 - 1;

    expect(actual).toBe(expected);
  });

  test('Calculates age correct, if birthday is on current date', () => {
    const now = new Date();
    const birthDate = new Date(2000, now.getMonth(), now.getDate());

    const actual = calculateAge(birthDate);
    const expected = now.getFullYear() - 2000;

    expect(actual).toBe(expected);
  });

  test('Calculates age correct, if birthday is after current date', () => {
    const now = new Date();
    const birthDate = new Date(2000, now.getMonth(), now.getDate() + 2);

    const actual = calculateAge(birthDate);
    const expected = now.getFullYear() - 2000;

    expect(actual).toBe(expected);
  });
});
