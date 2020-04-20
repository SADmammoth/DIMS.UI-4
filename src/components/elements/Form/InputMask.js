import React from 'react';
import Validator from '../../../helpers/Validator';

function MaskedInput(input, mask, validate = false, type = 'default') {
  let resultInput = input;
  if (input.props.type === 'textarea' || input.props.type === 'select') {
    return input;
  }

  const escapedCharactersOrEmptyRegex = /([9aAh%#\\])\\(?!\\)|()/;
  const maskArray = mask.split(escapedCharactersOrEmptyRegex).filter((el) => el);
  console.log(maskArray);
  if (validate && type === 'invisible') {
    resultInput = React.cloneElement(resultInput, {
      onKeyPress: (e) => {
        if (!Validator.maskByChar(e.target.value + e.key, mask)) {
          e.preventDefault();
        }
      },
    });
  }

  switch (type) {
    case 'invisible':
      return followInvisibleMask(resultInput, maskArray);
    default:
      return followMask(resultInput, maskArray);
  }
}

const escapedCharactersRegex = /([9aAh%#\\])\\(?!\\)/g;
const notEscapedCharactersRegex = /[9aAh%#](?!(\\)(?!\\))/g;

function followInvisibleMaskComponent(input, maskArray) {
  const onFocus = (event) => {
    if (!event.target.value || event.target.value === '') {
      const firstPlaceholder = maskArray.findIndex((el) => notEscapedCharactersRegex.test(el));
      event.target.value = maskArray
        .splice(0, firstPlaceholder)
        .join('')
        .replace(escapedCharactersRegex, '$1');
      event.target.setSelectionRange(firstPlaceholder + 1, firstPlaceholder + 1);
    }
  };

  const onKeyDown = (event) => {
    if (event.key.includes('Arrow')) {
      event.preventDefault();
    }
    if (event.key === 'Delete') {
      event.preventDefault();
    }
    if (event.key === 'Backspace') {
      const { target } = event;
      let { value } = event.target;
      const start = target.selectionStart - 1;
      const end = target.selectionEnd;
      value = value.split('');
      value.splice(start, end - start, '');
      event.target.value = value.join('');
      event.preventDefault();
    }
  };

  return React.cloneElement(input, {
    onFocus,
    onKeyDown,
  });
}

function followInvisibleMask(input, maskArray) {
  if (maskArray[input.props.value.length]) {
    if (/[^9aAh%#](?!(\\)(?!\\))/.test(maskArray[input.props.value.length])) {
      input.props.onInput({
        target: {
          name: input.props.name,
          value: input.props.value + maskArray[input.props.value.length].replace(escapedCharactersRegex, '$1'),
        },
      });
    }
  }
  return followInvisibleMaskComponent(input, maskArray);
}

function followMaskComponent(input, maskArray) {
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
        .replace(notEscapedCharactersRegex, '')
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

function followMask(input, maskArray) {
  const changedInput = followMaskComponent(input, maskArray);
  if (maskArray[input.props.value.length]) {
    if (!input.props.value || input.props.value === '') {
      return changedInput;
    }
  }
  return changedInput;
}

function addMask(string, maskArray) {
  const mask = string.length ? maskArray.slice(string.length).join('') : maskArray.join('');
  return string + mask.replace(notEscapedCharactersRegex, '_').replace(escapedCharactersRegex, '$1');
}

export default MaskedInput;
