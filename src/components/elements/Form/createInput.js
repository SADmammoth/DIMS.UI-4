import React from 'react';
import Input from './Input';

export default function createInput(props) {
  const { id } = props;
  return <Input key={id} {...props} />;
}
