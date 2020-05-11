import Client from './Client';
import compareObjects from './compareObjects';
import arraysSubtraction from './arraysSubtraction';
import * as actions from '../redux/actions/assignedTasksActions';

export default async function setUsersForTask(store, taskId, assigned, prevAssigned = {}) {
  if (compareObjects(assigned, prevAssigned)) {
    return;
  }

  if (!Object.keys(prevAssigned).length) {
    const assignedArray = await Client.assignTask(taskId, assigned);
    store.dispatch(actions.assignTask(taskId, assignedArray));
    return;
  }

  const newMembers = arraysSubtraction(assigned, prevAssigned);
  console.log(newMembers);
  if (newMembers.length) {
    const assignedArray = (await Client.assignTask(taskId, newMembers)).data;
    store.dispatch(actions.assignTask(taskId, assignedArray));
  }
  const deletedMembers = arraysSubtraction(prevAssigned, assigned);
  console.log(deletedMembers);
  if (deletedMembers.length) {
    const unassignedArray = (await Client.unassignTask(taskId, deletedMembers)).data;
    store.dispatch(actions.unassignTask(taskId, unassignedArray));
  }
}
