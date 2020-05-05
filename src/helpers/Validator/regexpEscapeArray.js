import regexpEscape from './regexpEscape';

export default function regexpEscapeArray(array) {
  if (!array || !array.length) {
    return [];
  }
  return array.map((word) => regexpEscape(word));
}
