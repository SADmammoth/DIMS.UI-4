import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  const { valueOptions, name, value: currentValue, placeholder, onChange } = props;

  function renderOption(valueOption) {
    return (
      <option key={name + valueOption.value} value={valueOption.value}>
        {valueOption.label}
      </option>
    );
  }

  return (
    <select className='form-select' name={name} value={currentValue.value || null} onChange={onChange}>
      {placeholder && (
        <option disabled selected='selected'>
          {placeholder}
        </option>
      )}
      {valueOptions.map((value) => renderOption(value))}
    </select>
  );
}

Select.propTypes = {
  value: PropTypes.any,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  valueOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
