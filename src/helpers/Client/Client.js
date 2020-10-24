import axios from 'axios';
import Validator from '../Validator';
import concatPath from '../concatPath';

const apiPath = process.env.REACT_APP_APIPATH;

const authPath = process.env.REACT_APP_AUTHAPIPATH;

class Client {
  static directions = {};

  static token = null;

  static defaultHeader = {};

  static role = 'guest';

  static async getDirections() {
    (await axios.get(concatPath(apiPath, 'directions'), { headers: Client.defaultHeader })).data.forEach(
      (direction) => {
        Client.directions[direction._id] = direction.name;
      },
    );
  }

  static getDirectionId(directionName) {
    return Object.keys(Client.directions).find((directionId) => {
      return Client.directions[directionId] === directionName;
    });
  }

  static createMembersObject(memberResponse) {
    const member = {};
    const {
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
    console.log(memberResponse);
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
    const members = (
      await axios.get(concatPath(apiPath, 'members', 'profiles'), {
        headers: Client.defaultHeader,
      })
    ).data;

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
    return axios.post(
      concatPath(apiPath, 'members', 'profiles'),
      {
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
      },
      { headers: Client.defaultHeader },
    );
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
    return axios.put(
      concatPath(apiPath, 'members', userId.toString(), 'profile'),
      {
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
      },
      { headers: Client.defaultHeader },
    );
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
    const tasks = (
      await axios.get(concatPath(apiPath, 'tasks'), {
        params: { includeAssigned: true },
        headers: Client.defaultHeader,
      })
    ).data;

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
    userTasks.status = state;
    return userTasks;
  }

  static async getUserTasks(userId) {
    const userTasks = (
      await axios.get(concatPath(apiPath, 'tasks'), {
        params: { member: userId.toString() },
        headers: Client.defaultHeader,
      })
    ).data;
    const userTasksObject = {};

    userTasks.forEach((userTask) => {
      userTasksObject[userTask._id] = Client.createUserTasksObject(userTask);
    });
    return userTasksObject;
  }

  static assignTask(taskId, usersIds) {
    return axios.post(concatPath(apiPath, 'tasks', taskId.toString(), 'members'), usersIds, {
      headers: Client.defaultHeader,
    });
  }

  static getAssigned(taskId) {
    return axios.get(concatPath(apiPath, 'tasks', taskId.toString(), 'members'), {
      headers: Client.defaultHeader,
    });
  }

  static editTask(taskId, taskName, taskDescription, startDate, deadlineDate) {
    return axios.put(
      concatPath(apiPath, 'tasks', taskId.toString()),
      {
        taskId,
        taskName,
        taskDescription,
        startDate: startDate.toISOString(),
        deadlineDate: deadlineDate.toISOString(),
      },
      { headers: Client.defaultHeader },
    );
  }

  static postTask(taskName, taskDescription, startDate, deadlineDate) {
    const data = {
      taskName,
      taskDescription,
      startDate: startDate.toISOString(),
      deadlineDate: deadlineDate.toISOString(),
    };

    return axios.post(concatPath(apiPath, 'tasks'), data, { headers: Client.defaultHeader });
  }

  static setUserTaskState(taskId, userId, status) {
    return axios.put(
      concatPath(apiPath, 'tasks', 'states', taskId.toString()),
      {
        status,
      },
      { headers: Client.defaultHeader, params: { member: userId.toString() } },
    );
  }

  static deleteMember(userId) {
    return axios.delete(concatPath(apiPath, 'members', userId), { headers: Client.defaultHeader });
  }

  static deleteTask(taskId) {
    return axios.delete(concatPath(apiPath, 'tasks', taskId), { headers: Client.defaultHeader });
  }

  static createUserProgressObject({ _id, taskId, userId, memberTaskId, taskName, trackNote, trackDate }) {
    return { id: _id, taskId, userId, memberTaskId, taskName, trackNote, trackDate: new Date(trackDate) };
  }

  static async getUserProgress(userId) {
    const progress = (
      await axios.get(concatPath(apiPath, 'tracks', 'progress'), {
        headers: Client.defaultHeader,
        params: { member: userId },
      })
    ).data;
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
    const tracks = (await axios.get(concatPath(apiPath, 'member', userId, 'tracks'), { headers: Client.defaultHeader }))
      .data;
    const tracksObject = {};
    tracks.forEach((track) => {
      tracksObject[track._id] = Client.createTracksObject(track);
    });
    return tracksObject;
  }

  static createTrack(userId, memberTaskId, trackDate, trackNote) {
    return axios.post(
      concatPath(apiPath, 'member', userId, 'tasks', memberTaskId, 'track'),
      {
        trackDate,
        trackNote,
      },
      { headers: Client.defaultHeader },
    );
  }

  static editTrack(trackId, trackDate, trackNote) {
    return axios.put(
      concatPath(apiPath, 'tracks', trackId),
      {
        trackDate,
        trackNote,
      },
      { headers: Client.defaultHeader },
    );
  }

  static async unassignTask(taskId, userIds) {
    return axios.put(concatPath(apiPath, 'members', 'tasks', taskId), userIds, {
      headers: Client.defaultHeader,
    });
  }

  static deleteTrack(trackId) {
    return axios.delete(concatPath(apiPath, 'tracks', trackId), { headers: Client.defaultHeader });
  }

  static setToken(token) {
    Client.token = token;
    console.log(token);
    Client.defaultHeader = { Authorization: `bearer ${token}` };
  }

  static async signIn(login, password) {
    const response = await axios.post(
      concatPath(authPath, 'users', 'login'),
      {
        login,
        password,
      },
      { headers: Client.defaultHeader },
    );
    const { token: jwtToken, userId, role, login: authorizedLogin } = response.data;
    if (login !== authorizedLogin) {
      return null;
    }
    const token = jwtToken.replace('JWT ', '');

    return { token, userId, role, login, status: 'success' };
  }

  static async confirmUser() {
    const { role, userId } = (await axios.get(concatPath(authPath, 'echo'), { headers: Client.defaultHeader })).data;

    if (!userId) {
      return { role, userId: '0' };
    }
    return { role, userId };
  }
}

export default Client;
