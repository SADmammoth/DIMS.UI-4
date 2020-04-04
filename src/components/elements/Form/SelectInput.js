import React from 'react';
import PropTypes from 'prop-types';

function SelectInput(props) {
  function renderOption(value) {
    return <option value={value}>{value}</option>;
  }

  return (
    <select className='form-select' {...props}>
      {props.valueOptions.map((value) => renderOption(value))}
    </select>
  );
}

SelectInput.propTypes = {
  valueOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectInput;
