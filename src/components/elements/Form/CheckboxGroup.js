import React from 'react';
import PropTypes from 'prop-types';

function CheckboxGroup(props) {
  function renderCheckbox(value, { valueOptions, value: commonValue, id, type, onInput, onChange, ...attributes }) {
    let values = typeof commonValue === 'object' ? commonValue : commonValue.split(',');

    return (
      <div className='form-group'>
        <input
          id={id + value}
          type={type}
          className={`form-${type}`}
          value={value}
          onClick={(event) => {
            if (event.target.checked) {
              values.push(event.target.value);
            } else {
              values = values.filter((value) => value !== event.target.value);
            }
            event.target.value = values;
            onInput(event);
          }}
          {...attributes}
          checked={values === value || values.includes(value)}
        />
        <label htmlFor={id + value}>{value}</label>
      </div>
    );
  }

  function renderCheckboxes() {
    return props.valueOptions.map((value) => renderCheckbox(value, props));
  }

  return (
    <div id={props.id + props.type} className={`${props.type}-group`}>
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
