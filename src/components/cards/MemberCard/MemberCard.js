import React from 'react';
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
import dispatchAndFetch from '../../../redux/middleware/dispatchAndFetch';
import store from '../../../redux';
import { deleteMember } from '../../../redux/actions/membersActions';
import calculateAge from '../../../helpers/calculateAge';
import compareObjects from '../../../helpers/compareObjects';

class MemberCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { edit: false };

    this.modal = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !compareObjects(this.props, nextProps) || !compareObjects(this.state, nextState);
  }

  editOff = () => {
    this.setState({ edit: false });
  };

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
    } = this.props;

    const age = calculateAge(birthDate);

    return (
      <>
        <CollapsableCard id={id} cardClass='member' collapsed={collapsed} open={open} close={close}>
          <CollapsableCard.Header>
            <CollapsableCard.Title>
              <b>{firstName}</b>
              {` ${lastName}, ${age}`}
            </CollapsableCard.Title>
            <DateBadge date={startDate} type={DateBadge.DateTypes.startDate} />
            <TextBadge>{direction}</TextBadge>
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
                  onSubmit={({ dialogValue }) => {
                    store.dispatch(deleteMember(dialogValue));
                    return Client.deleteMember(dialogValue);
                  }}
                />
                <Button content='Edit' classMod='secondary' onClick={this.showEditModal} />
              </>
            )}
            <Button content='More info' classMod='ghost' onClick={this.showModal} />
          </CollapsableCard.Body>
        </CollapsableCard>
        <Modal ref={this.modal} className='member-info' onClose={this.editOff}>
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
            handleClose={this.closeEditModal}
            role={role}
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
  collapsed: PropTypes.bool.isRequired,
  ...memberInfoPTypes,
};

export default MemberCard;
