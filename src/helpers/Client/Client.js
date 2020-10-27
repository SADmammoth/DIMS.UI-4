import axios from 'axios';
import concatPath from '../concatPath';
import checkStatus from './checkStatus';
import parseJSON from './parseJSON';
import createTasksObject from './objectParsers/createTasksObject';
import createTracksObject from './objectParsers/createTracksObject';
import createMembersObject from './objectParsers/createMembersObject';
import createUserTasksObject from './objectParsers/createUserTasksObject';

const apiPath = process.env.REACT_APP_APIPATH;

const authPath = process.env.REACT_APP_AUTHAPIPATH;

const Client = {
  directions: {},

  token: null,

  defaultHeader: {},

  role: 'guest',

  async getDirections() {
    const directions = await axios
      .get(concatPath(apiPath, 'directions'), { headers: Client.defaultHeader })
      .catch(checkStatus)
      .then(parseJSON);

    directions.forEach((direction) => {
      Client.directions[direction._id] = direction.name;
    });
  },

  getDirectionId(directionName) {
    return Object.keys(Client.directions).find((directionId) => {
      return Client.directions[directionId] === directionName;
    });
  },

  async getMembers() {
    const members = await axios
      .get(concatPath(apiPath, 'members', 'profiles'), {
        headers: Client.defaultHeader,
      })
      .catch(checkStatus)
      .then(parseJSON);
    const membersObject = {};

    members.forEach((member) => {
      membersObject[member._id] = createMembersObject(member, Client.directions);
    });

    return membersObject;
  },

  postMember(
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
    return axios
      .post(
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
      )
      .catch(checkStatus)
      .then(parseJSON);
  },

  editMember(
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
    return axios
      .put(
        concatPath(apiPath, 'members', userId.toString(), 'profile'),
        {
          firstName,
          lastName,
          email,
          directionId: direction,
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
      )
      .catch(checkStatus)
      .then(parseJSON);
  },

  async getTasks() {
    const tasks = await axios
      .get(concatPath(apiPath, 'tasks'), {
        params: { includeAssigned: true },
        headers: Client.defaultHeader,
      })
      .catch(checkStatus)
      .then(parseJSON);

    const tasksObject = {};

    await Promise.all(
      tasks.map(async (task) => {
        tasksObject[task._id] = createTasksObject(task);
      }),
    );
    return tasksObject;
  },
  async getUserTasks(userId) {
    const userTasks = await axios
      .get(concatPath(apiPath, 'tasks'), {
        params: { member: userId.toString() },
        headers: Client.defaultHeader,
      })
      .catch(checkStatus)
      .then(parseJSON);
    const userTasksObject = {};

    userTasks.forEach((userTask) => {
      userTasksObject[userTask._id] = createUserTasksObject(userTask);
    });
    return userTasksObject;
  },

  assignTask(taskId, usersIds) {
    return axios
      .post(concatPath(apiPath, 'tasks', taskId.toString(), 'members'), usersIds, {
        headers: Client.defaultHeader,
      })
      .catch(checkStatus)
      .then(parseJSON);
  },

  getAssigned(taskId) {
    return axios
      .get(concatPath(apiPath, 'tasks', taskId.toString(), 'members'), {
        headers: Client.defaultHeader,
      })
      .catch(checkStatus)
      .then(parseJSON);
  },

  editTask(taskId, taskName, taskDescription, startDate, deadlineDate) {
    return axios
      .put(
        concatPath(apiPath, 'tasks', taskId.toString()),
        {
          taskId,
          taskName,
          taskDescription,
          startDate: startDate.toISOString(),
          deadlineDate: deadlineDate.toISOString(),
        },
        { headers: Client.defaultHeader },
      )
      .catch(checkStatus)
      .then(parseJSON);
  },

  postTask(taskName, taskDescription, startDate, deadlineDate) {
    const data = {
      taskName,
      taskDescription,
      startDate: startDate.toISOString(),
      deadlineDate: deadlineDate.toISOString(),
    };

    return axios
      .post(concatPath(apiPath, 'tasks'), data, { headers: Client.defaultHeader })
      .catch(checkStatus)
      .then(parseJSON);
  },

  setUserTaskState(taskId, userId, status) {
    return axios
      .put(
        concatPath(apiPath, 'tasks', 'states', taskId.toString()),
        {
          status,
        },
        { headers: Client.defaultHeader, params: { member: userId.toString() } },
      )
      .catch(checkStatus)
      .then(parseJSON);
  },

  deleteMember(userId) {
    return axios
      .delete(concatPath(apiPath, 'members', userId, 'profile'), { headers: Client.defaultHeader })
      .catch(checkStatus)
      .then(parseJSON);
  },

  deleteTask(taskId) {
    return axios
      .delete(concatPath(apiPath, 'tasks', taskId), { headers: Client.defaultHeader })
      .catch(checkStatus)
      .then(parseJSON);
  },

  async getUserProgress(userId) {
    const progress = await axios
      .get(concatPath(apiPath, 'tracks', 'progress'), {
        headers: Client.defaultHeader,
        params: { member: userId },
      })
      .catch(checkStatus)
      .then(parseJSON);

    const progressObject = {};
    progress.forEach((progressItem) => {
      progressObject[progressItem._id] = createTracksObject(progressItem);
    });
    return progressObject;
  },

  async getTracks(userId) {
    const tracks = await axios
      .get(concatPath(apiPath, 'tracks'), { headers: Client.defaultHeader, params: { member: userId } })
      .catch(checkStatus)
      .then(parseJSON);

    const tracksObject = {};

    tracks.forEach((track) => {
      tracksObject[track._id] = createTracksObject(track);
    });
    return tracksObject;
  },

  createTrack(userId, memberTaskId, trackNote, trackDate) {
    return axios
      .post(
        concatPath(apiPath, 'tracks'),
        {
          trackDate: trackDate.toISOString(),
          trackNote,
        },
        {
          headers: Client.defaultHeader,
          params: {
            member: userId,
            memberTaskId,
          },
        },
      )
      .catch(checkStatus)
      .then(parseJSON);
  },

  editTrack(trackId, trackNote, trackDate, userId) {
    return axios
      .put(
        concatPath(apiPath, 'tracks', trackId),
        {
          trackDate,
          trackNote,
        },
        { headers: Client.defaultHeader, params: { member: userId } },
      )
      .catch(checkStatus)
      .then(parseJSON);
  },

  async unassignTask(taskId, userIds) {
    return axios
      .put(concatPath(apiPath, 'members', 'tasks', taskId), userIds, {
        headers: Client.defaultHeader,
      })
      .catch(checkStatus)
      .then(parseJSON);
  },

  deleteTrack(trackId, userId) {
    return axios.delete(concatPath(apiPath, 'tracks', trackId), {
      headers: Client.defaultHeader,
      params: { member: userId },
    });
  },

  setToken(token) {
    Client.token = token;
    Client.defaultHeader = { Authorization: `bearer ${token}` };
  },

  async signIn(login, password) {
    const response = await axios
      .post(
        concatPath(authPath, 'users', 'login'),
        {
          login,
          password,
        },
        { headers: Client.defaultHeader },
      )
      .catch(checkStatus)
      .then(parseJSON);

    if (!response) {
      return null;
    }

    const { token: jwtToken, userId, role, login: authorizedLogin } = response;
    if (login !== authorizedLogin) {
      return null;
    }
    const token = jwtToken.replace('JWT ', '');

    return { token, userId, role, login, status: 'success' };
  },

  async confirmUser() {
    const { role, userId } = await axios
      .get(concatPath(authPath, 'echo'), { headers: Client.defaultHeader })
      .catch(checkStatus)
      .then(parseJSON);

    if (!userId) {
      return { role, userId: '0' };
    }

    return { role, userId };
  },
};

export default Client;
