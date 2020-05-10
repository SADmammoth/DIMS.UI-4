import Client from './Client';
import compareObjects from './compareObjects';
import checkboxValueSeparator from './checkboxValueSeparator';
import Validator from './Validator';
import masks from './maskHelpers/masks';
import setUsersForTask from './setUsersForTask';

export default async function editAndAssignTask(
  store,
  { taskName, taskDescription, taskStart, taskDeadline, members },
  taskId,
  prevAssigned = [],
) {
  const assignedTo = checkboxValueSeparator(members);
  if (
    !prevAssigned.length ||
    !compareObjects(
      assignedTo,
      prevAssigned.map((el) => el.userId),
    )
  ) {
    await setUsersForTask(taskId, assignedTo, prevAssigned);
  }

  return Client.editTask(
    taskId,
    taskName,
    taskDescription,
    Validator.parseDateByMask(taskStart, masks.date),
    Validator.parseDateByMask(taskDeadline, masks.date),
  );
}
