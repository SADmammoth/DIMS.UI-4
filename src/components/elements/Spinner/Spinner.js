import React from 'react';
import PropTypes from 'prop-types';

function Spinner({ centered }) {
  return <div className={`spinner${centered ? ' spinner_centered' : ''}`} />;
}

Spinner.defaultProps = {
  centered: false,
};

Spinner.propTypes = {
  centered: PropTypes.bool,
};

export default Spinner;
