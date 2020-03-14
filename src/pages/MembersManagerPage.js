import React from 'react';
import { withRouter } from 'react-router-dom';
import Client from '../helpers/Client';
import MemberCard from '../components/cards/MemberCard';

class MembersManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { members: [], open: -1 };
  }

  async componentDidMount() {
    this.setState({
      members: (await Client.getMembers()).map((el) => {
        el.collapsed = true;
        return el;
      }),
    });
  }

  onOpen = (id) => {
    const members = [...this.state.members];
    if (this.state.open + 1) {
      members[this.state.open].collapsed = true;
    }
    members[id].collapsed = false;
    this.setState({ members: members, open: id });
  };

  renderMembers() {
    if (this.state.members.length < 1) {
      return null;
    }
    return (
      <ul className='grid no-type-list'>
        {this.state.members.map((el, i) => (
          <li key={el.fullName} className='gridItem'>
            {this.renderMember(i, el)}
          </li>
        ))}
      </ul>
    );
  }

  renderMember(index, data) {
    // { fullName, direction, education, startDate, age }
    return (
      <>
        <MemberCard id={index} onOpen={this.onOpen} {...data} />
      </>
    );
  }

  render() {
    return <>{this.renderMembers()}</>;
  }
}

export default withRouter(MembersManagerPage);
