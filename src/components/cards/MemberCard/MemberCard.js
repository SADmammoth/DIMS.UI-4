import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import CollapsedMemberCard from './CollapsedMemberCard';
import MemberInfoModal from '../../modals/MemberInfoModal';
import { ReactComponent as ProgressIcon } from '../../../assets/icons/Progress.svg';
import { ReactComponent as TasksIcon } from '../../../assets/icons/Tasks.svg';

const MemberCard = (props) => {
  const {
    id,
    collapsed,
    firstName,
    lastName,
    email,
    startDate,
    direction,
    mobilePhone,
    skype,
    address,
    sex,
    birthDate,
    education,
    universityAverageScore,
    mathScore,
  } = props;

  let showModal;

  return (
    <>
      <article className={`member-card${!collapsed ? '_open' : ''}`}>
        <CollapsedMemberCard
          firstName={firstName}
          lastName={lastName}
          birthDate={birthDate}
          direction={direction}
          startDate={startDate}
          onClick={() => (collapsed ? props.open(id) : props.close(id))}
        />
        {collapsed || (
          <div className='member-card__body'>
            <Button classMod='primary' link={`/members/${id}/progress`}>
              <ProgressIcon className='icon-progress' />
              <span>Progress</span>
            </Button>
            <Button classMod='primary' link={`/members/${id}/tasks`}>
              <TasksIcon className='icon-tasks' />
              <span>Tasks</span>
            </Button>
            <Button content='Delete' classMod='secondary' />
            <Button content='Edit' classMod='secondary' />
            <Button content='More info' classMod='ghost' onClick={() => showModal()} />
          </div>
        )}
      </article>
      <MemberInfoModal
        id={id}
        firstName={firstName}
        lastName={lastName}
        birthDate={birthDate}
        direction={direction}
        startDate={startDate}
        email={email}
        mobilePhone={mobilePhone}
        skype={skype}
        address={address}
        sex={sex}
        education={education}
        universityAverageScore={universityAverageScore}
        mathScore={mathScore}
        bindButton={(cb) => {
          showModal = cb;
        }}
      />
    </>
  );
};

const { bindButton, ...MemberCardProps } = MemberInfoModal.propTypes;

MemberCard.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  ...MemberCardProps,
};

export default MemberCard;
