export default function createTasksObject(tasksResponse) {
  const { _id: taskId, taskName, taskDescription, startDate, deadlineDate, assignedTo } = tasksResponse;
  const tasks = {};
  tasks.id = taskId.toString();
  tasks.taskId = taskId.toString();
  tasks.taskName = taskName;
  tasks.taskDescription = taskDescription;
  tasks.taskStart = new Date(startDate);
  tasks.taskDeadline = new Date(deadlineDate);
  tasks.assignedTo = assignedTo.map(({ _id: userId, memberTaskId }) => {
    return {
      userId,
      memberTaskId,
    };
  });

  return tasks;
}
