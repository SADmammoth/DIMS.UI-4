import faker from 'faker';
import Client from './Client';

export default class FirebaseFaker {
  static generateMembers() {
    let members = new Array(10).fill(null);
    members = members.map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      sex: faker.helpers.randomize(['Male', 'Female']),
      direction: faker.helpers.randomize(['Java', 'Frontend', '.Net', 'Saleforce']),
      education: faker.company.companyName(),
      startDate: faker.date.recent(),
      universityAverageScore: faker.finance.amount(5, 10, 1),
      address: `${faker.address.city()}, ${faker.address.streetAddress()} ${faker.address.secondaryAddress()}`,
      mobilePhone: `+375 ${faker.phone.phoneNumberFormat(1)}`,
      skype: `live:${faker.internet.userName()}`,
      birthDate: faker.date.past(20, new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)),
      mathScore: faker.random.number({ min: 50, max: 100 }),
    }));
    Promise.all(members.forEach((el) => Client.db.collection('members').add(el)));
  }

  static generateMemberTasks(userID) {
    let members = new Array(5).fill(null);

    const generateTaskName = () => {
      const taskName = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
      return taskName.charAt(0).toUpperCase() + taskName.slice(1);
    };

    let startDate;

    members = members.map(() => ({
      userID,
      taskName: generateTaskName(),
      taskDescription: faker.lorem.paragraph(faker.random.number({ min: 1, max: 5 })),
      taskStart: (() => {
        startDate = faker.date.recent();
        return startDate;
      })(),
      taskDeadline: faker.date.future(0, startDate),
      state: faker.helpers.randomize(['Active', 'Fail', 'Success']),
    }));

    Promise.all(members.forEach((el) => Client.db.collection('tasks').add(el)));
  }

  static generateProgress(userID) {
    let members = new Array(5).fill(null);

    const generateTaskName = () => {
      const taskName = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
      return taskName.charAt(0).toUpperCase() + taskName.slice(1);
    };

    let startDate;

    members = members.map(async () => ({
      userID,
      userName: (await Client.getMember(userID)).firstName,
      taskName: generateTaskName(),
      trackNote: faker.lorem.paragraph(faker.random.number({ min: 1, max: 5 })),
      trackDate: (() => {
        startDate = faker.date.recent();
        return startDate;
      })(),
    }));

    Promise.all(members.forEach(async (el) => Client.db.collection('progress').add(await el)));
  }
}
