import React from 'react';
import PropTypes from 'prop-types';

function FlexColumn({ children }) {
  return <div className='flex-column'>{children}</div>;
}

FlexColumn.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default FlexColumn;
