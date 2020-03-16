import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import CollapsedMemberCard from './CollapsedMemberCard';
import MemberInfoModal from '../../modals/MemberInfoModal';

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

    return (
      <>
        {this.state.collapsed ? (
          <article className='member-card'>
            <CollapsedMemberCard {...this.props} onClick={this.onClick} />
          </article>
        ) : (
          <article className='member-card_open'>
            <CollapsedMemberCard {...this.props} onClick={this.onClick} />
            <div className='member-card__body'>
              <Button classMod='primary' link={`/members/${id}/progress`}>
                <i className='icon-progress' />
                <span>Progress</span>
              </Button>
              <Button classMod='primary' link={`/members/${id}/tasks`}>
                <i className='icon-tasks' />
                <span>Progress</span>
              </Button>
              <Button content='Delete' classMod='error' />
              <Button content='Edit' classMod='success' />
              <Button content='More info' classMod='ghost' onClick={() => this.showModal()} />
            </div>
          </article>
        )}
        <MemberInfoModal {...this.props} bindButton={(cb) => (this.showModal = cb)} />
      </>
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
