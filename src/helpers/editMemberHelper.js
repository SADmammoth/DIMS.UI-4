import DateMask from './Validator/DateMask';
import masks from './maskHelpers/masks';
import store from '../redux';
import { editMember } from '../redux/actions/membersActions';
import Client from './Client/Client';

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
) {
  const calculatedStartDate = DateMask.parseDateByMask(startDate, masks.date);
  const calculatedBirthDate = DateMask.parseDateByMask(birthDate, masks.date);

  store.dispatch(
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
