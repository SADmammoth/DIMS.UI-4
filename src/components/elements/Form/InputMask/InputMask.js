import React from 'react';
import Validator from '../../../../helpers/Validator';
import InvisibleMaskComponent from './InvisibleMaskComponent';
import MaskComponent from './MaskComponent';
import maskEscapedCharsOrEmptyRegex from '../../../../helpers/maskHelpers/maskEscapedCharsOrEmptyRegex';
import getValueFromMask from '../../../../helpers/maskHelpers/getValueFromMask';

function MaskedInput(input, mask, validate = false, type = 'default') {
  let resultInput = input;
  if (input.props.type === 'textarea' || input.props.type === 'select') {
    return input;
  }

  const maskArray = mask.split(maskEscapedCharsOrEmptyRegex).filter((el) => el);

  if (validate) {
    resultInput = React.cloneElement(resultInput, {
      onKeyPress: ({ target: { value }, key, preventDefault }) => {
        let newValue = getValueFromMask(value) + key;
        if (type === 'invisible') {
          newValue = value + key;
        }

        if (!Validator.maskByChar(newValue, mask)) {
          preventDefault();
        }
      },
    });
  }

  return type === 'invisible' ? InvisibleMaskComponent(resultInput, maskArray) : MaskComponent(resultInput, maskArray);
}

export default MaskedInput;
