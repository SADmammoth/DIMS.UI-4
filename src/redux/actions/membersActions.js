import * as types from '../actionTypes';

export function addMember({
  id,
  firstName,
  lastName,
  email,
  startDate,
  direction,
  mobilePhone,
  skype,
  address,
  sex,
  birthDate,
  education,
  universityAverageScore,
  mathScore,
}) {
  return {
    type: types.ADD_MEMBER,
    data: {
      id,
      firstName,
      lastName,
      email,
      startDate,
      direction,
      mobilePhone,
      skype,
      address,
      sex,
      birthDate,
      education,
      universityAverageScore,
      mathScore,
    },
  };
}

export function deleteMember(id) {
  return {
    type: types.DELETE_MEMBER,
    id,
  };
}

export function editMember(
  id,
  {
    firstName,
    lastName,
    email,
    startDate,
    direction,
    mobilePhone,
    skype,
    address,
    sex,
    birthDate,
    education,
    universityAverageScore,
    mathScore,
  },
) {
  return {
    type: types.EDIT_MEMBER,
    id,
    data: {
      firstName,
      lastName,
      email,
      startDate,
      direction,
      mobilePhone,
      skype,
      address,
      sex,
      birthDate,
      education,
      universityAverageScore,
      mathScore,
    },
  };
}

export function setMembers(members) {
  return {
    type: types.SET_MEMBERS,
    members,
  };
}
