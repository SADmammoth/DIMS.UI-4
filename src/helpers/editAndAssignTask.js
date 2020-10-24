/* eslint-disable camelcase */
import Client from './Client';
import checkboxValueSeparator from './formHelpers/checkboxValueSeparator';
import Validator from './Validator';
import masks from './maskHelpers/masks';
import setUsersForTask from './setUsersForTask';
import compareObjects from './compareObjects';

export default async function editAndAssignTask(
  dispatch,
  { taskName, taskDescription, taskStart, taskDeadline, members, members_default },
  taskId,
) {
  const assignedTo = checkboxValueSeparator(members);
  if (
    !members_default.length ||
    !compareObjects(
      assignedTo,
      members_default.map((el) => el.userId),
    )
  ) {
    await setUsersForTask(dispatch, taskId, assignedTo, members_default);
  }

  return Client.editTask(
    taskId,
    taskName,
    taskDescription,
    Validator.parseDateByMask(taskStart, masks.date),
    Validator.parseDateByMask(taskDeadline, masks.date),
  );
}
