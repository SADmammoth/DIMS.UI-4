import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import Input from './Input';
import notify from '../../../helpers/notify';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {}, // Store values of inputs (for internal use)
      inputs: {}, // Store inputs components (for external use)
    };
  }

  componentDidMount() {
    if (!checkNames(Object.values(this.props.inputs))) {
      throw Error('Inputs names repeat'); // TODO
    }

    this.createValues();
    this.createInputs();
  }

  compareObjects(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.values['mobilePhone']);
    console.log(prevState.values, this.state.values);
    if (
      !this.compareObjects(prevProps.inputs, this.props.inputs) ||
      Object.keys(this.state.values).length !== this.props.inputs.length ||
      !this.compareObjects(prevState.values, this.state.values)
    ) {
      this.createValues();
      this.createInputs();
    }
  }

  getInput(name) {
    return this.state.input[name];
  }

  updateValue = (name, value) => {
    const { values } = this.state;
    values[name].value = value;

    this.setState({ values });
    this.createInputs();
  };

  //* Create values
  createValue(id, type, name) {
    this.setState((state) => ({ ...state, values: { ...state.values, [name]: { type, id } } }));
  }

  createValues() {
    const values = {};
    this.props.inputs.forEach((input) => {
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
    attributes,
    value,
    valueOptions,
    minSymbols,
    maxSymbols,
  ) {
    return (
      <Input
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
        value={value}
        minSymbols={minSymbols}
        maxSymbols={maxSymbols}
        mask={mask}
        maskType={maskType}
        invalid={invalid}
      />
    );
  }

  createInputs() {
    const { values } = this.state;
    console.log(values['mobilePhone'] && values['mobilePhone'].value);
    const { inputs, onInputsUpdate } = this.props;
    if (!Object.keys(values).length) {
      return;
    }

    const inputsData = {};
    inputs.forEach((input, i) => {
      const {
        type,
        name,
        description,
        required,
        label,
        attributes,
        byCharValidator,
        validator,
        valueOptions,
        minSymbols,
        maxSymbols,
        mask,
        maskType,
      } = input;

      inputsData[name] = Form.createInput(
        values[name].id,
        type,
        name,
        description,
        this.updateValue, // onInput
        this.updateValue, // onChange
        mask,
        maskType,
        validator,
        byCharValidator,
        required,
        label,
        attributes,
        values[name].value,
        valueOptions,
        minSymbols,
        maxSymbols,
        !!values[name].invalid,
      );
    });

    onInputsUpdate(inputsData);

    this.setState({ inputs: inputsData });
  }
  // * -end- Create Inputs

  // * Format values to pass to onSubmit
  formatValues() {
    const values = {};
    Object.entries(this.state.values).forEach(({ name, valueItem }) => {
      values[name] = valueItem.value;
    });
    return values;
  }

  errorNotification(description, message) {
    notify('error', `${description} invalid input`, message);
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
    for (let valueName in values) {
      let input = findInputByName(valueName);
      if (!values[valueName].value || (input.validator && !input.validator(values[valueName].value))) {
        this.highlightInput(valueName);
        showMessage(input.label || input.description, input.validationMessage);
        return false;
      }
    }
    return true;
  };

  onSubmit = (event) => {
    if (this.checkValidity(this.errorNotification)) {
      if (onSubmit) {
        event.preventDefault();
        onSubmit(this.formatValues());
      }
    } else {
      event.preventDefault();
    }
  };

  render() {
    const { method, action, className, style, submitButton, children } = this.props;
    return (
      <>
        <form
          method={method}
          action={action}
          className={`form ${className}` || ''}
          style={{ ...style }}
          onSubmit={this.onSubmit}
        >
          {children || Object.values(this.state.inputs)}
          {React.cloneElement(submitButton, { type: 'submit' })}
        </form>
      </>
    );
  }
}

function checkNames(inputs) {
  return !inputs.every((input, index) => inputs.slice(index + 1).find((anotherInput) => input.name === anotherInput));
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

const { onSubmit, onInput, ...inputProps } = Input.propTypes;

Form.propTypes = {
  method: PropTypes.string,
  action: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      ...inputProps,
      validationMessage: PropTypes.string,
    }),
  ).isRequired,
  onSubmit: PropTypes.func,
  submitButton: PropTypes.element,
  children: PropTypes.arrayOf(PropTypes.element),

  // Passed in order to get inputs components
  onInputsUpdate: PropTypes.func,
};

export default Form;
