import axios from 'axios';
import path from 'path';
import md5 from 'md5';
import firebase from 'firebase';
import Validator from './Validator';
firebase.initializeApp(config);

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

  static async checkToken(token) {
    return true;
  }

  static async getUserInfoByToken(token) {
    return { role: 'admin' };
  }
}

export default Client;
