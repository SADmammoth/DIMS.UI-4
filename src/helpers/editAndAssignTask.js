import Client from './Client';
import checkboxValueSeparator from './formHelpers/checkboxValueSeparator';
import Validator from './Validator';
import masks from './maskHelpers/masks';
import setUsersForTask from './setUsersForTask';

export default async function editAndAssignTask(
  store,
  { taskName, taskDescription, taskStart, taskDeadline, members, members_default },
  taskId,
) {
  await setUsersForTask(store, taskId, checkboxValueSeparator(members), checkboxValueSeparator(members_default));

  return Client.editTask(
    taskId,
    taskName,
    taskDescription,
    Validator.parseDateByMask(taskStart, masks.date),
    Validator.parseDateByMask(taskDeadline, masks.date),
  );
}
