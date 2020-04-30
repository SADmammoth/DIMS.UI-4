import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Client from '../helpers/Client';
import MemberCard from '../components/cards/MemberCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import ContainerComponent from '../components/elements/ContainerComponent';
import Header from '../components/elements/Header';
import Spinner from '../components/elements/Spinner';
import UserContextConsumer from '../helpers/UserContextConsumer';
import getNavItems from '../helpers/getNavItems';
import Footer from '../components/elements/Footer';

class MembersManagerPage extends React.Component {
  WrappedMemberCard({
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
      <UserContextConsumer>
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
      </UserContextConsumer>
    );
  }

  renderMembers() {
    const { members } = this.props;
    if (!Object.keys(members).length) {
      return [];
    }

    return Object.entries(members).map(({ 0: id, 1: data }) => {
      return this.renderMember(id, data);
    });
  }

  renderMember(id, data) {
    const WrappedMemberCard = this.WrappedMemberCard;
    return <WrappedMemberCard id={id} {...data} />;
  }

  render() {
    const { members } = this.props;
    return (
      <>
        <Helmet>
          <title>Members</title>
        </Helmet>
        <UserContextConsumer>
          {({ role, userId }) => {
            return (
              <Header role={role} title='Members' navItems={getNavItems({ role, userId }, this.props.match.path)} />
            );
          }}
        </UserContextConsumer>
        <main>
          <ContainerComponent>
            {members ? <CollapsableItemsList items={this.renderMembers()} /> : <Spinner centered />}
          </ContainerComponent>
        </main>
        <Footer />
      </>
    );
  }
}

MembersManagerPage.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(
  connect((state) => {
    return { members: state.members };
  })(MembersManagerPage),
);
