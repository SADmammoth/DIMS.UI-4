import faker from 'faker';

export default class Client {
  static getMembers() {
    let members = new Array(faker.random.number({ min: 1, max: 10 })).fill(null);
    members = members.map(() => ({
      fullName: faker.name.findName(),
      direction: faker.helpers.randomize(['Java', 'Frontend', '.Net', 'Saleforce']),
      education: faker.company.companyName(),
      startDate: faker.date.recent(),
      age: faker.random.number({ min: 18, max: 45 }),
    }));
    return new Promise((resolve) => resolve(members));
  }
}
