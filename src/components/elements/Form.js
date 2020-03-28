import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import Input from './Input';

class Form extends React.Component {
  static createInput(
    id,
    type,
    name,
    description,
    onInput,
    onChange,
    validator,
    byCharValidator = () => {},
    required = false,
    label = false,
    attributes = [],
    value = undefined,
    valueOptions = [],
  ) {
    return (
      <Input
        id={id}
        type={type}
        name={name}
        placeholder={description}
        required={required ? 'required' : null}
        onChange={onChange}
        onInput={onInput}
        validator={validator}
        byCharValidator={byCharValidator}
        attributes={attributes}
        valueOptions={valueOptions}
        label={label}
        value={value}
      />
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      values: {},
      inputs: {},
    };
  }

  componentDidMount() {
    if (!this.checkNames()) {
      throw Error('Inputs names repeat');
    }
    this.createValues();
    this.createInputs();
  }

  componentDidUpdate() {
    if (Object.values(this.state.values).length !== Object.values(this.props.inputs).length) {
      this.createValues();
    }
    if (Object.values(this.props.inputs).length !== Object.values(this.state.inputs).length) {
      this.createInputs();
    }
  }

  getInput(name) {
    return this.state.input[name];
  }

  updateValue = (event) => {
    const { values } = this.state;

    console.log(values[event.target.getAttribute('name')]);
    values[event.target.getAttribute('name')].value = event.target.value;
    this.createValues();
    this.createInputs();
    this.setState({ values });
  };

  createValue(id, type, name) {
    this.setState((state) => ({ ...state, values: { ...state.values, [name]: { type, id } } }));
  }

  createValues() {
    const values = {};
    this.props.inputs.forEach((input) => {
      values[input.name] = {
        type: input.type,
        id: input.name + faker.random.alphaNumeric(8),
        value: input.value,
      };
    });
    this.setState({ values });
  }

  createInputs() {
    const { values } = this.state;
    const { inputs, onInputsUpdate } = this.props;
    if (Object.keys(values).length === 0) {
      return null;
    }

    const inputsData = {};
    inputs.forEach((input, i) => {
      const { type, name, description, required, label, attributes, byCharValidator, validator, valueOptions } = input;
      inputsData[name] = Form.createInput(
        Object.values(values)[i].id,
        type,
        name,
        description,
        this.updateValue,
        this.updateValue,
        validator,
        byCharValidator,
        required,
        label,
        attributes,
        Object.values(values)[i].value,
        valueOptions,
      );
    });
    onInputsUpdate(inputsData);
    this.setState({ inputs: inputsData });
  }

  formatValues() {
    const values = {};
    Object.entries(this.state.values).forEach(({ name, valueItem }) => {
      values[name] = valueItem.value;
    });
    return values;
  }

  checkNames() {
    const inputs = Object.values(this.props.inputs);
    return !inputs.every((input, index) => inputs.slice(index + 1).find((anotherInput) => input.name === anotherInput));
  }

  render() {
    const { method, action, className, style, onSubmit, submitButton } = this.props;
    return (
      <>
        <form
          method={method}
          action={action}
          className={`form ${className}` || ''}
          style={{ ...style }}
          onSubmit={(event) => {
            if (onSubmit) {
              event.preventDefault();
              if (event.target.checkValidity()) {
                onSubmit(this.formatValues());
              }
            }
          }}
        >
          {this.props.children && this.props.children.length ? this.props.children : Object.values(this.state.inputs)}
          {React.cloneElement(submitButton, {
            type: 'submit',
          })}
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

const { onSubmit, onInput, ...inputProps } = Input.propTypes;

Form.propTypes = {
  method: PropTypes.string,
  action: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      ...inputProps,
    }),
  ).isRequired,
  onSubmit: PropTypes.func,
  submitButton: PropTypes.element,
  onInputsUpdate: PropTypes.func,
};

export default Form;
