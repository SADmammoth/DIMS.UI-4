import React from 'react';

import maskSpecialCharsRegex from '../../../../helpers/maskSpecialCharsRegex';
import placeInputCursorToEnd from '../../../../helpers/placeInputCursorToEnd';
import getMaskCharsBeforePlaceholder from '../../../../helpers/getMaskCharsBeforePlaceholder';
import invisibleMaskOnInputValue from '../../../../helpers/invisibleMaskOnInputValue';

function InvisibleMaskComponent(input, maskArray) {
  const onFocus = (event) => {
    if (!event.target.value || event.target.value === '') {
      event.target.value = getMaskCharsBeforePlaceholder(maskArray);
      placeInputCursorToEnd(event.target, maskArray);
    }
  };

  const onKeyDown = (event) => {
    if (event.key.includes('Arrow') || event.key === 'Delete') {
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

      input.props.onInput(event);
    }
  };

  const onInput = (event) => {
    input.props.onInput(invisibleMaskOnInputValue(input.props.name, event.target.value, maskArray));
    input.props.onKeyPress(event);
  };

  return React.cloneElement(input, {
    onFocus,
    onKeyDown,
    onInput,
  });
}

export default InvisibleMaskComponent;
