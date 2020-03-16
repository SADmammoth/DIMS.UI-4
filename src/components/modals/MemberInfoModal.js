import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DirectionBadge from '../elements/DirectionBadge';
import DateBadge from '../elements/DateBadge';
import Button from '../elements/Button';
import Modal from './Modal';

class MemberInfoModal extends Modal {
  render() {
    const { fullName, email, startDate, direction, mobilePhone, skype } = this.props;

    return (
      <article className={`modal ${this.state.show ? 'show' : ''} member-info`}>
        <div className='member-info__header'>
          <Button content='Back' onClick={this.handleClose} />
          <h1>{fullName}</h1>
          <DirectionBadge direction={direction} />
          <DateBadge date={startDate} type='startDate' />
        </div>
        <div className='member-info__body'>
          <div className='member-info__contacts'>
            <a href={`mailto:${email}`}>
              <i className='icon-envelope' />
              <span>{email}</span>
            </a>
            <a href={`tel:${mobilePhone.replace(/[\s()+]/, '')}`}>
              <i className='icon-mobile' />
              <span>{mobilePhone}</span>
            </a>
            <a href={`skype:${skype}`}></a>
          </div>
        </div>
      </article>
    );
  }
}

MemberInfoModal.propTypes = {
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  direction: PropTypes.string.isRequired,
  mobilePhone: PropTypes.string.isRequired,
  skype: PropTypes.string.isRequired,
  bindButton: PropTypes.func.isRequired,
};

export default MemberInfoModal;
