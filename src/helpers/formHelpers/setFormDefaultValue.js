export default function setFormDefaultValue(values, input) {
  return values[input.name] && (values[input.name].defaultValue || (input.defaultValue && [...input.defaultValue]));
}
