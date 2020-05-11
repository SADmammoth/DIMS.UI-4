import axios from 'axios';
import path from 'path';
import Validator from '../Validator';
import arraysSubtraction from '../arraysSubtraction';

class Client {
  static apiPath = process.env.REACT_APP_APIPATH;

  static directions = ['React', '.Net', 'Angular', 'Java'];

  static states = ['active', 'success', 'fail'];

  static defaultHeaders = {};

  static createMembersObject(memberResponse) {
    const member = {};
    const {
      FullName,
      Email,
      Direction,
      Sex,
      Education,
      Age,
      UniversityAverageScore,
      MathScore,
      Address,
      MobilePhone,
      Skype,
      StartDate,
    } = memberResponse;

    const [firstName, lastName] = FullName.split(' ');
    member.firstName = firstName;
    member.lastName = lastName;

    const birthDate = new Date();
    birthDate.setFullYear(new Date().getFullYear() - Age);

    member.birthDate = birthDate;
    member.email = Email;
    member.direction = Direction;
    member.sex = Sex === 'M' ? 'Male' : 'Female';
    member.education = Education;
    member.universityAverageScore = UniversityAverageScore;
    member.mathScore = MathScore * 10;
    member.address = Address;
    member.mobilePhone = Validator.parsePhoneByMask(MobilePhone, '+999 (99) 99-99-99');
    member.skype = Skype;
    member.startDate = new Date(StartDate);

    return member;
  }

  static async getMembers() {
    const members = (await axios.get(path.join(Client.apiPath, 'profiles'), { headers: Client.defaultHeaders })).data;

    const membersObject = {};
    members.forEach((member) => {
      membersObject[member.UserId] = Client.createMembersObject(member);
    });
    return membersObject;
  }

  static postMember(
    Name,
    LastName,
    Email,
    Direction,
    Sex,
    Education,
    BirthDate,
    UniversityAverageScore,
    MathScore,
    Address,
    MobilePhone,
    Skype,
    StartDate,
  ) {
    return axios.post(path.join(Client.apiPath, 'create'), {
      headers: Client.defaultHeaders,
      body: {
        Name,
        LastName,
        Email,
        DirectionId: Client.directions.indexOf(Direction) + 1,
        Sex: Sex === 'Male' ? 'M' : 'F',
        Education,
        BirthDate: Validator.fromDateToMask(BirthDate, 'yyyy-MM-dd'),
        UniversityAverageScore: parseFloat(UniversityAverageScore),
        MathScore: MathScore / 10.0,
        Address,
        MobilePhone: MobilePhone.replace(/[^0-9+]/g, ''),
        Skype,
        StartDate: Validator.fromDateToMask(StartDate, 'yyyy-MM-dd'),
      },
    });
  }

  static editMember(
    UserId,
    Name,
    LastName,
    Email,
    Direction,
    Sex,
    Education,
    BirthDate,
    UniversityAverageScore,
    MathScore,
    Address,
    MobilePhone,
    Skype,
    StartDate,
  ) {
    return axios.put(
      path.join(Client.apiPath, 'profile', 'edit', { headers: Client.defaultHeaders, body: UserId.toString() }),
      {
        Name,
        LastName,
        Email,
        DirectionId: Client.directions.indexOf(Direction) + 1,
        Sex: Sex === 'Male' ? 'M' : 'F',
        Education,
        BirthDate: Validator.fromDateToMask(BirthDate, 'yyyy-MM-dd'),
        UniversityAverageScore: parseFloat(UniversityAverageScore),
        MathScore: MathScore / 10.0,
        Address,
        MobilePhone: MobilePhone.replace(/[^0-9+]/g, ''),
        Skype,
        StartDate: Validator.fromDateToMask(StartDate, 'yyyy-MM-dd'),
      },
    );
  }

  static createTasksObject(tasksResponse) {
    const { TaskId, Name, Description, StartDate, DeadlineDate } = tasksResponse;
    const tasks = {};
    tasks.id = TaskId.toString();
    tasks.taskId = TaskId;
    tasks.taskName = Name;
    tasks.taskDescription = Description;
    tasks.taskStart = new Date(StartDate);
    tasks.taskDeadline = new Date(DeadlineDate);
    return tasks;
  }

