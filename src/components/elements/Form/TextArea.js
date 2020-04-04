import React from 'react';
import PropTypes from 'prop-types';

function TextArea(props) {
  const { id, name, description, onInput, onChange, required, attributes, value, minSymbols, maxSymbols } = props;

  function checkCount(input, min, max) {
    return input.length <= max && input.length >= min;
  }

  return (
    <textarea
      id={id}
      className='form-textarea'
      name={name}
      onInput={(event) => {
        if (checkCount(event.target.value, 0, maxSymbols)) {
          onInput(event);
        } else {
          alert('Bad input'); //TODO temp
        }
      }}
      onBlur={(event) => {
        if (checkCount(event.target.value, minSymbols, maxSymbols)) {
          onChange(event);
        } else {
          alert('Bad input'); //TODO temp
        }
      }}
      required={required}
      {...attributes}
      value={value}
    >
      {description}
    </textarea>
  );
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  attributes: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.any,
  minSymbols: PropTypes.number,
  maxSymbols: PropTypes.number,
};

export default TextArea;
