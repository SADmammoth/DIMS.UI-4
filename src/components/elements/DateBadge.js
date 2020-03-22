import React from 'react';
import PropTypes from 'prop-types';

function DateBadge(props) {
  const { date, type } = props;
  let iconClass;
  let tooltip;
  switch (type) {
    case 'startDate':
      iconClass = 'icon-flag';
      tooltip = 'Start date';
      break;
    case 'endDate':
      iconClass = 'icon-flag error-color';
      tooltip = 'Deadline';
      break;
    case 'trackStart':
      iconClass = 'icon-taskdate';
      tooltip = 'Track start date';
      break;
    case 'trackSuccess':
      iconClass = 'icon-taskdate success-color';
      tooltip = 'Task success date';
      break;
    case 'trackFail':
      iconClass = 'icon-taskdate error-color';
      tooltip = 'Task fail date';
      break;
    default:
      iconClass = null;
  }
  return (
    <p className='date-badge'>
      {iconClass && <i className={iconClass} title={tooltip} />}
      {date.toLocaleDateString()}
    </p>
  );
}

DateBadge.defaultProps = {
  type: '',
};

DateBadge.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  type: PropTypes.oneOf(['startDate', 'endDate', 'trackStart', 'trackSuccess', 'trackFail']),
};

export default DateBadge;
