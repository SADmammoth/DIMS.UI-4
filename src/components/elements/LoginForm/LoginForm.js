import React from 'react';
import loginFormInputAttributes from './loginFormInputAttributes';
import Form from '../Form/Form';
import Button from '../Button';
import img from '../../../assets/images/devinc.gif';

const LoginForm = (props) => {
  const onSubmit = (data) => props.logIn(data.userName, data.password);
  return (
    <>
      <div className='login'>
        <img className='logo' width='902' height='1001' src={img} alt='DEV incubator' />
        <div className='content'>
          <h1>Welcome to DIMSUI</h1>
          <Form
            className='login-form'
            inputs={loginFormInputAttributes()}
            onSubmit={onSubmit}
            submitButton={<Button classMod='primary'>Log in</Button>}
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
