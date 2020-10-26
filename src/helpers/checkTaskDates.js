import DateMask from './Validator/DateMask';
import masks from './maskHelpers/masks';

export default function checkTaskDates(startDateString, endDateString) {
  const startDate = DateMask.parseDateByMask(startDateString, masks.date);
  const endDate = DateMask.parseDateByMask(endDateString, masks.date);
  return startDate <= endDate;
}
