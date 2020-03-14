import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import CollapsedMemberCard from './CollapsedMemberCard';

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
    const { id } = this.props;

    return this.state.collapsed ? (
      <article className='member-card' onClick={this.onClick}>
        <CollapsedMemberCard {...this.props} />
      </article>
    ) : (
      <article onClick={this.onClick}>
        <CollapsedMemberCard {...this.props} />
        <Button content='Progress' link={`/members/${id}/progress`} />
        <Button content='Tasks' link={`/members/${id}/tasks`} />
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
  ...CollapsedMemberCard.propTypes,
};

export default MemberCard;
