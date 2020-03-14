import faker from 'faker';
import firebase from 'firebase';

class Client {
  static db = null;

  static async getMembers() {
    let members = await Client.db.collection('members').get();
    let membersObject = {};
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
