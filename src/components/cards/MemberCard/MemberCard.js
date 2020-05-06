import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '../../elements/Button';
import MemberInfo from '../../elements/MemberInfo';
import Modal from '../../elements/Modal';
import { ReactComponent as ProgressIcon } from '../../../assets/icons/Progress.svg';
import { ReactComponent as TasksIcon } from '../../../assets/icons/Tasks.svg';
import CollapsableCard from '../CollapsableCard';
import DateBadge from '../../elements/DateBadge';
import TextBadge from '../../elements/TextBadge';
import DialogButton from '../../elements/DialogButton';
import Client from '../../../helpers/Client';
import store from '../../../redux';
import { deleteMember } from '../../../redux/actions/membersActions';
import calculateAge from '../../../helpers/calculateAge';
import compareObjects from '../../../helpers/compareObjects';
import dateTypes from '../../../helpers/dateTypes';
import matchMaxWidth from '../../../helpers/matchMaxWidth';

const MemberCard = (props) => {
  const {
    id,
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
    role,
    collapsed,
    open,
    close,
    edit: editDefault,
  } = props;

  const age = calculateAge(birthDate);
  const modal = useRef({});

  const [edit, setEdit] = useState(editDefault);

  const editOff = () => {
    setEdit(false);
  };

  const closeEditModal = () => {
    setEdit(false);
    modal.current.handleClose();
  };

  const showEditModal = () => {
    modal.current.handleShow();
    setEdit(true);
  };

  const showModal = () => {
    modal.current.handleShow();
  };

  const onDelete = ({ dialogValue }) => {
    store.dispatch(deleteMember(dialogValue));
    return Client.deleteMember(dialogValue);
  };

  return (
    <>
      <CollapsableCard id={id} cardClass='member' collapsed={collapsed} open={open} close={close}>
        <CollapsableCard.Header>
          <CollapsableCard.Title>
            <b>{firstName}</b>
            {` ${lastName}, ${age}`}
          </CollapsableCard.Title>
          <>
            {matchMaxWidth('1000px') || (
              <>
                <DateBadge date={startDate} type={dateTypes.startDate} />
              </>
            )}
          </>
          <>
            {matchMaxWidth('550px') || (
              <>
                <TextBadge>{direction}</TextBadge>
              </>
            )}
          </>
        </CollapsableCard.Header>
        <CollapsableCard.Body>
          <Button classMod='primary' link={`/members/${id}/progress`}>
            <ProgressIcon className='icon-progress' />
            <span>Progress</span>
          </Button>
          <Button classMod='primary' link={`/members/${id}/tasks`}>
            <TasksIcon className='icon-tasks' />
            <span>Tasks</span>
          </Button>
          {role === 'admin' && (
            <>
              {matchMaxWidth('550px') || (
                <>
                  <DialogButton
                    buttonClassMod='secondary'
                    buttonContent='Delete'
                    message={
                      <>
                        Are you confident, you want to delete member <b>{firstName}</b> <b>{lastName}</b>?
                      </>
                    }
                    confirmButtonClassMod='error'
                    confirmButtonContent='Delete'
                    dialogValue={id}
                    onSubmit={onDelete}
                  />
                  <Button content='Edit' classMod='secondary' onClick={showEditModal} />
                </>
              )}
            </>
          )}
          <Button content='More info' classMod='ghost' onClick={showModal} />
        </CollapsableCard.Body>
      </CollapsableCard>
      <Modal ref={modal} className='member-info' onClose={editOff}>
        <MemberInfo
          edit={edit}
          setEdit={showEditModal}
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
          handleClose={closeEditModal}
          role={role}
        />
      </Modal>
    </>
  );
};

const { handleClose, edit, setEdit, ...memberInfoPTypes } = MemberInfo.propTypes;

MemberCard.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  ...memberInfoPTypes,
};

export default React.memo(MemberCard, compareObjects);
