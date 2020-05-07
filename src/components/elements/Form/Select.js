import React from 'react';
import PropTypes from 'prop-types';
import compareObjects from '../../../helpers/compareObjects';

function Select(props) {
  const { valueOptions, name, value: currentValue, placeholder, onChange, required } = props;

  function renderOption(valueOption) {
    return (
      <option key={name + valueOption.value} value={valueOption.value}>
        {valueOption.label}
      </option>
    );
  }

  return (
    <select
      className='form-select'
      name={name}
      value={currentValue.value}
      onChange={onChange}
      required={required && 'required'}
    >
      {placeholder && (
        <option disabled selected='selected'>
          {placeholder}
        </option>
      )}
      {valueOptions.map((value) => renderOption(value))}
    </select>
  );
}

Select.defaultProps = {
  required: false,
};

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

export default React.memo(Select, compareObjects);
