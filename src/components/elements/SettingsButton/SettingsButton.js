import React from 'react';
import Button from '../Button';
import { ReactComponent as SettingsIcon } from '../../../assets/icons/settings.svg';
import Modal from '../Modal';
import changeColorScheme, { themes } from '../../../helpers/changeColorScheme';
import Form from '../Form';
import getSettingsFormInputsProps from './getSettingsFormInputsProps';

class SettingsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputs: {} };
  }

  render() {
    const modal = React.createRef();

    function toggleModal() {
      modal.current.toggle();
    }

    function changeTheme(name, value) {
      changeColorScheme(themes[value]);
    }

    const { inputs } = this.state;

    return (
      <>
        <Modal ref={modal} className='settings'>
          <h2>Settings</h2>
          <Form
            inputs={getSettingsFormInputsProps({
              currentTheme: changeColorScheme.currentTheme,
              themeOnChange: changeTheme,
            })}
            onInputsUpdate={(inputsData) => {
              this.setState(inputsData);
            }}
            submitButton={<></>}
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
  }
}

export default SettingsButton;
