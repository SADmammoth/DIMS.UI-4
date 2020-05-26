import replaceAll from '../../helpers/formHelpers/replaceAll';

describe('replaceAll', () => {
  test('Must replace chars in given range with provided string', () => {
    const inputString = 't9xtW1thNumb9rs n12o312Nu32m3be3r1323sH33e342re12';
    // Remove all numbers beginning from 16 index
    const actual = replaceAll(inputString, 16, inputString.length, /[0-9]/g, '');
    const expected = 't9xtW1thNumb9rs noNumbersHere';

    expect(actual).toBe(expected);
  });
  test('Must return original string if incorrect indexes provided', () => {
    const inputString = 't9xtW1thNumb9rs n12o312Nu32m3be3r1323sH33e342re12';
    const actual = replaceAll(inputString, 5, 2, /[0-9]/g, '');
    const expected = 't9xtW1thNumb9rs n12o312Nu32m3be3r1323sH33e342re12';

    expect(actual).toBe(expected);
  });
});
