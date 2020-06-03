export default function inputsReducer(state, action) {
  switch (action.type) {
    case 'update':
      return update(action.data);
    default:
      throw new Error('Unexpected action type');
  }
}

function update(data) {
  return { ...data };
}

function updateAction(data) {
  return { type: 'update', data };
}

export { updateAction };
