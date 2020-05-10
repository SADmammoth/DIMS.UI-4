import Client from './Client';
import compareObjects from './compareObjects';
import arraysSubtraction from './arraysSubtraction';
import * as actions from '../redux/actions/assignedTasksActions';

export default async function setUsersForTask(store, taskId, assigned, prevAssigned = {}) {
  if (compareObjects(assigned, prevAssigned)) {
    return;
  }

  if (!Object.keys(prevAssigned).length) {
    await Client.assignTask(taskId, assigned);
    const assignedArray = (await Client.getUsersMemberTasks(taskId, assigned)).map(({ userId, memberTaskId }) => {
      return { userId, memberTaskId };
    });
    store.dispatch(actions.assignTask(taskId, assignedArray));
  }

  const newMembers = arraysSubtraction(assigned, prevAssigned);
  if (newMembers.length) {
    await Client.assignTask(taskId, newMembers);
    const assignedArray = (await Client.getUsersMemberTasks(taskId, newMembers)).map(({ userId, memberTaskId }) => {
      return { userId, memberTaskId };
    });
    store.dispatch(actions.assignTask(taskId, assignedArray));
  }

  const deletedMembers = arraysSubtraction(prevAssigned, assigned);
  if (deletedMembers.length) {
    const unassignedArray = (await Client.getUsersMemberTasks(taskId, deletedMembers)).map(
      ({ userId, memberTaskId }) => {
        return { userId, memberTaskId };
      },
    );
    await Client.unassignTask(taskId, deletedMembers);
    store.dispatch(actions.unassignTask(taskId, unassignedArray));
  }
}
