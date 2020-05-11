import axios from 'axios';
import url from 'url';
import path from 'path';
import Validator from '../Validator';
import concatPath from '../concatPath';

//TODO Rplace path.join with concatPath
class Client {
  static apiPath = process.env.REACT_APP_APIPATH;

  static directions = {};

  static states = ['active', 'success', 'fail'];

  static async getDirections() {
    (await axios.get(concatPath(Client.apiPath, 'directions'))).data.forEach((direction) => {
      Client.directions[direction._id] = direction.name;
    });
  }

  static getDirectionId(directionName) {
    return Object.keys(Client.directions).find((directionId) => {
      return Client.directions[directionId] === directionName;
    });
  }

  static createMembersObject(memberResponse) {
    const member = {};
    const {
      _id,
      firstName,
      lastName,
      birthDate,
      email,
      directionId,
      sex,
      education,
      universityAverageScore,
      mathScore,
      address,
      mobilePhone,
      skype,
      startDate,
    } = memberResponse;

    member.firstName = firstName;
    member.lastName = lastName;
    member.birthDate = new Date(birthDate);
    member.email = email;
    member.direction = Client.directions[directionId];
    member.sex = sex;
    member.education = education;
    member.universityAverageScore = universityAverageScore;
    member.mathScore = mathScore;
    member.address = address;
    member.mobilePhone = Validator.parsePhoneByMask(mobilePhone, '+999 (99) 999-99-99');
    member.skype = skype;
    member.startDate = new Date(startDate);

    return member;
  }

  static async getMembers() {
    const members = (await axios.get(concatPath(Client.apiPath, 'members', 'profile'))).data;

    const membersObject = {};
    members.forEach((member) => {
      membersObject[member._id] = Client.createMembersObject(member);
    });
    return membersObject;
  }

  static postMember(
    firstName,
    lastName,
    email,
    direction,
    sex,
    education,
    birthDate,
    universityAverageScore,
    mathScore,
    address,
    mobilePhone,
    skype,
    startDate,
  ) {
    return axios.post(concatPath(Client.apiPath, 'members', 'profile'), {
      firstName,
      lastName,
      email,
      directionId: direction,
      sex,
      education,
      birthDate: birthDate.toISOString(),
      universityAverageScore: parseFloat(universityAverageScore),
      mathScore: parseInt(mathScore, 10),
      address,
      mobilePhone: mobilePhone.replace(/[^0-9()+]/g, ''),
      skype,
      startDate: startDate.toISOString(),
    });
  }

  static editMember(
    userId,
    firstName,
    lastName,
    email,
    direction,
    sex,
    education,
    birthDate,
    universityAverageScore,
    mathScore,
    address,
    mobilePhone,
    skype,
    startDate,
  ) {
    return axios.put(concatPath(Client.apiPath, path.join('members', userId.toString(), 'profile')), {
      firstName,
      lastName,
      email,
      directionId: Client.getDirectionId(direction),
      sex,
      education,
      birthDate: birthDate.toISOString(),
      universityAverageScore: parseFloat(universityAverageScore),
      mathScore,
      address,
      mobilePhone: mobilePhone.replace(/[^0-9+]/g, ''),
      skype,
      startDate: startDate.toISOString(),
    });
  }

