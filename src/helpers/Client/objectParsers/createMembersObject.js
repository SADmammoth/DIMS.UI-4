import Validator from '../../Validator/Validator';

export default function createMembersObject(memberResponse, directions) {
  const member = {};
  const {
    firstName,
    lastName,
    birthDate,
    email,
    directionId,
    sex,
    education,
    universityAverageScore,
    mathScore,
    address,
    mobilePhone,
    skype,
    startDate,
  } = memberResponse;

  member.firstName = firstName;
  member.lastName = lastName;
  member.birthDate = new Date(birthDate);
  member.email = email;
  member.direction = directions[directionId];
  member.sex = sex;
  member.education = education;
  member.universityAverageScore = universityAverageScore;
  member.mathScore = mathScore;
  member.address = address;
  member.mobilePhone = Validator.parsePhoneByMask(mobilePhone, '+999 (99) 999-99-99');
  member.skype = skype;
  member.startDate = new Date(startDate);

  return member;
}
