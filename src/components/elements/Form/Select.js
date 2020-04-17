import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  function renderOption(value) {
    return <option value={value}>{value}</option>;
  }

  return (
    <select className='form-select' name={props.name} value={props.value || null} onChange={props.onChange}>
      <option disabled selected='selected'>
        {props.description}
      </option>
      {props.valueOptions.map((value) => renderOption(value))}
    </select>
  );
}

Select.propTypes = {
  valueOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
