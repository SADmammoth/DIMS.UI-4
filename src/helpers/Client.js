import faker from 'faker';
import firebase from 'firebase';

class Client {
  static db = null;

  static async getMembers() {
    const members = await Client.db.collection('members').get();
    const membersObject = {};
    members.docs.forEach(
      (el) => (
        (membersObject[el.id] = el.data()),
        (membersObject[el.id].startDate = new Date(membersObject[el.id].startDate.seconds * 1000)),
        (membersObject[el.id].birthDate = new Date(membersObject[el.id].birthDate.seconds * 1000))
      ),
    );
    return new Promise((resolve) => resolve(membersObject));
  }

  static async getUserTasks(userID) {
    const members = await Client.db
      .collection('tasks')
      .where('userID', '==', userID)
      .get();
    const membersObject = {};
    members.docs.forEach(
      (el) => (
        (membersObject[el.id] = el.data()),
        (membersObject[el.id].taskStart = new Date(membersObject[el.id].taskStart.seconds * 1000)),
        (membersObject[el.id].taskDeadline = new Date(membersObject[el.id].taskDeadline.seconds * 1000))
      ),
    );
    return new Promise((resolve) => resolve(membersObject));
  }

  static async getMember(userId) {
    let member = await Client.db
      .collection('members')
      .doc(userId)
      .get();
    return new Promise((resolve) => resolve(member.data()));
  }

  static async getUserProgress(userID) {
    const members = await Client.db
      .collection('progress')
      .where('userID', '==', userID)
      .get();
    const membersObject = {};
    members.docs.forEach(
      (el) => (
        (membersObject[el.id] = el.data()),
        (membersObject[el.id].trackDate = new Date(membersObject[el.id].trackDate.seconds * 1000))
      ),
    );
    return new Promise((resolve) => resolve(membersObject));
  }
}
const projectId = process.env.REACT_APP_FIREBASE_PROJECTID;
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId: projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

firebase.initializeApp(config);
Client.db = firebase.firestore();

export default Client;

// let members = new Array(10).fill(null);
// members = members.map(() => ({
//   firstName: faker.name.firstName(),
//   lastName: faker.name.lastName(),
//   email: faker.internet.email(),
//   sex: faker.helpers.randomize(['Male', 'Female']),
//   direction: faker.helpers.randomize(['Java', 'Frontend', '.Net', 'Saleforce']),
//   education: faker.company.companyName(),
//   startDate: faker.date.recent(),
//   universityAverageScore: faker.finance.amount(5, 10, 1),
//   address: `${faker.address.city()}, ${faker.address.streetAddress()} ${faker.address.secondaryAddress()}`,
//   mobilePhone: `+375 ${faker.phone.phoneNumberFormat(1)}`,
//   skype: `live:${faker.internet.userName()}`,
//   birthDate: faker.date.past(20, new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)),
//   mathScore: faker.random.number({ min: 50, max: 100 }),
// }));
// Promise.all(members.forEach((el) => Client.db.collection('members').add(el)));

// let members = new Array(5).fill(null);
//     const generateTaskName = () => {
//       let taskName = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
//       return taskName.charAt(0).toUpperCase() + taskName.slice(1);
//     };
//     let startDate;
//     members = members.map(() => ({
//       userID: userID,
//       taskName: generateTaskName(),
//       taskDescription: faker.lorem.paragraph(faker.random.number({ min: 1, max: 5 })),
//       taskStart: ((startDate = faker.date.recent()), startDate),
//       taskDeadline: faker.date.future(0, startDate),
//       state: faker.helpers.randomize(['Active', 'Fail', 'Success']),
//     }));
//     Promise.all(members.forEach((el) => Client.db.collection('tasks').add(el)));

// let members = new Array(5).fill(null);
// const generateTaskName = () => {
//   let taskName = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
//   return taskName.charAt(0).toUpperCase() + taskName.slice(1);
// };
// let startDate;
// members = members.map(async () => ({
//   userID: userID,
//   userName: (await Client.getMember(userID)).firstName,
//   taskName: generateTaskName(),
//   trackNote: faker.lorem.paragraph(faker.random.number({ min: 1, max: 5 })),
//   trackDate: ((startDate = faker.date.recent()), startDate),
// }));
// Promise.all(members.forEach(async (el) => Client.db.collection('progress').add(await el)));
