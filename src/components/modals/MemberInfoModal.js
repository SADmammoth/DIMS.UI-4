import React from 'react';
import PropTypes from 'prop-types';
import DirectionBadge from '../elements/DirectionBadge';
import DateBadge from '../elements/DateBadge';
import Button from '../elements/Button';
import Modal, { ModalBackface } from './Modal';

class MemberInfoModal extends Modal {
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
    } = this.props;

    return (
      <>
        <article className={`modal ${this.state.show ? 'show' : ''} member-info`}>
          <div className='member-info__header'>
            <Button onClick={this.handleClose}>
              <i className='icon-back' />
            </Button>
            <p className='member-info__title'>
              <b>{firstName}</b>
              {` ${lastName}`}
            </p>
            <DateBadge date={startDate} type='startDate' />
            <DirectionBadge direction={direction} />
          </div>
          <div className='member-info__body'>
            <div className='member-info__contacts'>
              <a href={`mailto:${email}`}>
                <i className='icon-envelope' />
                <span>{email}</span>
              </a>
              <a href={`skype:${skype}`}>
                <i className='icon-skype' />
                {skype}
              </a>
              <a href={`tel:${mobilePhone.replace(/[\s()+]/, '')}`}>
                <i className='icon-mobile' />
                <span>{mobilePhone}</span>
              </a>
            </div>
            <div>
              <p className='address'>
                <i className='icon-address' />
                {address}
              </p>
              <hr />
            </div>
          </div>
          <div className='member-info__additional-info'>
            <div className='flex-column'>
              <div>
                <span className='list-key'>Sex:</span>
                <span>{sex}</span>
              </div>
              <div>
                <span className='list-key'>Birth date:</span>
                <DateBadge date={birthDate} />
              </div>
            </div>
            <div className='flex-column'>
              <div>
                <span className='list-key'>Education:</span>
                <span>{education}</span>
              </div>
              <div>
                <span className='list-key'>University average score:</span>
                <span>{universityAverageScore}</span>
              </div>
              <div>
                <span className='list-key'>CT math score:</span>
                <span>{mathScore}</span>
              </div>
            </div>
          </div>
          <div class='button-block'>
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
          </div>
        </article>
        <ModalBackface />
      </>
    );
  }
}

MemberInfoModal.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  direction: PropTypes.string.isRequired,
  mobilePhone: PropTypes.string.isRequired,
  skype: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  birthDate: PropTypes.instanceOf(Date).isRequired,
  education: PropTypes.string.isRequired,
  universityAverageScore: PropTypes.number.isRequired,
  mathScore: PropTypes.number.isRequired,
  bindButton: PropTypes.func.isRequired,
};

export default MemberInfoModal;
