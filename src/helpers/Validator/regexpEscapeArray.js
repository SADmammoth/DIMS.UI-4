import regexpEscape from './regexpEscape';

export default function regexpEscapeArray(array) {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.map((word) => regexpEscape(word));
}
