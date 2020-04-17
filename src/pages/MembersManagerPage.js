import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Client from '../helpers/Client';
import MemberCard from '../components/cards/MemberCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import ContainerComponent from '../components/elements/ContainerComponent';
import Header from '../components/elements/Header';
import Spinner from '../components/elements/Spinner';
import UserContext from '../helpers/UserContext';
import getNavItems from '../helpers/getNavItems';

class MembersManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { members: null };
  }

  async componentDidMount() {
    const membersData = await Client.getMembers();
    console.log(membersData);
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

  static WrappedMemberCard({
    id,
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
    collapsed,
    open,
    close,
  }) {
    return (
      <UserContext.Consumer>
        {({ role }) => {
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
              role={role}
              collapsed={collapsed}
              open={open}
              close={close}
            />
          );
        }}
      </UserContext.Consumer>
    );
  }

  static renderMember(id, data) {
    const WrappedMemberCard = MembersManagerPage.WrappedMemberCard;
    return <WrappedMemberCard id={id} {...data} />;
  }

  render() {
    const { members } = this.state;
    return (
      <>
        <Helmet>
          <title>Members</title>
        </Helmet>
        <UserContext>
          {({ role, userId }) => {
            return (
              <Header role={role} title='Members' navItems={getNavItems({ role, userId }, this.props.match.path)} />
            );
          }}
        </UserContext>
        <ContainerComponent>
          {members ? <CollapsableItemsList items={this.renderMembers()} /> : <Spinner centered />}
        </ContainerComponent>
      </>
    );
  }
}

export default withRouter(MembersManagerPage);