  static async getTasks() {
    const tasks = (await axios.get(path.join(Client.apiPath, 'tasks'), { headers: Client.defaultHeaders })).data;

    const tasksObject = {};
    await Promise.all(
      tasks.map(async (task) => {
        tasksObject[task.TaskId] = Client.createTasksObject(task);
        tasksObject[task.TaskId].assignedTo = await this.getAssigned(task.TaskId);
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
      await axios.get(path.join(Client.apiPath, 'user', 'tasks', userId), { headers: Client.defaultHeaders })
    ).data;
    const userTasksObject = {};

    userTasks.forEach((userTask) => {
      userTasksObject[userTask.TaskId.toString() + userTask.UserId.toString()] = Client.createUserTasksObject(userTask);
    });
    return userTasksObject;
  }

  static assignTask(taskId, usersIds) {
    return axios.post(path.join(Client.apiPath, 'user', 'task', 'add', taskId.toString()), {
      headers: Client.defaultHeaders,
      body: usersIds,
    });
  }

  static async getAssigned(taskId) {
    const allUsers = await this.getMembers();
    const assignedTo = [];
    let userTasks;

    await Promise.all(
      Object.entries(allUsers).map(async ([userId, user]) => {
        userTasks = await this.getUserTasks(userId);
        Object.values(userTasks).forEach((userTask) => {
          if (userTask.taskId === taskId) {
            assignedTo.push({ userId, firstName: user.firstName, lastName: user.lastName, memberTaskId: userTask.id });
          }
        });
      }),
    );
    return assignedTo;
  }

  static editTask(TaskId, Name, Description, StartDate, DeadlineDate) {
    return axios.put(path.join(Client.apiPath, 'task', 'edit'), {
      TaskId,
      Name,
      Description,
      StartDate: Validator.fromDateToMask(StartDate, 'yyyy-MM-dd'),
      DeadlineDate: Validator.fromDateToMask(DeadlineDate, 'yyyy-MM-dd'),
    });
  }

  static postTask(Name, Description, StartDate, DeadlineDate) {
    let data = {
      Name,
      Description,
      StartDate: Validator.fromDateToMask(StartDate, 'yyyy-MM-dd'),
      DeadlineDate: Validator.fromDateToMask(DeadlineDate, 'yyyy-MM-dd'),
    };
    return axios.post(path.join(Client.apiPath, 'task', 'create'), { headers: Client.defaultHeaders, body: data }).data;
  }

  static setUserTaskState(TaskId, UserId, Status) {
    const StatusId = (Client.states.indexOf(Status) + 1).toString();
    return axios.put(path.join(Client.apiPath, 'user', 'task'), {
      TaskId: TaskId.toString(),
      UserId: UserId.toString(),
      StatusId,
    });
  }

  static deleteMember(userId) {
    return axios.delete(path.join(Client.apiPath, 'profile', 'delete', userId), { headers: Client.defaultHeaders });
  }

  static deleteTask(taskId) {
    return axios.delete(path.join(Client.apiPath, 'task', 'delete', taskId), { headers: Client.defaultHeaders });
  }

  static async unassignTask(taskId, userIds) {
    const userTasks = [];
    const allUsers = Object.keys(await Client.getMembers());
    let foundTasks;
    await Promise.all(
      allUsers.map(async (userId) => {
        foundTasks = Object.values(await Client.getUserTasks(userId.toString())).filter(
          ({ taskId: candidateTaskId }) => {
            return taskId === candidateTaskId;
          },
        );
        if (foundTasks.length) {
          userTasks.push(...foundTasks);
        }
      }),
    );

    // await Client.deleteTask(taskId.toString());
    let createdTask = false;
    console.log(userTasks);
    await Promise.all(
      Object.values(userTasks).map(async (userTask) => {
        console.log(userTask);
        if (userIds.indexOf(userTask.userId) < 0) {
          const { userId, taskName, taskDescription, taskStart, taskDeadline, state } = userTask;
          if (!createdTask) {
            createdTask = true;
            await Client.postTask(taskName, taskDescription, taskStart, taskDeadline);
          }
          await Client.setUserTaskState(taskId.toString(), userId.toString(), state);
        }
      }),
    );
    await Client.assignTask(taskId, arraysSubtraction(allUsers, userIds));
  }

  static async checkToken(token) {
    return true;
  }

  static signIn() {
    return 'token';
  }

  static async getUserInfoByToken(token) {
    return { role: 'admin', userId: '0' };
  }
}

export default Client;
