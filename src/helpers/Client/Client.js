import axios from 'axios';
import url from 'url';
import path from 'path';
import Validator from '../Validator';

//TODO Rplace path.join with url.resolve
class Client {
  static apiPath = process.env.REACT_APP_APIPATH;

  static directions = {};

  static states = ['active', 'success', 'fail'];

  static async getDirections() {
    (await axios.get(url.resolve(Client.apiPath, 'directions'))).data.forEach((direction) => {
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
    const members = (await axios.get(url.resolve(Client.apiPath, 'members'))).data;

    const membersObject = {};
    members.forEach((member) => {
      membersObject[member._id] = Client.createMembersObject(member);
    });
    return membersObject;
  }

  static postMember(
    name,
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
    return axios.post(url.resolve(Client.apiPath, 'members'), {
      headers: Client.defaultHeaders,
      body: {
        name,
        lastName,
        email,
        directionId: Client.getDirectionId(direction),
        sex,
        education,
        birthDate: birthDate.toISOString(),
        UniversityAverageScore: parseFloat(universityAverageScore),
        MathScore: parseInt(mathScore, 10),
        address,
        mobilePhone: mobilePhone.replace(/[^0-9()+]/g, ''),
        skype,
        startDate: startDate.toISOString(),
      },
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
    return axios.put(url.resolve(Client.apiPath, path.join('members', userId.toString())), {
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
    const { _id: taskId, taskName, taskDescription, startDate, deadlineDate } = tasksResponse;
    const tasks = {};
    tasks.id = taskId.toString();
    tasks.taskId = taskId;
    tasks.taskName = taskName;
    tasks.taskDescription = taskDescription;
    tasks.taskStart = new Date(startDate);
    tasks.taskDeadline = new Date(deadlineDate);
    return tasks;
  }

  static async getTasks() {
    const tasks = (await axios.get(url.resolve(Client.apiPath, 'tasks'), { headers: Client.defaultHeaders })).data;

    const tasksObject = {};
    await Promise.all(
      tasks.map(async (task) => {
        tasksObject[task.taskId] = Client.createTasksObject(task);
        // tasksObject[task.taskId].assignedTo = await this.getAssigned(task.TaskId);
      }),
    );
    return tasksObject;
  }

  static createUserTasksObject(userTasksResponse) {
    const { UserId, TaskId, TaskName, Description, StartDate, DeadlineDate, State } = userTasksResponse;
    const userTasks = {};

    userTasks.id = TaskId.toString() + UserId.toString();
    userTasks.userId = UserId;
    userTasks.taskId = TaskId;
    userTasks.taskName = TaskName;
    userTasks.taskDescription = Description;
    userTasks.taskStart = new Date(StartDate);
    userTasks.taskDeadline = new Date(DeadlineDate);
    userTasks.state = State;
    return userTasks;
  }

  static async getUserTasks(userId) {
    const userTasks = (
      await axios.get(url.resolve(Client.apiPath, 'user', path.join('tasks', userId)), {
        headers: Client.defaultHeaders,
      })
    ).data;
    const userTasksObject = {};

    userTasks.forEach((userTask) => {
      userTasksObject[userTask.TaskId.toString() + userTask.UserId.toString()] = Client.createUserTasksObject(userTask);
    });
    return userTasksObject;
  }

  static assignTask(taskId, usersIds) {
    // return axios.post(url.resolve(Client.apiPath, 'user', 'task', 'add', taskId.toString()), {
    //   headers: Client.defaultHeaders,
    //   body: usersIds,
    // });
  }

  static async getAssigned(members, taskId) {
    const allUsers = { ...members };
    const assignedTo = [];
    let userTasks;

    await Promise.all(
      Object.entries(allUsers).map(async ([userId, user]) => {
        userTasks = await this.getUserTasks(userId);
        Object.values(userTasks).forEach((userTask) => {
          if (userTask.taskId.toString() === taskId.toString()) {
            assignedTo.push({ userId, firstName: user.firstName, lastName: user.lastName, memberTaskId: userTask.id });
          }
        });
      }),
    );
    return assignedTo;
  }

  static editTask(taskId, taskName, taskDescription, startDate, deadlineDate) {
    return axios.put(url.resolve(Client.apiPath, path.join('tasks', taskId.toString())), {
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

    return axios.post(url.resolve(Client.apiPath, 'tasks'), { headers: Client.defaultHeaders, body: data }).data;
  }

  static setUserTaskState(TaskId, UserId, Status) {
    const StatusId = (Client.states.indexOf(Status) + 1).toString();
    return axios.put(url.resolve(Client.apiPath, 'user', 'task'), {
      TaskId: TaskId.toString(),
      UserId: UserId.toString(),
      StatusId,
    });
  }

  static deleteMember(userId) {
    return axios.delete(url.resolve(Client.apiPath, 'profile', 'delete', userId), { headers: Client.defaultHeaders });
  }

  static deleteTask(taskId) {
    return axios.delete(url.resolve(Client.apiPath, 'task', 'delete', taskId), { headers: Client.defaultHeaders });
  }

  static getUserProgress(userId) {
    // TODO Redo after API update
    return {};
  }

  static getTracks(userId) {
    // TODO Redo after API update
    return {};
  }

  static createTrack(userId) {
    // TODO Redo after API update
    return {};
  }

  static editTrack(userId) {
    // TODO Redo after API update
    return {};
  }

  static async unassignTask(taskId, userIds) {
    // TODO Restore after API bug fix
    // const userTasks = [];
    // const allUsers = Object.keys(await Client.getMembers());
    // let foundTasks;
    // await Promise.all(
    //   allUsers.map(async (userId) => {
    //     foundTasks = Object.values(await Client.getUserTasks(userId.toString())).filter(
    //       ({ taskId: candidateTaskId }) => {
    //         return taskId === candidateTaskId;
    //       },
    //     );
    //     if (foundTasks.length) {
    //       userTasks.push(...foundTasks);
    //     }
    //   }),
    // );
    // await Client.deleteTask(taskId.toString());
    // let createdTask = false;
    // await Promise.all(
    //   Object.values(userTasks).map(async (userTask) => {
    //     if (userIds.indexOf(userTask.userId) < 0) {
    //       const { userId, taskName, taskDescription, taskStart, taskDeadline, state } = userTask;
    //       if (!createdTask) {
    //         createdTask = true;
    //         await Client.postTask(taskName, taskDescription, taskStart, taskDeadline);
    //       }
    //       await Client.setUserTaskState(taskId.toString(), userId.toString(), state);
    //     }
    //   }),
    // );
    // await Client.assignTask(taskId, arraysSubtraction(allUsers, userIds));
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
    return { status: 'success', found: true, token: `${role}token`, role, userId: '2' };
  }

  static async getUserInfoByToken(token) {
    // TODO Redo after API update
    let role = 'admin';
    if (token === 'membertoken') {
      role = 'member';
    }
    return { role, userId: '2' };
  }
}

export default Client;
