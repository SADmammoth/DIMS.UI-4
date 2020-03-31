import React from 'react';
import { withRouter } from 'react-router-dom';
import Client from '../helpers/Client';
import TaskTrackCard from '../components/cards/TaskTrackCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import Container from '../components/elements/Container';

class MemberTracksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tracks: {} };
  }

  async componentDidMount() {
    const tracksData = await Client.getTracks(this.props.match.params.id);
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
      return MemberTracksPage.renderTaskTrack(id, data);
    });
  }

  static renderTaskTrack(id, data) {
    const { memberTaskID, taskName, trackNote, trackDate } = data;
    return (
      <TaskTrackCard
        id={id}
        memberTaskID={memberTaskID}
        taskName={taskName}
        trackNote={trackNote}
        trackDate={trackDate}
      />
    );
  }

  render() {
    return (
      <Container>
        <div>
          {Object.keys(this.state.tracks).length ? <CollapsableItemsList items={this.renderTracks()} /> : 'No tracks'}
        </div>
      </Container>
    );
  }
}

export default withRouter(MemberTracksPage);
