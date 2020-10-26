import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as FlagIcon } from '../../assets/icons/flag.svg';
import { ReactComponent as TaskDateIcon } from '../../assets/icons/TaskDate.svg';
import dateTypes from '../../helpers/dateTypes';

function DateBadge(props) {
  const { date, type } = props;

  const DateTypes = {
    startDate: <FlagIcon title='Start date' className='icon-flag common-text-color' />,
    endDate: <FlagIcon title='End date' className='icon-flag error-color' />,
    trackStart: <TaskDateIcon title='Track start date' className='icon-taskdate common-text-color' />,
    trackSuccess: <TaskDateIcon title='Track success date' className='icon-taskdate success-color' />,
    trackFail: <TaskDateIcon title='Track fail date' className='icon-taskdate fail-color' />,
  };

  return (
    <p className='date-badge'>
      {DateTypes[type]}
      {date.toLocaleDateString()}
    </p>
  );
}

DateBadge.defaultProps = {
  type: '',
};

DateBadge.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  type: PropTypes.oneOf(Object.values(dateTypes)),
};

export default DateBadge;
