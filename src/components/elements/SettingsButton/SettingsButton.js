import React, { useState, useRef } from 'react';
import Button from '../Button';
import { ReactComponent as SettingsIcon } from '../../../assets/icons/settings.svg';
import Modal from '../Modal';
import changeColorScheme, { themes } from '../../../helpers/changeColorScheme';
import Form from '../Form';
import getSettingsFormInputsProps from './getSettingsFormInputsProps';

const SettingsButton = () => {
  const [inputs, setInputs] = useState({});
  const modal = useRef({});
  const toggleModal = () => {
    modal.current.toggle();
  };

  const changeTheme = (name, value) => {
    changeColorScheme(themes[value]);
  };

  return (
    <>
      <Modal ref={modal} className='settings'>
        <h2>Settings</h2>
        <Form
          inputs={getSettingsFormInputsProps({
            currentTheme: changeColorScheme.currentTheme,
            themeOnChange: changeTheme,
          })}
          onInputsUpdate={setInputs}
          showNotifications='errorsOnly'
        >
          {inputs.theme}
        </Form>
        <Button classMod='secondary' link='/logout'>
          Log out
        </Button>
        <div className='about'>Done by Maxim Logvinenko</div>
      </Modal>
      <Button classMod='invisible'>
        <SettingsIcon className='icon-settings' onClick={toggleModal} />
      </Button>
    </>
  );
};

export default SettingsButton;
