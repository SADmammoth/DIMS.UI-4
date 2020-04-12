import React, { Component } from 'react';
import loginModalInputAttributes from './loginModalInputAttributes';
import Form from '../Form/Form';
import Modal from '../Modal/Modal';
import Button from '../Button';

const LoginModal = (props) => {
  return (
    <Modal show={props.show}>
      <Form
        inputs={loginModalInputAttributes()}
        onSubmit={(data) => props.logIn(data.userName, data.password)}
        submitButton={<Button>Log in</Button>}
      />
    </Modal>
  );
};

export default LoginModal;
