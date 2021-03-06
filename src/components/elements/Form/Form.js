import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import notify from '../../../helpers/formHelpers/notify';
import compareObjects from '../../../helpers/compareObjects';
import errorNotification from '../../../helpers/formHelpers/errorNotification';
import formatFormValues from '../../../helpers/formHelpers/formatFormValues';
import validateForm from '../../../helpers/formHelpers/validateForm';
import setFormDefaultValue from '../../../helpers/formHelpers/setFormDefaultValue';
import createInput from './createInput';

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

  createValue(id, type, name) {
    this.setState((state) => ({
      ...state,
      values: { ...state.values, [name]: { type, id } },
    }));
  }

  createValues() {
    const { inputs } = this.props;
    const { values } = this.state;
    const valuesData = {};

    inputs.forEach((input) => {
      valuesData[input.name] = {
        id: input.name,
        value: input.value,
        defaultValue: setFormDefaultValue(values, input),
      };
    });

    this.setState({ values: valuesData });
  }

  createInputs() {
    const { values } = this.state;
    const { inputs, onInputsUpdate } = this.props;

    if (!Object.keys(values).length) {
      return;
    }

    const inputsData = {};
    inputs.forEach(
      ({
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
      }) => {
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

        inputsData[name] = createInput({
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
      },
    );
  }
  // * -end- Create Inputs

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

  onSubmit = (event) => {
    const { values } = this.state;
    const { onSubmit: onSubmitHandler, inputs } = this.props;
    if (onSubmitHandler === null) {
      event.preventDefault();
      return;
    }

    if (onSubmitHandler) {
      event.preventDefault();
    }

    if (validateForm(values, inputs, this.onValidationFail)) {
      if (onSubmitHandler) {
        onSubmitHandler(formatFormValues(values));
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
