import React from 'react';
import PropTypes from 'prop-types';

import DirectionBadge from '../../elements/DirectionBadge';
import DateBadge from '../../elements/DateBadge';

function CollapsedMemberCard(props) {
  const { fullName, age, direction, startDate, onClick } = props;
  const names = fullName.match(/^([^\s]*)\s([^\s]*)/);

  return (
    <div className='member-card__header'>
      <button type='button' className='member-card__header__title' onClick={onClick}>
        <b>{names[1]}</b>
        {` ${names[2]}, ${age}`}
      </button>
      <DateBadge date={startDate} type='startDate' />
      <DirectionBadge direction={direction} />
    </div>
  );
}

CollapsedMemberCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CollapsedMemberCard;
