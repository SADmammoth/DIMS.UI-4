import checkTaskDates from '../../helpers/checkTaskDates';
import DateMask from '../../helpers/Validator/DateMask';
import masks from '../../helpers/maskHelpers/masks';

describe('checkTasksDates', () => {
  test('If start date is before end date, returns true', () => {
    const startDate = DateMask.fromDateToMask(new Date(11, 4, 2000), masks.date);
    const endDate = DateMask.fromDateToMask(new Date(12, 4, 2000), masks.date);

    const actual = checkTaskDates(startDate, endDate);
    const expectedOutput = true;

    expect(actual).toBe(expectedOutput);
  });
  test('If start date is after end date, returns true', () => {
    const startDate = DateMask.fromDateToMask(new Date(12, 4, 2000), masks.date);
    const endDate = DateMask.fromDateToMask(new Date(11, 4, 2000), masks.date);

    const actual = checkTaskDates(startDate, endDate);
    const expectedOutput = false;

    expect(actual).toBe(expectedOutput);
  });
  test('If start date is same as end date, returns true', () => {
    const startDate = DateMask.fromDateToMask(new Date(12, 4, 2000), masks.date);
    const endDate = DateMask.fromDateToMask(new Date(12, 4, 2000), masks.date);

    const actual = checkTaskDates(startDate, endDate);
    const expectedOutput = true;

    expect(actual).toBe(expectedOutput);
  });
});
