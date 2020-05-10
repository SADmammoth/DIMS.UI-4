import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import Client from '../../helpers/Client';
import CollapsableItemsConditionalList from '../../components/lists/CollapsableItemsConditionalList';
import ContainerComponent from '../../components/elements/ContainerComponent';
import Header from '../../components/elements/Header';
import Spinner from '../../components/elements/Spinner';
import UserContextConsumer from '../../helpers/components/UserContextConsumer';
import getNavItems from '../../helpers/getNavItems';
import Footer from '../../components/elements/Footer';
import WrappedMemberProgressCard from './WrappedMemberProgressCard';

class MemberProgressPage extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.state = { tasks: null, id: match.params.id };
  }

  async componentDidMount() {
    const { id } = this.state;
    const taskData = await Client.getUserProgress(id);
    this.setState({ tasks: taskData });
  }

  renderProgressCard(id, data) {
    return <WrappedMemberProgressCard id={id} {...data} />;
  }

  renderProgress() {
    const { tasks } = this.state;
    return Object.entries(tasks).map(({ 0: id, 1: data }) => {
      return this.renderProgressCard(id, data);
    });
  }

  render() {
    const { tasks } = this.state;
    const { match } = this.props;
    const anytask = (tasks && Object.values(tasks)[0]) || {};

    return (
      <>
        <Helmet>{`${anytask.userName || 'Name'}'s progress`}</Helmet>
        <UserContextConsumer>
          {({ role, userId }) => {
            return (
              <Header
                role={role}
                title={`${anytask.userName || 'Name'}'s progress`}
                navItems={getNavItems({ role, userId }, match.path)}
              />
            );
          }}
        </UserContextConsumer>
        <main>
          <ContainerComponent>
            {tasks ? (
              <CollapsableItemsConditionalList itemsPluralName='progress' items={this.renderProgress()} />
            ) : (
              <Spinner centered />
            )}
          </ContainerComponent>
        </main>
        <Footer />
      </>
    );
  }
}

MemberProgressPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(MemberProgressPage);
