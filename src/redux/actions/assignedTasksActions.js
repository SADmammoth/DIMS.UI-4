import { ASSIGN_TASK, UNASSIGN_TASK, SET_ASSIGNED_TO_TASK } from '../actionTypes';

export function assignTask(taskId, userIds) {
  return { type: ASSIGN_TASK, taskId, userIds };
}

export function unassignTask(taskId, userIds) {
  return { type: UNASSIGN_TASK, taskId, userIds };
}

export function setAssignedToTasks(associativeArray) {
  return { type: SET_ASSIGNED_TO_TASK, associativeArray };
}
