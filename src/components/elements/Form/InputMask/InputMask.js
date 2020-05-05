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
      onKeyPress: (e) => {
        let value = getValueFromMask(e.target.value) + e.key;
        if (type === 'invisible') {
          value = e.target.value + e.key;
        }

        if (!Validator.maskByChar(value, mask)) {
          e.preventDefault();
        }
      },
    });
  }

  return type === 'invisible' ? InvisibleMaskComponent(resultInput, maskArray) : MaskComponent(resultInput, maskArray);
}

export default MaskedInput;
