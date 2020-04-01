import React from 'react';

export default function SelectInput(props) {
  function renderOption(value) {
    return <option value={value}>{value}</option>;
  }
  return (
    <select className='form-select' {...props}>
      {props.valueOptions.map((value) => renderOption(value))}
    </select>
  );
}
