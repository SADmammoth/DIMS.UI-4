import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import CollapsedMemberCard from './CollapsedMemberCard';
import MemberInfoModal from '../../modals/MemberInfoModal';

const MemberCard = (props) => {
  const { id } = props;
  let showModal;
  return (
    <>
      {props.collapsed ? (
        <article className='member-card'>
          <CollapsedMemberCard {...props} onClick={() => props.open(id)} />
        </article>
      ) : (
        <article className='member-card_open'>
          <CollapsedMemberCard {...props} onClick={() => props.close(id)} />
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
            <Button content='More info' classMod='ghost' onClick={() => showModal()} />
          </div>
        </article>
      )}
      <MemberInfoModal {...props} bindButton={(cb) => (showModal = cb)} />
    </>
  );
};

MemberCard.propTypes = {
  open: PropTypes.func.isRequired,
  ...CollapsedMemberCard.propTypes,
};

export default MemberCard;
