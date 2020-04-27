import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import { ReactComponent as SettingsIcon } from '../../../assets/icons/settings.svg';
import Modal from '../../elements/Modal';
import Select from '../../elements/Form/Select';
import changeColorScheme, { themes } from '../../../helpers/changeColorScheme';

function SettingsButton(props) {
  const modal = React.createRef();

  function toggleModal() {
    modal.current.toggle();
  }

  function changeTheme(event) {
    const themesPresets = {
      Light: themes.light,
      Dark: themes.dark,
    };
    setTimeout(() => toggleModal(), 500);
    changeColorScheme(themesPresets[event.target.value]);
  }

  return (
    <>
      <Button classMod='invisible'>
        <SettingsIcon className='settings-icon' onClick={toggleModal} />
      </Button>
      <Modal ref={modal} backface={false}>
        <Select valueOptions={['Light', 'Dark']} onChange={changeTheme} />
      </Modal>
    </>
  );
}

SettingsButton.propTypes = {};

export default SettingsButton;
