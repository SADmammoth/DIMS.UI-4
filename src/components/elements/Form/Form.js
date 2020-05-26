import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import notify from '../../../helpers/notify';
import compareObjects from '../../../helpers/compareObjects';
import errorNotification from '../../../helpers/errorNotification';
import findInputByName from '../../../helpers/findInputByName';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {}, // Store values of inputs (for internal use)
      inputs: {}, // Store inputs components (for external use)
    };
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputs } = this.props;
    const { values } = this.state;

    if (
      !compareObjects(prevProps.inputs, inputs) ||
      Object.keys(values).length !== inputs.length ||
      !compareObjects(prevState.values, values)
    ) {
      this.update();
    }
  }

  update() {
    this.createValues();
    this.createInputs();
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
        defaultValue:
          this.state.values[input.name] &&
          (this.state.values[input.name].defaultValue || (input.defaultValue && [...input.defaultValue])),
      };
    });

    this.setState({ values });
  }
  // * -end- Create values

  // * Create inputs
  createInput(props) {
    return <Input key={props.id} {...props} />;
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
        if (onChange) {
          onChange(inputName, value);
        }
        this.updateValue(inputName, value);
      };

      const onInputHandler = (inputName, value) => {
        if (onInput) {
          onInput(inputName, value);
        }
        this.updateValue(inputName, value);
      };

      inputsData[name] = this.createInput({
        id: values[name].id,
        type,
        name,
        description,
        onInput: onInputHandler,
        onChange: onChangeHandler,
        mask,
        maskType,
        validator,
        byCharValidator,
        required,
        label,
        placeholder,
        attributes,
        value: values[name].value,
        valueOptions,
        minSymbols,
        maxSymbols,
        invalid: !!values[name].invalid,
        highlightInput: higlightInputCallback,
        validationMessage,
      });

      onInputsUpdate(inputsData);

      this.setState({ inputs: inputsData });
    });
  }
  // * -end- Create Inputs

  // * Format values to pass to onSubmit
  formatValues() {
    const values = {};
    const { values: stateValues } = this.state;
    Object.entries(stateValues).forEach(([name, valueItem]) => {
      values[name] = valueItem.value;

      values[name] = valueItem.value;
      if (valueItem.defaultValue) {
        values[`${name}_default`] = valueItem.defaultValue;
      }
    });
    return values;
  }

  successNotification(title, message) {
    const { showNotifications } = this.props;
    if (showNotifications === 'all') {
      notify('success', title, message);
    }
  }

  errorNotification(title, message) {
    console.trace();
    const { showNotifications } = this.props;

    if (showNotifications !== 'hideAll') {
      notify('error', title, message);
    }
  }

  onValidationFail(input) {
    this.highlightInput(input.name);
    errorNotification(input.description || input.label || input.name, input.validationMessage);
    return false;
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

  checkValidity = () => {
    const { values } = this.state;
    const { inputs } = this.props;

    let input;
    for (let valueName in values) {
      input = findInputByName(inputs, valueName);
      if (values[valueName].required && !values[valueName].value) {
        this.onValidationFail(input);
      }
      if (input.validator && !input.validator(values[valueName].value)) {
        this.onValidationFail(input);
      }
    }
    return true;
  };

  onResponseReceived = (response) => {
    if (response) {
      if (response.status) {
        if (response.status === 200) {
          this.successNotification('Success', 'Data sent and accepted by server');
        } else {
          this.errorNotification('Server error', response && response.toString());
        }
      } else {
        this.errorNotification('Form error', response && response.toString());
      }
    }
  };

  onResponseError = (error) => {
    this.errorNotification('Server error', error.response ? error.response.data.Message : error.toString());
  };

  onSubmit = (event) => {
    const { onSubmit: onSubmitHandler } = this.props;
    if (onSubmitHandler === null) {
      event.preventDefault();
      return;
    }
    if (onSubmitHandler) {
      event.preventDefault();
    }
    if (this.checkValidity()) {
      if (onSubmitHandler) {
        onSubmitHandler(this.formatValues())
          .then(this.onResponseReceived)
          .catch(this.onResponseError);
      }
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
  submitButton: <></>,
  onInputsUpdate: (inputs) => inputs,
  showNotifications: 'all',
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
  showNotifications: PropTypes.oneOf(['all', 'errorsOnly', 'hideAll']),
  defaultValue: PropTypes.array,
};

export default Form;
