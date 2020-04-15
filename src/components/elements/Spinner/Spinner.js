import React from 'react';

export default function Spinner(props) {
  return <div className={`spinner${props.centered ? ' spinner_centered' : ''}`} />;
}