  static createTasksObject(tasksResponse) {
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

  static async getTasks() {
    const tasks = (await axios.get(concatPath(Client.apiPath, 'tasks'), { params: { includeAssigned: true } })).data;

    const tasksObject = {};
    await Promise.all(
      tasks.map(async (task) => {
        tasksObject[task._id] = Client.createTasksObject(task);
      }),
    );
    return tasksObject;
  }

  static createUserTasksObject(userTasksResponse) {
    const { _id, userId, taskId, taskName, taskDescription, startDate, deadlineDate, state } = userTasksResponse;
    const userTasks = {};

    userTasks.id = _id;
    userTasks.userId = userId;
    userTasks.taskId = taskId;
    userTasks.taskName = taskName;
    userTasks.taskDescription = taskDescription;
    userTasks.taskStart = new Date(startDate);
    userTasks.taskDeadline = new Date(deadlineDate);
    userTasks.state = state;
    return userTasks;
  }

  static async getUserTasks(userId) {
    const userTasks = (
      await axios.get(concatPath(Client.apiPath, 'members', userId.toString(), 'tasks'), {
        headers: Client.defaultHeaders,
      })
    ).data;
    const userTasksObject = {};

    userTasks.forEach((userTask) => {
      userTasksObject[userTask._id] = Client.createUserTasksObject(userTask);
    });
    return userTasksObject;
  }

  static assignTask(taskId, usersIds) {
    return axios.post(concatPath(Client.apiPath, 'tasks', taskId.toString()), usersIds);
  }

  static getAssigned(taskId) {
    return axios.get(concatPath(Client.apiPath, 'tasks', taskId.toString(), 'assigned'));
  }

  static editTask(taskId, taskName, taskDescription, startDate, deadlineDate) {
    return axios.put(concatPath(Client.apiPath, path.join('tasks', taskId.toString())), {
      taskId,
      taskName,
      taskDescription,
      startDate: startDate.toISOString(),
      deadlineDate: deadlineDate.toISOString(),
    });
  }

  static postTask(taskName, taskDescription, startDate, deadlineDate) {
    const data = {
      taskName,
      taskDescription,
      startDate: startDate.toISOString(),
      deadlineDate: deadlineDate.toISOString(),
    };

    return axios.post(concatPath(Client.apiPath, 'tasks'), data);
  }

  static setUserTaskState(TaskId, UserId, Status) {
    const StatusId = (Client.states.indexOf(Status) + 1).toString();
    return axios.put(concatPath(Client.apiPath, 'user', 'task'), {
      TaskId: TaskId.toString(),
      UserId: UserId.toString(),
      StatusId,
    });
  }

  static deleteMember(userId) {
    return axios.delete(concatPath(Client.apiPath, 'members', userId));
  }

  static deleteTask(taskId) {
    return axios.delete(concatPath(Client.apiPath, 'tasks', taskId));
  }

  static createUserProgressObject({ _id, taskId, userId, memberTaskId, taskName, trackNote, trackDate }) {
    return { id: _id, taskId, userId, memberTaskId, taskName, trackNote, trackDate: new Date(trackDate) };
  }

  static async getUserProgress(userId) {
    const progress = (await axios.get(concatPath(Client.apiPath, 'member', userId, 'progress'))).data;
    const progressObject = {};
    progress.forEach((progressItem) => {
      progressObject[progressItem._id] = Client.createTracksObject(progressItem);
    });
    return progressObject;
  }

  static createTracksObject({ taskName, memberTaskId, trackDate, trackNote }) {
    return { taskName, memberTaskId, trackNote, trackDate: new Date(trackDate) };
  }

  static async getTracks(userId) {
    const tracks = (await axios.get(concatPath(Client.apiPath, 'member', userId, 'tracks'))).data;
    const tracksObject = {};
    tracks.forEach((track) => {
      console.log(track);
      tracksObject[track._id] = Client.createTracksObject(track);
    });
    return tracksObject;
  }

  static createTrack(userId, memberTaskId, trackDate, trackNote) {
    return axios.post(concatPath(Client.apiPath, 'member', userId, 'tasks', memberTaskId, 'track'), {
      trackDate,
      trackNote,
    });
  }

  static editTrack(trackId, trackDate, trackNote) {
    return axios.put(concatPath(Client.apiPath, 'tracks', trackId), {
      trackDate,
      trackNote,
    });
  }

  static async unassignTask(taskId, userIds) {
    return axios.put(concatPath(Client.apiPath, 'members', 'tasks', taskId), userIds);
  }

  static deleteTrack(trackId) {
    return axios.delete(concatPath(Client.apiPath, 'tracks', trackId));
  }

  static async checkToken(token) {
    // TODO Redo after API update
    return true;
  }

  static signIn(login, password) {
    // TODO Redo after API update
    let role = 'admin';
    if (login === 'member') {
      role = 'member';
    }
    return { status: 'success', found: true, token: `${role}token`, role, userId: '5eb4247fefce44ad0c2ffabb' };
  }

  static async getUserInfoByToken(token) {
    // TODO Redo after API update
    let role = 'admin';
    if (token === 'membertoken') {
      role = 'member';
    }
    return { role, userId: '5eb4247fefce44ad0c2ffabb' };
  }
}

export default Client;
