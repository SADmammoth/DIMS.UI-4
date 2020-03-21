import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as FlagIcon } from '../../assets/icons/flag.svg';
import { ReactComponent as TaskDateIcon } from '../../assets/icons/TaskDate.svg';

function DateBadge(props) {
  const { date, type } = props;
  let Icon;
  switch (type) {
    case 'startDate':
      Icon = <FlagIcon title='Start date' className='icon-flag common-text-color' />;
      break;
    case 'endDate':
      Icon = <FlagIcon title='End date' className='icon-flag error-color' />;
      break;
    case 'trackStart':
      Icon = <TaskDateIcon title='Track start date' className='icon-taskdate common-text-color' />;
      break;
    case 'trackSuccess':
      Icon = <TaskDateIcon title='Track success date' className='icon-taskdate success-color' />;
      break;
    case 'trackFail':
      Icon = <TaskDateIcon title='Track fail date' className='icon-taskdate fail-color' />;
      break;
    default:
      Icon = null;
  }
  return (
    <p className='date-badge'>
      {Icon}
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
