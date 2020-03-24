import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as FlagIcon } from '../../assets/icons/flag.svg';
import { ReactComponent as TaskDateIcon } from '../../assets/icons/TaskDate.svg';

function DateBadge(props) {
  const { date, type } = props;
  const dateTypes = {
    startDate: <FlagIcon title='Start date' className='icon-flag common-text-color' />,
    endDate: <FlagIcon title='End date' className='icon-flag error-color' />,
    trackStart: <TaskDateIcon title='Track start date' className='icon-taskdate common-text-color' />,
    trackSuccess: <TaskDateIcon title='Track success date' className='icon-taskdate success-color' />,
    trackFails: <TaskDateIcon title='Track fail date' className='icon-taskdate fail-color' />,
  };

  return (
    <p className='date-badge'>
      {dateTypes[type]}
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
