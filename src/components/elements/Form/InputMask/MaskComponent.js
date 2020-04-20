import React from 'react';
import Validator from '../../../../helpers/Validator';

const escapedCharactersRegex = /([9aAh%#\\])\\(?!\\)/g;
const specialCharactersRegex = /[9aAh%#\\](?!(\\)(?!\\))/g;

function MaskComponent(input, maskArray) {
  if (maskArray[input.props.value.length]) {
    if (!input.props.value || input.props.value === '') {
      return input;
    }
  }
  function setCursorToEndOfInput(eventTarget) {
    const firstPlaceholder = eventTarget.value.indexOf('_');
    eventTarget.setSelectionRange(firstPlaceholder, firstPlaceholder);
  }

  const onClick = (event) => {
    setCursorToEndOfInput(event.target);
  };

  const onFocus = (event) => {
    event.target.value = addMask(event.target.value, maskArray);
  };

  const onKeyDown = (event) => {
    if (event.key.includes('Arrow')) {
      event.preventDefault();
    }
    if (event.key === 'Delete') {
      event.preventDefault();
    }
    if (event.key === 'Backspace') {
      handleBackspaceInMask(event);
    }
  };

  const handleBackspaceInMask = (event) => {
    const { target } = event;
    let { value } = event.target;
    const start = target.selectionStart - 1;
    const end = target.selectionEnd;
    value = value.split('');

    const charactersToDelete = new RegExp(
      `[^${maskArray
        .filter((el, i, arr) => !arr.slice(i + 1).includes(el))
        .join('')
        .replace(specialCharactersRegex, '')
        .replace(escapedCharactersRegex, '$1')}]+`,
      'g',
    );
    value.splice(start, end - start, target.value.substring(start, end).replace(charactersToDelete, '_'));
    event.target.value = value.join('');
    event.target.setSelectionRange(start, end - 1);
    event.preventDefault();
  };

  const onKeyPress = (event) => {
    if (
      Validator.maskByChar(event.target.value.slice(0, event.target.value.indexOf('_')) + event.key, maskArray.join(''))
    ) {
      event.target.value = addMask(event.target.value.slice(0, event.target.value.indexOf('_')) + event.key, maskArray);
      input.props.onKeyPress(event);
      input.props.onInput(event);
      setCursorToEndOfInput(event.target);
    }
    event.preventDefault();
  };

  const onBlur = (event) => {
    const firstPlaceholder = event.target.value.indexOf('_');
    event.target.value = event.target.value.slice(
      0,
      firstPlaceholder < 0 ? event.target.value.length : firstPlaceholder,
    );
    input.props.onBlur(event);
  };

  return React.cloneElement(input, {
    onClick,
    onFocus,
    onKeyDown,
    onKeyPress,
    onBlur,
  });
}

function addMask(string, maskArray) {
  const mask = string.length ? maskArray.slice(string.length).join('') : maskArray.join('');
  return string + mask.replace(specialCharactersRegex, '_').replace(escapedCharactersRegex, '$1');
}

export default MaskComponent;
