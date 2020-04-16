import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../elements/Button';
import MemberInfo from '../../elements/MemberInfo';
import Modal from '../../elements/Modal';

import { ReactComponent as ProgressIcon } from '../../../assets/icons/Progress.svg';
import { ReactComponent as TasksIcon } from '../../../assets/icons/Tasks.svg';
import CollapsableCard from '../CollapsableCard';
import DateBadge from '../../elements/DateBadge';
import DirectionBadge from '../../elements/DirectionBadge/DirectionBadge';
import DialogButton from '../../elements/DialogButton';

class MemberCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { edit: false };

    this.modal = React.createRef();
  }

  closeEditModal = () => {
    this.setState({ edit: false });
    this.modal.current.handleClose();
  };

  showEditModal = () => {
    this.modal.current.handleShow();
    this.setState({ edit: true });
  };

  showModal = () => {
    this.modal.current.handleShow();
  };

  editModal = (bool) => this.setState({ edit: !!bool });

  render() {
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
      open,
      close,
    } = this.props;

    const age = new Date().getFullYear() - birthDate.getFullYear();

    return (
      <>
        <CollapsableCard id={id} cardClass='member' collapsed={collapsed} open={open} close={close}>
          <CollapsableCard.Header>
            <CollapsableCard.Title>
              <b>{firstName}</b>
              {` ${lastName}, ${age}`}
            </CollapsableCard.Title>
            <DateBadge date={startDate} type={DateBadge.DateTypes.startDate} />
            <DirectionBadge direction={direction} />
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
            <DialogButton
              buttonClassMod='secondary'
              buttonContent='Delete'
              message={
                <p>
                  Are you confident, you want to delete member <b>{firstName}</b> <b>{lastName}</b>?
                </p>
              }
              confirmButtonClassMod='error'
              confirmButtonContent='Delete'
              dialogValue={id}
              onSubmit={({ dialogValue }) => console.log(dialogValue)}
            />
            <Button content='Edit' classMod='secondary' onClick={this.showEditModal} />
            <Button content='More info' classMod='ghost' onClick={this.showModal} />
          </CollapsableCard.Body>
        </CollapsableCard>
        <Modal ref={this.modal} className='member-info'>
          <MemberInfo
            edit={this.state.edit}
            setEdit={this.editModal}
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
            handleClose={this.handleClose}
          />
        </Modal>
      </>
    );
  }
}

const { handleClose, edit, setEdit, ...memberInfoPTypes } = MemberInfo.propTypes;

MemberCard.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  ...memberInfoPTypes,
};

export default MemberCard;
