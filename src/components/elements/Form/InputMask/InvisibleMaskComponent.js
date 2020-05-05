import React from 'react';

import placeInputCursorToEnd from '../../../../helpers/maskHelpers/placeInputCursorToEnd';
import getMaskCharsBeforePlaceholder from '../../../../helpers/maskHelpers/getMaskCharsBeforePlaceholder';
import invisibleMaskOnInputValue from '../../../../helpers/maskHelpers/invisibleMaskOnInputValue';
import replaceSubstring from '../../../../helpers/replaceSubstring';

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
      const { value } = event.target;
      const start = target.selectionStart - 1;
      const end = target.selectionEnd;

      event.target.value = replaceSubstring(value, start, end, '');
      input.props.onInput(event);
      event.preventDefault();
    }
  };

  const onChange = (event) => {
    input.props.onInput(invisibleMaskOnInputValue(input.props.name, event.target.value, maskArray));
    input.props.onKeyPress(event);
  };

  const onBlur = (event) => {
    input.props.onChange(event);
  };

  return React.cloneElement(input, {
    onFocus,
    onKeyDown,
    onChange,
    onBlur,
  });
}

export default InvisibleMaskComponent;
