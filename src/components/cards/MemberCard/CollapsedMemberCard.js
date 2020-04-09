import React from 'react';
import PropTypes from 'prop-types';

import DirectionBadge from '../../elements/DirectionBadge';
import DateBadge from '../../elements/DateBadge';

function CollapsedMemberCard(props) {
  // TODO
  const { firstName, lastName, birthDate, direction, startDate, onClick } = props;
  const age = new Date().getFullYear() - birthDate.getFullYear();

  return (
    <div className='member-card__header'>
      <p role='menu' className='interactive member-card__header__title' onClick={onClick}>
        <b>{firstName}</b>
        {` ${lastName}, ${age}`}
      </p>
      <DateBadge date={startDate} type='startDate' />
      <DirectionBadge direction={direction} />
    </div>
  );
}

CollapsedMemberCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  birthDate: PropTypes.instanceOf(Date).isRequired,
  direction: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,

  onClick: PropTypes.func.isRequired,
};

export default CollapsedMemberCard;
