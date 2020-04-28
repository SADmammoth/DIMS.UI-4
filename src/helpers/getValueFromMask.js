export default function getValueFromMask(mask) {
  const firstPlaceholder = mask.indexOf('_');
  console.log(mask);
  return mask.slice(0, firstPlaceholder < 0 ? mask.length : firstPlaceholder);
}
