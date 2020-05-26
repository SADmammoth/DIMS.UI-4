export default function replaceSubstring(string, startIndex, endIndex, newSubstring) {
  if (startIndex >= endIndex || startIndex >= string.length) {
    return string;
  }
  const fromToRegexp = new RegExp(`^(.{${startIndex}}).{${endIndex - startIndex}}`, 's');
  return string.replace(fromToRegexp, `$1${newSubstring}`);
}
