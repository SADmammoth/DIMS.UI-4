export default function formatFormValues(stateValues) {
  const values = {};
  Object.entries(stateValues).forEach(([name, valueItem]) => {
    values[name] = valueItem.value;

    values[name] = valueItem.value;
    if (valueItem.defaultValue) {
      values[`${name}_default`] = valueItem.defaultValue;
    }
  });
  return values;
}
