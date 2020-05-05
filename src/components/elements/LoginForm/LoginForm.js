import React from 'react';
import PropTypes from 'prop-types';
import loginFormInputAttributes from './loginFormInputAttributes';
import Form from '../Form/Form';
import Button from '../Button';
import logo from '../../../assets/images/devinc.gif';

const LoginForm = (props) => {
  const onSubmit = (data) => props.logIn(data.userName, data.password);

  return (
    <>
      <div className='login'>
        <img className='logo' width='902' height='1001' src={logo} alt='DEV incubator' />
        <div className='content'>
          <h1>Welcome to DIMSUI</h1>
          <Form
            className='login-form'
            inputs={loginFormInputAttributes()}
            onSubmit={onSubmit}
            submitButton={<Button classMod='primary'>Log in</Button>}
            showNotifications='errorsOnly'
          />
        </div>
      </div>
    </>
  );
};

LoginForm.propTypes = {
  logIn: PropTypes.func.isRequired,
};

export default LoginForm;
