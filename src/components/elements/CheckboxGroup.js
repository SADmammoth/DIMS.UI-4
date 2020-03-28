import React from 'react';
import PropTypes from 'prop-types';

function CheckboxGroup(props) {
  function renderCheckbox(value, { valueOptions, value: commonValue, id, type, onInput, ...attributes }) {
    return (
      <div className='form-group'>
        <input
          id={id + value}
          type={type}
          className={`form-${type}`}
          value={value}
          onClick={onInput}
          {...attributes}
          checked={props.value === value || props.value.includes(value)}
        />
        <label htmlFor={id + value}>{value}</label>
      </div>
    );
  }

  function renderCheckboxes() {
    return props.valueOptions.map((value) => renderCheckbox(value, props));
  }

  return (
    <div id={props.id} className={`${props.type}-group`}>
      {renderCheckboxes()}
    </div>
  );
}

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  valueOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  attributes: PropTypes.objectOf(PropTypes.string),
};

export default CheckboxGroup;
