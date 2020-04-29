import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import { ReactComponent as SettingsIcon } from '../../../assets/icons/settings.svg';
import Modal from '../../elements/Modal';
import changeColorScheme, { themes } from '../../../helpers/changeColorScheme';
import Form from '../../elements/Form/Form';

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

    return (
      <>
        <Modal ref={modal} className='settings'>
          <h2>Settings</h2>
          <Form
            inputs={[
              {
                name: 'theme',
                type: 'select',
                label: 'Theme',
                valueOptions: ['light', 'dark'],
                value: changeColorScheme.currentTheme,
                onChange: changeTheme,
              },
            ]}
            onInputsUpdate={(inputs) => {
              this.setState(inputs);
            }}
            submitButton={<></>}
          >
            {this.state.inputs.theme}
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

SettingsButton.propTypes = {};

export default SettingsButton;
