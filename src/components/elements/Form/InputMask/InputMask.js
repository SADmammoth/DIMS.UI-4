import React from 'react';
import Validator from '../../../../helpers/Validator';
import InvisibleMaskComponent from './InvisibleMaskComponent';
import MaskComponent from './MaskComponent';

function MaskedInput(input, mask, validate = false, type = 'default') {
  let resultInput = input;
  if (input.props.type === 'textarea' || input.props.type === 'select') {
    return input;
  }

  const escapedCharactersOrEmptyRegex = /([9aAh%#\\])\\(?!\\)|()/;
  const maskArray = mask.split(escapedCharactersOrEmptyRegex).filter((el) => el);

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
      return InvisibleMaskComponent(resultInput, maskArray);
    default:
      return MaskComponent(resultInput, maskArray);
  }
}

export default MaskedInput;
