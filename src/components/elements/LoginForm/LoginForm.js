import React from 'react';
import loginFormInputAttributes from './loginFormInputAttributes';
import Form from '../Form/Form';
import Button from '../Button';

const LoginForm = (props) => {
  return (
    <Form
      className='login-form'
      inputs={loginFormInputAttributes()}
      onSubmit={(data) => props.logIn(data.userName, data.password)}
      submitButton={<Button classMod='primary'>Log in</Button>}
    />
  );
};

export default LoginForm;
