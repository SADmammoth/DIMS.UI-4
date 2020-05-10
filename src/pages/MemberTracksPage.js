import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import Client from '../helpers/Client';
import TaskTrackCard from '../components/cards/TaskCards/TaskTrackCard';
import CollapsableItemsConditionalList from '../components/lists/CollapsableItemsConditionalList';
import ContainerComponent from '../components/elements/ContainerComponent';
import Header from '../components/elements/Header';
import Spinner from '../components/elements/Spinner/Spinner';
import UserContextConsumer from '../helpers/components/UserContextConsumer';
import getNavItems from '../helpers/getNavItems';
import Footer from '../components/elements/Footer';

class MemberTracksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tracks: null };
  }

  async componentDidMount() {
    const { match } = this.props;
    const tracksData = await Client.getTracks(match.params.id);
    this.setState({
      tracks: tracksData,
    });
  }

  renderTracks() {
    const { tracks } = this.state;
    if (!Object.keys(tracks).length) {
      return [];
    }

    return Object.entries(tracks).map(({ 0: id, 1: data }) => {
      return this.renderTaskTrack(id, data);
    });
  }

  renderTaskTrack(id, data) {
    const { memberTaskId, taskName, trackNote, trackDate } = data;
    return (
      <TaskTrackCard
        id={id}
        memberTaskId={memberTaskId}
        taskName={taskName}
        trackNote={trackNote}
        trackDate={trackDate}
      />
    );
  }

  render() {
    const { tracks } = this.state;
    const { match } = this.props;
    return (
      <>
        <Helmet>
          <title>Task tracks</title>
        </Helmet>
        <UserContextConsumer>
          {({ role, userId }) => {
            return <Header role={role} title='Task tracks' navItems={getNavItems({ role, userId }, match.path)} />;
          }}
        </UserContextConsumer>
        <main>
          <ContainerComponent>
            {tracks ? (
              <CollapsableItemsConditionalList itemsPluralName='tracks' items={this.renderTasks()} />
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

MemberTracksPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string,
  }).isRequired,
};

export default withRouter(MemberTracksPage);
