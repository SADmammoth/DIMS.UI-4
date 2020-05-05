import Client from './Client';
import compareObjects from './compareObjects';
import arraysSubtraction from './arraysSubtraction';

export default async function setUsersForTask(taskId, assigned, prevAssigned = {}) {
  if (compareObjects(assigned, prevAssigned)) {
    return new Promise((resolve) => resolve());
  }

  if (!Object.keys(prevAssigned).length) {
    Client.assignTask(taskId, assigned);
  }

  const newMembers = arraysSubtraction(assigned, prevAssigned);
  if (newMembers.length) {
    await Client.assignTask(taskId, newMembers);
  }

  const deletedMembers = arraysSubtraction(prevAssigned, assigned);
  if (deletedMembers.length) {
    await Client.unassignTask(taskId, deletedMembers);
  }
}
