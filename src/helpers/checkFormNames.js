export default function checkFormNames(inputs) {
  return !inputs.every((input, index) => inputs.slice(index + 1).find((anotherInput) => input.name === anotherInput));
}
