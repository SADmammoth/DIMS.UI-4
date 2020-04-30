import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import notify from '../../../helpers/notify';
import compareObjects from '../../../helpers/compareObjects';
import errorNotification from '../../../helpers/errorNotification';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {}, // Store values of inputs (for internal use)
      inputs: {}, // Store inputs components (for external use)
    };
  }

  componentDidMount() {
    this.createValues();
    this.createInputs();
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputs } = this.props;
    const { values } = this.state;

    if (
      !compareObjects(prevProps.inputs, inputs) ||
      Object.keys(values).length !== inputs.length ||
      !compareObjects(prevState.values, values)
    ) {
      this.createValues();
      this.createInputs();
    }
  }

  getInput(name) {
    const { input } = this.state;
    return input[name];
  }

  updateValue = (name, value) => {
    const { values } = this.state;
    values[name].value = value;

    this.setState({ values });
    this.createInputs();
  };

  //* Create values
  createValue(id, type, name) {
    this.setState((state) => ({
      ...state,
      values: { ...state.values, [name]: { type, id } },
    }));
  }

  createValues() {
    const { inputs } = this.props;
    const values = {};

    inputs.forEach((input) => {
      values[input.name] = {
        id: input.name,
        value: input.value,
      };
    });

    this.setState({ values });
  }
  // * -end- Create values

  // * Create inputs
  static createInput(
    id,
    type,
    name,
    description,
    onInput,
    onChange,
    mask,
    maskType,
    validator,
    byCharValidator,
    required,
    label,
    placeholder,
    attributes,
    value,
    valueOptions,
    minSymbols,
    maxSymbols,
    invalid,
    highlightInput,
    validationMessage,
  ) {
    return (
      <Input
        key={id}
        id={id}
        type={type}
        name={name}
        description={description}
        required={required ? 'required' : null}
        onChange={onChange}
        onInput={onInput}
        validator={validator}
        byCharValidator={byCharValidator}
        attributes={attributes}
        valueOptions={valueOptions}
        label={label}
        placeholder={placeholder}
        value={value}
        minSymbols={minSymbols}
        maxSymbols={maxSymbols}
        mask={mask}
        maskType={maskType}
        invalid={invalid}
        highlightInput={highlightInput}
        validationMessage={validationMessage}
      />
    );
  }

  createInputs() {
    const { values } = this.state;
    const { inputs, onInputsUpdate } = this.props;

    if (!Object.keys(values).length) {
      return;
    }

    const inputsData = {};
    inputs.forEach((input) => {
      const {
        type,
        name,
        description,
        required,
        label,
        placeholder,
        attributes,
        byCharValidator,
        validator,
        valueOptions,
        minSymbols,
        maxSymbols,
        mask,
        maskType,
        validationMessage,
        onChange,
        onInput,
      } = input;

      const higlightInputCallback = () => this.highlightInput(name);

      const onChangeHandler = (inputName, value) => {
        if (onChange) onChange(inputName, value);
        this.updateValue(inputName, value);
      };

      const onInputHandler = (inputName, value) => {
        if (onInput) onInput(inputName, value);
        this.updateValue(inputName, value);
      };

      inputsData[name] = Form.createInput(
        values[name].id,
        type,
        name,
        description,
        onInputHandler, // onInput
        onChangeHandler, // onChange
        mask,
        maskType,
        validator,
        byCharValidator,
        required,
        label,
        placeholder,
        attributes,
        values[name].value,
        valueOptions,
        minSymbols,
        maxSymbols,
        !!values[name].invalid,
        higlightInputCallback,
        validationMessage,
      );
    });

    onInputsUpdate(inputsData);

    this.setState({ inputs: inputsData });
  }
  // * -end- Create Inputs

  // * Format values to pass to onSubmit
  formatValues() {
    const values = {};
    Object.entries(this.state.values).forEach(([name, valueItem]) => {
      values[name] = valueItem.value;
    });
    return values;
  }

  errorNotification(title, message) {
    notify('error', title, message);
  }

  successNotification(title, message) {
    notify('success', title, message);
  }

  highlightInput = (name) => {
    const { values } = this.state;

    values[name].invalid = true;
    this.setState({ values }, () => this.createInputs());
    setTimeout(() => this.unhighlightInput(name), 3000);
  };

  unhighlightInput = (name) => {
    const { values } = this.state;
    values[name].invalid = false;
    this.setState({ values }, () => this.createInputs());
  };

  checkValidity = (showMessage) => {
    const { values } = this.state;
    const findInputByName = (name) => {
      return this.props.inputs.find((input) => input.name === name);
    };
    let input;
    for (let valueName in values) {
      input = findInputByName(valueName);
      if (!values[valueName].value || (input.validator && !input.validator(values[valueName].value))) {
        this.highlightInput(valueName);
        showMessage(`${input.label || input.description} invalid input`, input.validationMessage);
        return false;
      }
    }
    return true;
  };

  onResponseReceived = (response) => {
    if (response) {
      if (response.status === 200) {
        this.successNotification('Success', 'Data sent and accepted by server');
      } else {
        this.errorNotification('Server error', response ? response.toString() : response);
      }
    }
  };

  onResponseError = (error) => {
    this.errorNotification('Server error', error.response ? error.response.data.Message : error.toString());
  };

  onSubmit = (event) => {
    const { onSubmit: onSubmitHandler } = this.props;
    if (this.checkValidity(errorNotification)) {
      if (onSubmitHandler) {
        event.preventDefault();
        onSubmitHandler(this.formatValues())
          .then(this.onResponseReceived)
          .catch(this.onResponseError);
      }
    } else {
      event.preventDefault();
    }
  };

  render() {
    const { method, action, className, style, submitButton, children } = this.props;
    const { inputs } = this.state;
    return (
      <>
        <form
          method={method}
          action={action}
          className={`form ${className}` || ''}
          style={{ ...style }}
          onSubmit={this.onSubmit}
        >
          {children || Object.values(inputs)}
          {React.cloneElement(submitButton, { type: 'submit' })}
        </form>
      </>
    );
  }
}

Form.defaultProps = {
  method: 'GET',
  action: '/',
  className: '',
  style: {},
  onSubmit: null,
  submitButton: <button type='submit'>Submit</button>,
  onInputsUpdate: (inputs) => inputs,
};

Form.propTypes = {
  method: PropTypes.string,
  action: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      ...Input.publicProps,
      validationMessage: PropTypes.string,
    }),
  ).isRequired,
  onSubmit: PropTypes.func,
  submitButton: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  // Passed in order to get inputs components
  onInputsUpdate: PropTypes.func,
};

export default Form;

// TODO Implement required fields
