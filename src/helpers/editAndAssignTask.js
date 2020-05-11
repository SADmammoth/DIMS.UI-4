import Client from './Client';
import compareObjects from './compareObjects';
import checkboxValueSeparator from './checkboxValueSeparator';
import Validator from './Validator';
import masks from './maskHelpers/masks';
import setUsersForTask from './setUsersForTask';

export default async function editAndAssignTask(
  store,
  { taskName, taskDescription, taskStart, taskDeadline, members, members_default },
  taskId,
) {
  console.log(members_default);
  await setUsersForTask(store, taskId, checkboxValueSeparator(members), checkboxValueSeparator(members_default));

  return Client.editTask(
    taskId,
    taskName,
    taskDescription,
    Validator.parseDateByMask(taskStart, masks.date),
    Validator.parseDateByMask(taskDeadline, masks.date),
  );
}
