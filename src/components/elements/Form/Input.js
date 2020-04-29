import React from 'react';
import PropTypes from 'prop-types';
import CheckboxGroup from './CheckboxGroup';
import Select from './Select';
import TextArea from './TextArea';
import errorNotification from '../../../helpers/errorNotification';
import InputMask from './InputMask';

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
    placeholder,
    attributes,
    value,
    byCharValidator,
    validator,
    valueOptions,
    minSymbols,
    maxSymbols,
    mask,
    maskType,
    invalid,
    highlightInput,
    validationMessage,
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

  function renderMask(input) {
    if (mask && mask !== '') {
      return InputMask(input, mask, !byCharValidator, maskType);
    }
    return input;
  }

  const onChangeHandler = (e) => {
    if (!e.target.value) {
      return;
    }
    if (!validator(e.target.value)) {
      highlightInput();
      errorNotification(description, validationMessage);
    }
    onChange(e.target.name, e.target.value);
  };

  const onInputHandler = (e) => {
    onInput(e.target.name, e.target.value);
  };

  const onKeyPressHandler = (e) => {
    if (!byCharValidator(e.target.value + e.key)) {
      e.preventDefault();
    }
  };

  const onError = () => {
    highlightInput();
    errorNotification(description, validationMessage);
  };

  function renderInput() {
    if (type === 'checkbox' || type === 'radio') {
      return renderLabel(
        <CheckboxGroup
          id={id}
          type={type}
          name={name}
          description={description}
          onKeyPress={onKeyPressHandler}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          label={label}
          attributes={attributes}
          value={value}
          valueOptions={valueOptions}
        />,
      );
    }
    if (type === 'select') {
      return renderLabel(
        <Select
          id={id}
          type={type}
          name={name}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          attributes={attributes}
          value={value}
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
          onChange={onChangeHandler}
          onInput={onInputHandler}
          onError={onError}
          required={required}
          attributes={attributes}
          value={value}
          minSymbols={minSymbols}
          maxSymbols={maxSymbols}
        />,
      );
    }

    return renderLabel(
      renderMask(
        <input
          id={id}
          type={type}
          name={name}
          className={`form-control${invalid ? ' invalid' : ''}`}
          placeholder={placeholder}
          required={required ? 'required' : null}
          onKeyPress={onKeyPressHandler}
          onInput={onInputHandler}
          onChange={onChangeHandler}
          {...attributes}
          value={value}
        />,
      ),
    );
  }

  return renderInput();
}

Input.defaultProps = {
  onInput: () => {},
  onChange: () => {},
  required: false,
  label: false,
  placeholder: null,
  attributes: {},
  value: '',
  byCharValidator: () => true,
  validator: () => true,
  minSymbols: 0,
  maxSymbols: 1000,
  highlightInput: () => {},
  validationMessage: '',
};

Input.publicProps = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  placeholder: PropTypes.string,
  attributes: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.any,
  valueOptions: PropTypes.arrayOf(PropTypes.string),
  minSymbols: PropTypes.number,
  maxSymbols: PropTypes.number,
  mask: PropTypes.string,
  maskType: PropTypes.string,
  byCharValidator: PropTypes.func,
  validator: PropTypes.func,
  validationMessage: PropTypes.string,
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  invalid: PropTypes.bool.isRequired,
  highlightInput: PropTypes.func,
  ...Input.publicProps,
};

export default Input;
