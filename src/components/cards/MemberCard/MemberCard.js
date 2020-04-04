import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../elements/Button';
import CollapsedMemberCard from './CollapsedMemberCard';
import MemberInfo from '../../elements/MemberInfo';
import Modal from '../../elements/Modal';

import { ReactComponent as ProgressIcon } from '../../../assets/icons/Progress.svg';
import { ReactComponent as TasksIcon } from '../../../assets/icons/Tasks.svg';

class MemberCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
  }

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

    function onClick() {
      if (collapsed) {
        open(id);
      } else {
        close(id);
      }
    }

    const modal = React.createRef();

    return (
      <>
        <article className={`member-card${!collapsed ? '_open' : ''}`}>
          <CollapsedMemberCard
            firstName={firstName}
            lastName={lastName}
            birthDate={birthDate}
            direction={direction}
            startDate={startDate}
            onClick={onClick}
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
              <Button
                content='Edit'
                classMod='secondary'
                onClick={() => {
                  modal.current.handleShow();
                  this.setState({ edit: true });
                }}
              />
              <Button
                content='More info'
                classMod='ghost'
                onClick={() => {
                  modal.current.handleShow();
                }}
              />
            </div>
          )}
        </article>
        <Modal ref={modal} className='member-info'>
          <MemberInfo
            edit={this.state.edit}
            setEdit={(bool) => this.setState(!!bool)}
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
            handleClose={() => {
              this.setState(false);
              modal.current.handleClose();
            }}
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
