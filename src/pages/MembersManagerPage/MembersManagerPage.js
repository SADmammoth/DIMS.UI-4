import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CollapsableItemsList from '../../components/lists/CollapsableItemsList';
import ContainerComponent from '../../components/elements/ContainerComponent';
import Header from '../../components/elements/Header';
import Spinner from '../../components/elements/Spinner';
import getNavItems from '../../helpers/getNavItems';
import Footer from '../../components/elements/Footer';
import UserContextConsumer from '../../helpers/components/UserContextConsumer';
import WrappedMemberCard from './WrappedMemberCard';

class MembersManagerPage extends React.Component {
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
  members: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withRouter(
  connect((state) => {
    return { members: state.members };
  })(MembersManagerPage),
);
