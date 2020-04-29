import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  const { valueOptions, ...restProps } = props;
  function renderOption(value) {
    return (
      <option key={value} value={value}>
        {value}
      </option>
    );
  }

  return (
    <select className='form-select' {...restProps}>
      {valueOptions.map((value) => renderOption(value))}
    </select>
  );
}

Select.propTypes = {
  value: PropTypes.any,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  valueOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
