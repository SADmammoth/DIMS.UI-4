import React from 'react';
import { withRouter } from 'react-router-dom';
import Client from '../helpers/Client';
import MemberTaskCard from '../components/cards/MemberTaskCard/MemberTaskCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';

class MembersTasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = { tasks: {} };
  }

  async componentDidMount() {
    this.getName();
    const taskData = await Client.getUserTasks(this.id);
    this.setState({ tasks: taskData });
  }

  async getName() {
    this.name = (await Client.getMember(this.id)).firstName;
    console.log(await Client.getMember(this.id));
    console.log(this.name);
  }

  renderTask(id, data) {
    return <MemberTaskCard id={id} {...data} />;
  }

  renderTasks() {
    return Object.entries(this.state.tasks).map((el) => this.renderTask(el[0], el[1]));
  }

  render() {
    return (
      <>
        <h1>{`${this.name}'s tasks`}</h1>
        <div>
          {Object.keys(this.state.tasks).length ? (
            <CollapsableItemsList>{this.renderTasks()}</CollapsableItemsList>
          ) : (
            'No tasks'
          )}
        </div>
      </>
    );
  }
}

export default withRouter(MembersTasksPage);
