import maskSpecialCharsRegex from './maskSpecialCharsRegex';
import getValueFromMask from './getValueFromMask';

export default function placeInputCursorToEnd(target, maskArray, maskType = 'default') {
  let { value } = target;

  if (maskType === 'default') {
    value = getValueFromMask(value);
  }

  let firstPlaceholder =
    value.length - 1 + maskArray.slice(value.length).findIndex((el) => maskSpecialCharsRegex.test(el));

  if (firstPlaceholder === value.length - 2) {
    firstPlaceholder = value.length - 1;
  }

  target.setSelectionRange(firstPlaceholder + 1, firstPlaceholder + 1);
}
