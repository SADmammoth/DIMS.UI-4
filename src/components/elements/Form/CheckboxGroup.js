import React from 'react';
import PropTypes from 'prop-types';

function CheckboxGroup(props) {
  //! Renders both checkbox and radio buttons groups

  function renderCheckbox(value, { value: commonValue, id, type, name, onInput, attributes }) {
    //* 'value' variable is 'value' property of current checkbox
    /*
     * 'commonValue' is value of checkbox group by name, means array or string
     * consists of values of checked checkboxes  */

    let values = typeof commonValue === 'string' ? commonValue.split(',') : commonValue;

    return (
      <div className='form-group'>
        <input
          id={id + value}
          name={name}
          type={type}
          className={`form-${type}`}
          value={value}
          onClick={(event) => {
            if (type === 'checkbox') {
              if (event.target.checked) {
                values.push(event.target.value);
              } else {
                values = values.filter((value) => value !== event.target.value);
              }
              event.target.value = values;
            }
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

  const { type, id } = props;

  return (
    <div id={id + type} className={`${type}-group`}>
      {renderCheckboxes()}
    </div>
  );
}

CheckboxGroup.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,

  // String of array for checkbox and string for radio
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

  // List of buttons values in group
  valueOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  attributes: PropTypes.objectOf(PropTypes.string),
};

export default CheckboxGroup;
