import maskEscapedCharsRegex from './maskEscapedCharsRegex';
import maskSpecialCharsRegex from './maskSpecialCharsRegex';
import Validator from './Validator';

export default function invisibleMaskOnInputValue(name, value, maskArray) {
  console.log(value + maskArray[value.length]);
  return {
    target: {
      name,
      value:
        maskArray[value.length] && !RegExp(maskSpecialCharsRegex.source, '').test(maskArray[value.length])
          ? value + maskArray[value.length].replace(maskEscapedCharsRegex, '$1')
          : value,
    },
  };
}
