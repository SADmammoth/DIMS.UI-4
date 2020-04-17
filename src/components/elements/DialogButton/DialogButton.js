import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';
import ButtonGroup from '../ButtonGroup';
import Spinner from '../Spinner/Spinner';

class DialogButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };

    this.modal = React.createRef();
  }

  onClick = () => {
    this.modal.current.handleShow();
  };

  onCancel = () => {
    this.modal.current.handleClose();
  };

  onSubmit = (data) => {
    this.setState({ loading: true });
    return this.props
      .onSubmit(data)
      .then(() => {
        this.setState({ loading: false });
        this.onCancel();
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const {
      buttonContent,
      buttonClassMod,
      dialogValue,
      message,
      confirmButtonClassMod,
      confirmButtonContent,
    } = this.props;
    return (
      <>
        <Modal ref={this.modal} className='dialog'>
          {!this.state.loading ? (
            <>
              <p className='dialog__head'>{message}</p>
              <ButtonGroup>
                <Form
                  inputs={[
                    {
                      type: 'hidden',
                      name: 'dialogValue',
                      value: dialogValue,
                    },
                  ]}
                  onSubmit={this.onSubmit}
                  submitButton={<Button classMod={confirmButtonClassMod}>{confirmButtonContent}</Button>}
                />
                <Button classMod='ghost' onClick={this.onCancel}>
                  Cancel
                </Button>
              </ButtonGroup>
            </>
          ) : (
            <Spinner centered />
          )}
        </Modal>
        <Button classMod={buttonClassMod} onClick={this.onClick}>
          {buttonContent}
        </Button>
      </>
    );
  }
}

DialogButton.propTypes = {
  message: PropTypes.string.isRequired,
  confirmButtonClassMod: PropTypes.string.isRequired,
  confirmButtonContent: PropTypes.string.isRequired,
  buttonContent: PropTypes.any.isRequired,
  buttonClassMod: PropTypes.string.isRequired,
  dialogValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DialogButton;
