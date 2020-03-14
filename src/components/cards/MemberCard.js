import React from 'react';
import PropTypes from 'prop-types';
import DirectionBadge from '../elements/DirectionBadge';
import DateBadge from '../elements/DateBadge';
import Button from '../elements/Button';

class MemberCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: this.props.collapsed };
  }

  onClick = () => {
    if (this.state.collapsed) {
      this.props.onOpen(this.props.id);
    }

    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { fullName, age, direction, startDate } = this.props;
    const names = fullName.match(/^([^\s]*)\s([^\s]*)/);
    return this.state.collapsed ? (
      <article onClick={this.onClick}>
        <div>
          <p>
            <b>{names[1]}</b>
            {` ${names[2]}, ${age}`}
          </p>
          <DirectionBadge direction={direction} />
          <DateBadge date={startDate} />
        </div>
      </article>
    ) : (
      <article onClick={this.onClick}>
        <div>
          <p>
            <b>{names[1]}</b>
            {` ${names[2]}, ${age}`}
          </p>
          <DirectionBadge direction={direction} />
          <DateBadge date={startDate} />
        </div>
        <Button content='Progress' link={`/members/${this.props.id}/progress`} />
        <Button content='Tasks' link={`/members/${this.props.id}/tasks`} />
        <Button content='Edit' />
        <Button content='Delete' />
      </article>
    );
  }
}

MemberCard.defaultProps = {
  collapsed: true,
};

MemberCard.propTypes = {
  id: PropTypes.number.isRequired,
  collapsed: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  fullName: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
};

export default MemberCard;
