import maskSpecialCharsRegex from './maskSpecialCharsRegex';
import maskEscapedCharsRegex from './maskEscapedCharsRegex';

export default function getMaskCharsBeforePlaceholder(maskArray) {
  const firstPlaceholder = maskArray.findIndex((el) => {
    console.log(maskSpecialCharsRegex, el, maskSpecialCharsRegex.test(el));
    return /[9aAh%#](?!(\\)(?!\\))/g.test(el);
  });
  if (firstPlaceholder < 0) {
    return maskArray.join('').replace(maskEscapedCharsRegex, '$1');
  }
  console.log(maskArray, firstPlaceholder);
  return maskArray.slice(0, firstPlaceholder).join('').replace(maskEscapedCharsRegex, '$1');
}
