import React from 'react';
import PropTypes from 'prop-types';

function Spinner(props) {
  const { centered } = props;
  return <div className={`spinner${centered ? ' spinner_centered' : ''}`} />;
}

Spinner.defaultProps = {
  centered: false,
};

Spinner.propTypes = {
  centered: PropTypes.bool,
};

export default Spinner;
