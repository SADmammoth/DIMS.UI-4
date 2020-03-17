import React from 'react';
import { withRouter } from 'react-router-dom';
import Client from '../helpers/Client';
import MemberTaskCard from '../components/cards/MemberTaskCard/MemberTaskCard';
import CollapableItemsList from '../components/lists/CollapableItemsList';

class MembersTasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = { tasks: {} };
  }

  async componentDidMount() {
    const taskData = await Client.getUserTasks(this.id);
    this.setState({ tasks: taskData });
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
        <p>{`Member ${this.id} tasks`}</p>
        <div>
          <CollapableItemsList>{this.renderTasks()}</CollapableItemsList>
        </div>
      </>
    );
  }
}

export default withRouter(MembersTasksPage);
