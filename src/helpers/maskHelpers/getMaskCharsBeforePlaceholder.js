import maskSpecialCharsRegex from './maskSpecialCharsRegex';
import maskEscapedCharsRegex from './maskEscapedCharsRegex';

export default function getMaskCharsBeforePlaceholder(maskArray) {
  const firstPlaceholder = maskArray.findIndex((el) => {
    return maskSpecialCharsRegex.test(el);
  });
  if (firstPlaceholder < 0) {
    return maskArray.join('').replace(maskEscapedCharsRegex, '$1');
  }

  return maskArray.slice(0, firstPlaceholder).join('').replace(maskEscapedCharsRegex, '$1');
}
