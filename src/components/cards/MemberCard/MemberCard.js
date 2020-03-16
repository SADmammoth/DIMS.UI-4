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
      <article className='member-card_open' onClick={this.onClick}>
        <CollapsedMemberCard {...this.props} />
        <div className='member-card__body'>
          <Button
            content={
              <>
                <i className='icon-progress' /> <span>Progress</span>
              </>
            }
            classMod='primary'
            link={`/members/${id}/progress`}
          />
          <Button
            content={
              <>
                <i className='icon-tasks' /> <span>Progress</span>
              </>
            }
            classMod='primary'
            link={`/members/${id}/tasks`}
          />
          <Button content='Delete' classMod='error' />
          <Button content='Edit' classMod='success' />
          <Button content='More info' classMod='ghost' />
        </div>
      </article>
    );
  }
}

MemberCard.defaultProps = {
  collapsed: true,
};

MemberCard.propTypes = {
  collapsed: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  ...CollapsedMemberCard.propTypes,
};

export default MemberCard;
