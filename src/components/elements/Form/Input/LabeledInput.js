import React from 'react';

export default function LabeledInput(label, id, input) {
  return label ? (
    <div className='form-group'>
      <label className='form-label' htmlFor={id}>
        {label}
      </label>
      {input}
    </div>
  ) : (
    input
  );
}
