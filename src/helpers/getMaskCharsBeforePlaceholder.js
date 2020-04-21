import maskSpecialCharsRegex from './maskSpecialCharsRegex';
import maskEscapedCharsRegex from './maskEscapedCharsRegex';

export default function getMaskCharsBeforePlaceholder(maskArray) {
  const firstPlaceholder = maskArray.findIndex((el) => maskSpecialCharsRegex.test(el));
  return maskArray
    .splice(0, firstPlaceholder)
    .join('')
    .replace(maskEscapedCharsRegex, '$1');
}
