/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { withRouter } from 'react-router-dom';
import shortid from 'shortid';
import Client from '../helpers/Client';

class MembersManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { members: [] };
  }

  async componentDidMount() {
    this.setState({ members: await Client.getMembers() });
  }

  renderMembers() {
    console.log(this.state.members);
    if (this.state.members.length < 1) {
      return null;
    }
    return (
      <ul className='grid no-type-list'>
        {this.state.members.map((el) => (
          <li className='gridItem' key={shortid.generate()}>
            {this.renderMember(el)}
          </li>
        ))}
      </ul>
    );
  }

  renderMember({ fullName, direction, education, startDate, age }) {
    return (
      <>
        <div>
          <b>Name: </b>
          <span>{fullName}</span>
        </div>
        <div>
          <b>Direction: </b>
          <span>{direction}</span>
        </div>
        <div>
          <b>Education: </b>
          <span>{education}</span>
        </div>
        <div>
          <b>Start date: </b>
          <span>{startDate.toString()}</span>
        </div>
        <div>
          <b>Age: </b>
          <span>{age}</span>
        </div>
      </>
    );
  }

  render() {
    return <>{this.renderMembers()}</>;
  }
}

export default withRouter(MembersManagerPage);
