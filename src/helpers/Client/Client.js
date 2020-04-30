import axios from 'axios';
import path from 'path';
import Validator from '../Validator';
import compareObjects from '../compareObjects';

class Client {
  static apiPath = process.env.REACT_APP_APIPATH;

  static directions = ['Front-end', '.Net'];

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
    const members = (await axios.get(path.join(Client.apiPath, 'profiles'))).data;

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
    if (
      !Name ||
      !LastName ||
      !Email ||
      !Direction ||
      !Sex ||
      !Education ||
      !BirthDate ||
      !UniversityAverageScore ||
      !MathScore ||
      !Address ||
      !MobilePhone ||
      !Skype ||
      !StartDate
    ) {
      return new Promise();
    }

    return axios.post(path.join(Client.apiPath, 'create'), {
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
    if (
      !UserId ||
      !Name ||
      !LastName ||
      !Email ||
      !Direction ||
      !Sex ||
      !Education ||
      !BirthDate ||
      !UniversityAverageScore ||
      !MathScore ||
      !Address ||
      !MobilePhone ||
      !Skype ||
      !StartDate
    ) {
      return new Promise();
    }

    return axios.put(path.join(Client.apiPath, 'profile', 'edit', UserId.toString()), {
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
    });
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
    const tasks = (await axios.get(path.join(Client.apiPath, 'tasks'))).data;

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
    const userTasks = (await axios.get(path.join(Client.apiPath, 'user', 'tasks', userId))).data;
    const userTasksObject = {};
    console.log(userTasks);
    userTasks.forEach((userTask) => {
      userTasksObject[userTask.TaskId.toString() + userTask.UserId.toString()] = Client.createUserTasksObject(userTask);
    });
    return userTasksObject;
  }

  static assignTask(taskId, usersIds) {
    return axios.post(path.join(Client.apiPath, 'user', 'task', 'add', taskId.toString()), usersIds);
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
    return axios.post(path.join(Client.apiPath, 'task', 'create'), {
      Name,
      Description,
      StartDate: Validator.fromDateToMask(StartDate, 'yyyy-MM-dd'),
      DeadlineDate: Validator.fromDateToMask(DeadlineDate, 'yyyy-MM-dd'),
    });
  }

  static deleteMember(userId) {
    return axios.delete(path.join(Client.apiPath, 'profile', 'delete', userId));
  }

  static async checkToken(token) {
    return true;
  }

  static async getUserInfoByToken(token) {
    return { role: 'admin' };
  }
}

export default Client;
