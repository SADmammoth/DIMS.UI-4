export default function checkboxValueSeparator(value) {
  if (value === '') {
    return [];
  }
  return typeof value === 'string' ? value.split(',') : value;
}
