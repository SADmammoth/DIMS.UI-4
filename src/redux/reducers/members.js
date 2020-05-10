import * as types from '../actionTypes';
import compareObjects from '../../helpers/compareObjects';

const initialState = {};

export default function members(state = initialState, action) {
  switch (action.type) {
    case types.SET_MEMBERS:
      return setMembers(state, action.members);
    case types.ADD_MEMBER:
      return addMember(state, action.data);
    case types.EDIT_MEMBER:
      return editMember(state, action.id, action.data);
    case types.DELETE_MEMBER:
      return deleteMember(state, action.id);
    default:
      return state;
  }
}

function setMembers(state, membersData) {
  if (state && Object.keys(state).length) {
    return state;
  }
  return { ...membersData };
}

function addMember(state, data) {
  const { id, ...memberData } = data;
  return { ...state, [id]: memberData };
}

function editMember(state, id, newData) {
  if (state[id]) {
    const oldMemberData = { ...state[id] };
    if (!compareObjects(oldMemberData, newData)) {
      return { ...state, [id]: newData };
    }
  }
  return state;
}

function deleteMember(state, id) {
  if (state[id]) {
    const { [id]: deleted, ...rest } = state;
    return { ...rest };
  }
  return state;
}
