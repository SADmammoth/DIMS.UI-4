import axios from 'axios';
import path from 'path';
import Validator from './Validator';

class Client {
  static apiPath = process.env.REACT_APP_APIPATH;

  static directions = ['Front-end', '.Net'];

  static createMembersObject(memberResponse) {
    let member = {};
    const [firstName, lastName] = memberResponse.FullName.split(' ');
    member.firstName = firstName;
    member.lastName = lastName;
    const birthDate = new Date();
    birthDate.setFullYear(new Date().getFullYear() - memberResponse.Age);
    member.birthDate = birthDate;
    member.email = memberResponse.Email;
    member.direction = memberResponse.Direction;
    member.sex = memberResponse.Sex === 'M' ? 'Male' : 'Female';
    member.education = memberResponse.Education;
    member.universityAverageScore = memberResponse.UniversityAverageScore;
    member.mathScore = memberResponse.MathScore * 10;
    member.address = memberResponse.Address;
    member.mobilePhone = Validator.parsePhoneByMask(memberResponse.MobilePhone, '+999 (99) 99-99-99');
    member.skype = memberResponse.Skype;
    member.startDate = new Date(memberResponse.StartDate);
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

    return axios.put(path.join(Client.apiPath, 'profile', 'edit', UserId), {
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

  static deleteMember(userId) {
    return axios.delete(path.join(Client.apiPath, 'profile', 'delete', userId));
  }

  //   static async getUserTasks(userId) {
  //     const tasks = await Client.db
  //       .collection('memberTasks')
  //       .where('userId', '==', userId)
  //       .get();
  //     console.log(tasks.docs.map((el) => el.data()));
  //     const tasksObject = {};
  //     let taskData = {};
  //     await Promise.all(
  //       tasks.docs.map(async (doc) => {
  //         taskData = await Client.db
  //           .collection('tasks')
  //           .doc(doc.data().taskId)
  //           .get();
  //         tasksObject[doc.id] = Object.assign(doc.data(), taskData.data());
  //         tasksObject[doc.id].taskStart = new Date(tasksObject[doc.id].taskStart.seconds * 1000);
  //         tasksObject[doc.id].taskDeadline = new Date(tasksObject[doc.id].taskDeadline.seconds * 1000);
  //       }),
  //     );
  //     console.log(tasksObject);
  //     return tasksObject;
  //   }

  //   static async getMember(userId) {
  //     const member = await Client.db
  //       .collection('members')
  //       .doc(userId)
  //       .get();

  //     return member.data();
  //   }

  //   static async getUserProgress(userId) {
  //     const track = await Client.getTracks(userId);

  //     const progressObject = {};
  //     let userData = {};
  //     console.log(track);
  //     await Promise.all(
  //       Object.entries(track).map(async ([id, data]) => {
  //         const { memberTaskId, ...progressData } = data;
  //         progressObject[id] = progressData;
  //         userData = await Client.db
  //           .collection('members')
  //           .doc(userId)
  //           .get();
  //         progressObject[id].userName = userData.data().firstName;
  //       }),
  //     );
  //     console.log(progressObject);
  //     return progressObject;
  //   }

  //   static async getTasks() {
  //     const tasks = await Client.db.collection('tasks').get();

  //     const tasksObject = {};
  //     let users = [];
  //     let user = {};
  //     await Promise.all(
  //       tasks.docs.map(async (doc) => {
  //         tasksObject[doc.id] = doc.data();
  //         tasksObject[doc.id].taskStart = new Date(tasksObject[doc.id].taskStart.seconds * 1000);
  //         tasksObject[doc.id].taskDeadline = new Date(tasksObject[doc.id].taskDeadline.seconds * 1000);
  //         users = await Client.getAssignedTo(doc.id);
  //         tasksObject[doc.id].assignedTo = await Promise.all(
  //           users.map(async ({ memberTaskId, userId }) => {
  //             user = await Client.getMember(userId);
  //             return { userId, memberTaskId, firstName: user.firstName, lastName: user.lastName };
  //           }),
  //         );
  //         tasksObject[doc.id].id = doc.id;
  //       }),
  //     );
  //     return tasksObject;
  //   }

  //   static async getAssignedTo(taskId) {
  //     const memberTasks = await Client.db
  //       .collection('memberTasks')
  //       .where('taskId', '==', taskId)
  //       .get();
  //     console.log(memberTasks.docs.map((doc) => doc.data()));
  //     return memberTasks.docs.map((doc) => {
  //       return { userId: doc.data().userId, memberTaskId: doc.id };
  //     });
  //   }

  //   static async getTracks(userId) {
  //     const memberTasks = await Client.getUserTasks(userId);
  //     const tracks = await Client.db
  //       .collection('track')
  //       .where('memberTaskId', 'in', Object.keys(memberTasks))
  //       .get();

  //     const tracksObject = {};
  //     tracks.docs.map(async (doc) => {
  //       tracksObject[doc.id] = doc.data();
  //       tracksObject[doc.id].taskId = memberTasks[doc.data().memberTaskId].taskId;
  //       tracksObject[doc.id].taskName = memberTasks[doc.data().memberTaskId].taskName;
  //       tracksObject[doc.id].trackDate = new Date(tracksObject[doc.id].trackDate.seconds * 1000);
  //     });
  //     return tracksObject;
  //   }

  //   static async signIn(login, password) {
  //     const user = await Client.db
  //       .collection('users')
  //       .where('login', '==', login)
  //       .get();
  //     if (user) {
  //       console.log(md5(password), user.docs[0].data().password, user.docs[0].data().password === md5(password));
  //       if (user.docs[0].data().password === md5(password)) {
  //         return {
  //           status: 'success',
  //           found: true,
  //           token: user.docs[0].data().token,
  //           role: user.docs[0].data().role,
  //           userId: user.docs[0].data().userId,
  //         };
  //       }
  //       return { status: 'fail', found: true };
  //     }
  //     return { status: 'fail', found: false };
  //   }

  static async checkToken(token) {
    return true;
  }

  static async getUserInfoByToken(token) {
    return { role: 'admin', userId: '2' };
  }

  //   static async checkToken(token) {
  //     const user = await Client.db
  //       .collection('users')
  //       .where('token', '==', token)
  //       .get();
  //     return !!user.docs.length;
  //   }

  //   static async getUserInfoByToken(token) {
  //     const user = await Client.db
  //       .collection('users')
  //       .where('token', '==', token)
  //       .get();
  //     return { role: user.docs[0].data().role, userId: user.docs[0].data().userId };
  //   }
}

export default Client;
