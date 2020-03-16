import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import CollapsedMemberCard from './CollapsedMemberCard';
import MemberInfoModal from '../../modals/MemberInfoModal';

class MemberCard extends React.Component {
  onClick = () => {
    if (this.props.collapsed) {
      this.props.open(this.props.id);
    }
  };

  render() {
    const { id } = this.props;

    return (
      <>
        {this.props.collapsed ? (
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
                <span>Tasks</span>
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

MemberCard.propTypes = {
  open: PropTypes.func.isRequired,
  ...CollapsedMemberCard.propTypes,
};

export default MemberCard;
