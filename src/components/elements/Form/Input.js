import React from 'react';
import PropTypes from 'prop-types';
import CheckboxGroup from './CheckboxGroup';
import SelectInput from './SelectInput';
import TextArea from './TextArea';

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
    minSymbols,
    maxSymbols,
  } = props;

  function renderLabel(input) {
    return label ? (
      <div className='form-group'>
        <label className='form-label' htmlFor={id}>
          {label}
        </label>
        {input}
      </div>
    ) : (
      input
    );
  }

  function renderInput() {
    if (type === 'checkbox' || type === 'radio') {
      return renderLabel(
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
        />,
      );
    }
    if (type === 'select') {
      return renderLabel(
        <SelectInput
          id={id}
          type={type}
          name={name}
          description={description}
          onChange={onChange}
          onInput={onInput}
          required={required}
          attributes={attributes}
          value={value}
          byCharValidator={byCharValidator}
          validator={validator}
          valueOptions={valueOptions}
        />,
      );
    }
    if (type === 'textarea') {
      return renderLabel(
        <TextArea
          id={id}
          name={name}
          description={description}
          onChange={onChange}
          onInput={onInput}
          required={required}
          attributes={attributes}
          value={value}
          minSymbols={minSymbols}
          maxSymbols={maxSymbols}
        />,
      );
    }
    return renderLabel(
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
            alert('Bad input'); //TODO temp
          }
          onChange(e);
        }}
        {...attributes}
        value={value}
      />,
    );
  }

  return renderInput();
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
  minSymbols: PropTypes.number,
  maxSymbols: PropTypes.number,

  byCharValidator: PropTypes.func,
  validator: PropTypes.func,
};

export default Input;
