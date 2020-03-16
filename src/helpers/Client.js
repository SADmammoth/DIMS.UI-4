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
        (membersObject[el.id].startDate = new Date(membersObject[el.id].startDate.seconds * 1000))
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
//     members = members.map(() => ({
//       fullName: faker.name.findName(),
//       email: faker.internet.email(),
//       sex: faker.helpers.randomize(['Male', 'Female']),
//       direction: faker.helpers.randomize(['Java', 'Frontend', '.Net', 'Saleforce']),
//       education: faker.company.companyName(),
//       startDate: faker.date.recent(),
//       universityAverageScore: faker.finance.amount(5, 10, 1),
//       address: `${faker.address.city()}, ${faker.address.streetAddress()} ${faker.address.secondaryAddress()}`,
//       mobilePhone: `+375 ${faker.phone.phoneNumberFormat(1)}`,
//       skype: `live:${faker.internet.userName()}`,
//       age: faker.random.number({ min: 18, max: 45 }),
//     }));
//     Promise.all(members.forEach((el) => Client.db.collection('members').add(el)));
//   }
