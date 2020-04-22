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
import { connect } from 'react-redux';

class MembersManagerPage extends React.Component {
  renderMembers() {
    const { members } = this.props;
    console.log(members);
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
    reloadMembers,
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

  static renderMember(id, data, reloadMembers) {
    const WrappedMemberCard = MembersManagerPage.WrappedMemberCard;
    return <WrappedMemberCard id={id} {...data} reloadMembers={reloadMembers} />;
  }

  render() {
    const { members } = this.props;
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

export default withRouter(
  connect((state) => {
    return { members: state.members };
  })(MembersManagerPage),
);
