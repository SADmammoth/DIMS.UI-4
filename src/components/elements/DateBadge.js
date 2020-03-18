import React from 'react';
import PropTypes from 'prop-types';

function DateBadge(props) {
  const { date, type } = props;
  let iconClass;
  switch (type) {
    case 'startDate':
      iconClass = 'icon-flag';
      break;
    case 'endDate':
      iconClass = 'icon-flag error-color';
      break;
    case 'trackStart':
      iconClass = 'icon-taskdate';
      break;
    case 'trackSuccess':
      iconClass = 'icon-taskdate success-color';
      break;
    case 'trackFail':
      iconClass = 'icon-taskdate error-color';
      break;
    default:
      iconClass = null;
  }
  return (
    <p className='date-badge'>
      {iconClass && <i className={iconClass} />}
      {date.toLocaleDateString()}
    </p>
  );
}

DateBadge.defaultProps = {
  type: 'startDate',
};

DateBadge.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  type: PropTypes.oneOf(['startDate', 'endDate', 'trackStart', 'trackSuccess', 'trackFail']),
};

export default DateBadge;
