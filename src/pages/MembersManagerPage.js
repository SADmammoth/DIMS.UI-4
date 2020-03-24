import React from 'react';
import { withRouter } from 'react-router-dom';
import Client from '../helpers/Client';
import MemberCard from '../components/cards/MemberCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import Container from '../components/elements/Container';

class MembersManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { members: {} };
  }

  async componentDidMount() {
    const membersData = await Client.getMembers();
    this.setState({
      members: membersData,
    });
  }

  renderMembers() {
    const { members } = this.state;
    if (!Object.keys(members).length) {
      return [];
    }

    return Object.entries(members).map((member) => {
      //TODO
      const id = member[0];
      const data = member[1];
      return MembersManagerPage.renderMember(id, data);
    });
  }

  static renderMember(id, data) {
    const {
      firstName,
      lastName,
      email,
      startDate,
      direction,
      mobilePhone,
      skype,
      address,
      sex,
      birthDate,
      education,
      universityAverageScore,
      mathScore,
    } = data;

    return (
      <MemberCard
        id={id}
        firstName={firstName}
        lastName={lastName}
        birthDate={birthDate}
        direction={direction}
        startDate={startDate}
        email={email}
        mobilePhone={mobilePhone}
        skype={skype}
        address={address}
        sex={sex}
        education={education}
        universityAverageScore={universityAverageScore}
        mathScore={mathScore}
      />
    );
  }

  render() {
    return (
      <Container>
        <CollapsableItemsList items={this.renderMembers()} />
      </Container>
    );
  }
}

export default withRouter(MembersManagerPage);
