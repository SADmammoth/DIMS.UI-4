import React from 'react';
import { withRouter } from 'react-router-dom';
import Client from '../helpers/Client';
import MemberCard from '../components/cards/MemberCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';

class MembersManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { members: {} };
  }

  async componentDidMount() {
    let membersData = await Client.getMembers();
    this.setState({
      members: membersData,
    });
  }

  renderMembers() {
    const { members } = this.state;
    if (members.length < 1) {
      return null;
    }
    return Object.entries(members).map((el) => this.renderMember(el[0], el[1]));
  }

  renderMember(id, data) {
    // { id, fullName, direction, education, startDate, age }

    return <MemberCard id={id} {...data} />;
  }

  render() {
    return (
      <>
        <CollapsableItemsList>{this.renderMembers()}</CollapsableItemsList>
      </>
    );
  }
}

export default withRouter(MembersManagerPage);
