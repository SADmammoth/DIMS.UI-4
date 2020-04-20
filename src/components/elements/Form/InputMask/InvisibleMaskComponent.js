import React from 'react';

const escapedCharactersRegex = /([9aAh%#\\])\\(?!\\)/g;
const specialCharactersRegex = /[9aAh%#\\](?!(\\)(?!\\))/g;

function InvisibleMaskComponent(input, maskArray) {
  if (maskArray[input.props.value.length]) {
    if (specialCharactersRegex.test(maskArray[input.props.value.length])) {
      input.props.onInput({
        target: {
          name: input.props.name,
          value: input.props.value + maskArray[input.props.value.length].replace(escapedCharactersRegex, '$1'),
        },
      });
    }
  }

  const onFocus = (event) => {
    if (!event.target.value || event.target.value === '') {
      const firstPlaceholder = maskArray.findIndex((el) => specialCharactersRegex.test(el));
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

export default InvisibleMaskComponent;
