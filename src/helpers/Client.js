import firebase from 'firebase';

//* Firebase configuration
const projectId = process.env.REACT_APP_FIREBASE_PROJECTID;
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: `${projectId}.firebaseapsp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

firebase.initializeApp(config);

class Client {
  static db = firebase.firestore();

  static async getMembers() {
    const members = await Client.db.collection('members').get();

    const membersObject = {};
    members.docs.forEach((doc) => {
      membersObject[doc.id] = doc.data();
      membersObject[doc.id].startDate = new Date(membersObject[doc.id].startDate.seconds * 1000);
      membersObject[doc.id].birthDate = new Date(membersObject[doc.id].birthDate.seconds * 1000);
    });
    return membersObject;
  }

  static async getUserTasks(userID) {
    const members = await Client.db
      .collection('tasks')
      .where('userID', '==', userID)
      .get();

    const membersObject = {};
    members.docs.forEach((doc) => {
      membersObject[doc.id] = doc.data();
      membersObject[doc.id].taskStart = new Date(membersObject[doc.id].taskStart.seconds * 1000);
      membersObject[doc.id].taskDeadline = new Date(membersObject[doc.id].taskDeadline.seconds * 1000);
    });

    return membersObject;
  }

  static async getMember(userId) {
    const member = await Client.db
      .collection('members')
      .doc(userId)
      .get();

    return member.data();
  }

  static async getUserProgress(userID) {
    const members = await Client.db
      .collection('progress')
      .where('userID', '==', userID)
      .get();

    const membersObject = {};
    members.docs.forEach((doc) => {
      membersObject[doc.id] = doc.data();
      membersObject[doc.id].trackDate = new Date(membersObject[doc.id].trackDate.seconds * 1000);
    });

    return membersObject;
  }
}

export default Client;
