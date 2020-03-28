import React from 'react';
import PropTypes from 'prop-types';
import Validator from '../../helpers/Validator';
import CheckboxGroup from './CheckboxGroup';
import SelectInput from './SelectInput';

function Input(props) {
  const {
    id,
    type,
    name,
    description,
    onChange,
    onInput,
    required,
    label,
    attributes,
    value,
    byCharValidator,
    validator,
    valueOptions,
  } = props;

  function renderLabel(input) {
    return label ? (
      <div className='form-group'>
        <label className='form-label' htmlFor={id}>
          {label}
        </label>
      </div>
    ) : (
      input
    );
  }

  return type === 'checkbox' || type === 'radio' ? (
    <CheckboxGroup
      id={id}
      type={type}
      name={name}
      description={description}
      onChange={onChange}
      onInput={onInput}
      required={required}
      label={label}
      attributes={attributes}
      value={value}
      byCharValidator={byCharValidator}
      validator={validator}
      valueOptions={valueOptions}
    />
  ) : type === 'select' ? (
    <SelectInput
      id={id}
      type={type}
      name={name}
      description={description}
      onChange={onChange}
      onInput={onInput}
      required={required}
      label={label}
      attributes={attributes}
      value={value}
      byCharValidator={byCharValidator}
      validator={validator}
      valueOptions={valueOptions}
    />
  ) : (
    renderLabel(
      <input
        id={id}
        type={type}
        name={name}
        className='form-control'
        placeholder={description}
        required={required ? 'required' : null}
        onKeyPress={(e) => {
          console.log(e.target.value + e.key, byCharValidator(e.target.value + e.key));
          if (!byCharValidator(e.target.value + e.key)) {
            e.preventDefault();
          }
        }}
        onInput={onInput}
        onBlur={(e) => {
          if (e.target.value === '') {
            return;
          }
          if (!validator(e.target.value)) {
            alert('Bad input');
          }
          onChange(e);
        }}
        {...attributes}
        value={value}
      />,
    )
  );
}

Input.defaultProps = {
  description: '',
  onChange: () => {},
  required: false,
  label: false,
  attributes: [],
  value: '',
  byCharValidator: () => true,
  validator: () => true,
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  label: PropTypes.string,
  attributes: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.any,
  valueOptions: PropTypes.arrayOf(PropTypes.string),

  byCharValidator: PropTypes.func,
  validator: PropTypes.func,
};

export default Input;
