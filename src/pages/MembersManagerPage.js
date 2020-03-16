import React from 'react';
import { withRouter } from 'react-router-dom';
import Client from '../helpers/Client';
import MemberCard from '../components/cards/MemberCard';

class MembersManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { members: {}, open: null };
  }

  async componentDidMount() {
    let membersData = await Client.getMembers();
    Object.keys(membersData).forEach((key) => (membersData[key].collapsed = true));
    this.setState({
      members: membersData,
    });
  }

  open = (id) => {
    const members = { ...this.state.members };
    const { open } = this.state;
    if (open) {
      members[open].collapsed = true;
    }
    members[id].collapsed = false;

    this.setState({ members, open: id });
  };

  renderMembers() {
    const { members } = this.state;
    if (members.length < 1) {
      return null;
    }
    return (
      <ul className='grid list_no-type'>
        {Object.entries(members).map((el) => (
          <li key={el[0]} className='grid__item'>
            {this.renderMember(el[0], el[1])}
          </li>
        ))}
      </ul>
    );
  }

  renderMember(id, data) {
    // { id, fullName, direction, education, startDate, age }

    return (
      <>
        <MemberCard id={id} open={this.open} {...data} />
      </>
    );
  }

  render() {
    return <>{this.renderMembers()}</>;
  }
}

export default withRouter(MembersManagerPage);
