import React from 'react';
import PropTypes from 'prop-types';
import checkboxValueSeparator from '../../../helpers/checkboxValueSeparator';

function CheckboxGroup(props) {
  function renderCheckbox(valueOption, { value: commonValue, id, type, name, onChange, attributes }) {
    //* 'value' variable is 'value' property of current checkbox
    /*
     * 'commonValue' is value of checkbox group by name, means array or string
     * consists of values of checked checkboxes  */
    const values = checkboxValueSeparator(commonValue);

    const onClick = (event) => {
      if (type === 'checkbox') {
        const { checked, value } = event.target;
        if (checked) {
          values.push(value);
        } else {
          values.splice(values.indexOf(value), 1);
        }
        event.target.value = values;
        onChange(event);
      }
    };

    return (
      <div className='form-group'>
        <input
          id={id + valueOption.value}
          name={name}
          type={type}
          className={`form-${type}`}
          value={valueOption.value}
          onClick={onClick}
          {...attributes}
          checked={values === valueOption.value || values.includes(valueOption.value)}
        />
        <label htmlFor={id + valueOption.value}>{valueOption.label}</label>
      </div>
    );
  }

  function renderCheckboxes() {
    return props.valueOptions.map((valueOption) => renderCheckbox(valueOption, props));
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
  valueOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  description: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  attributes: PropTypes.objectOf(PropTypes.string),
};

export default CheckboxGroup;
