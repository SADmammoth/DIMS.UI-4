import React from 'react';
import PropTypes from 'prop-types';

import TextBadge from '../../elements/TextBadge';
import DateBadge from '../../elements/DateBadge';

function CollapsedMemberCard(props) {
  const { firstName, lastName, birthDate, direction, startDate, onClick, collapsed } = props;
  const age = new Date().getFullYear() - birthDate.getFullYear();

  return (
    <div className='member-card__header'>
      <p role='menu' className='interactive member-card__header__title' onClick={() => onClick(collapsed)}>
        <b>{firstName}</b>
        {` ${lastName}, ${age}`}
      </p>
      <DateBadge date={startDate} type={DateBadge.DateTypes.startDate} />
      <TextBadge>{direction}</TextBadge>
    </div>
  );
}

CollapsedMemberCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  birthDate: PropTypes.instanceOf(Date).isRequired,
  direction: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  collapsed: PropTypes.bool.isRequired,

  onClick: PropTypes.func.isRequired,
};

function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default React.memo(CollapsedMemberCard, areEqual);
