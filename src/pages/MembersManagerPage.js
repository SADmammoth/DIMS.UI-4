import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Client from '../helpers/Client';
import MemberCard from '../components/cards/MemberCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import ContainerComponent from '../components/elements/ContainerComponent';
import Header from '../components/elements/Header';

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

    return Object.entries(members).map(({ 0: id, 1: data }) => {
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
      <>
        <Helmet>
          <title>Members</title>
        </Helmet>
        <Header>
          <h1>Members</h1>
        </Header>
        <ContainerComponent>
          <CollapsableItemsList items={this.renderMembers()} />
        </ContainerComponent>
      </>
    );
  }
}

export default withRouter(MembersManagerPage);
