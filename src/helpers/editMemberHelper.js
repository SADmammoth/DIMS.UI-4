import DateMask from './Validator/DateMask';
import masks from './maskHelpers/masks';
import { editMember } from '../redux/actions/membersActions';
import Client from './Client';

export default function editMemberHelper(
  id,
  {
    firstName,
    lastName,
    email,
    skype,
    mobilePhone,
    address,
    sex,
    startDate,
    birthDate,
    direction,
    education,
    universityAverageScore,
    mathScore,
  },
  dispatch,
) {
  const calculatedStartDate = DateMask.parseDateByMask(startDate, masks.date);
  const calculatedBirthDate = DateMask.parseDateByMask(birthDate, masks.date);

  dispatch(
    editMember(id, {
      firstName,
      lastName,
      email,
      skype,
      mobilePhone,
      address,
      sex,
      startDate: calculatedStartDate,
      birthDate: calculatedBirthDate,
      direction,
      education,
      universityAverageScore,
      mathScore,
    }),
  );

  return Client.editMember(
    id,
    firstName,
    lastName,
    email,
    direction,
    sex,
    education,
    calculatedBirthDate,
    universityAverageScore,
    mathScore,
    address,
    mobilePhone,
    skype,
    calculatedStartDate,
  );
}
