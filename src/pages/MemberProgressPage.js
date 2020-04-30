import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Client from '../helpers/Client';
import MemberProgressCard from '../components/cards/TaskCards/MemberProgressCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import ContainerComponent from '../components/elements/ContainerComponent';
import Header from '../components/elements/Header';
import Spinner from '../components/elements/Spinner/Spinner';
import UserContextConsumer from '../helpers/UserContextConsumer';
import getNavItems from '../helpers/getNavItems';
import Footer from '../components/elements/Footer';

class MemberProgressPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: null, id: this.props.match.params.id };
  }

  async componentDidMount() {
    const { id } = this.state;
    const taskData = await Client.getUserProgress(id);
    this.setState({ tasks: taskData });
  }

  WrappedMemberProgressCard({ id, taskId, taskName, trackNote, trackDate, collapsed, open, close }) {
    return (
      <UserContextConsumer>
        {({ role }) => {
          return (
            <MemberProgressCard
              id={id}
              taskId={taskId}
              taskName={taskName}
              trackNote={trackNote}
              trackDate={trackDate}
              collapsed={collapsed}
              open={open}
              close={close}
              role={role}
            />
          );
        }}
      </UserContextConsumer>
    );
  }

  renderProgressCard(id, data) {
    const WrappedMemberProgressCard = this.WrappedMemberProgressCard;
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
                navItems={getNavItems({ role, userId }, this.props.match.path)}
              />
            );
          }}
        </UserContextConsumer>
        <main>
          <ContainerComponent>
            {tasks ? (
              <div>
                {Object.keys(tasks).length ? <CollapsableItemsList items={this.renderProgress()} /> : 'No tasks'}
              </div>
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

export default withRouter(MemberProgressPage);
