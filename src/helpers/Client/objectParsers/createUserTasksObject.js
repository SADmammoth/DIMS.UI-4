export default function createUserTasksObject(userTasksResponse) {
  const { _id, userId, taskId, taskName, taskDescription, startDate, deadlineDate, state } = userTasksResponse;
  const userTasks = {};

  userTasks.id = _id;
  userTasks.userId = userId;
  userTasks.taskId = taskId;
  userTasks.taskName = taskName;
  userTasks.taskDescription = taskDescription;
  userTasks.taskStart = new Date(startDate);
  userTasks.taskDeadline = new Date(deadlineDate);
  userTasks.status = state;

  return userTasks;
}
