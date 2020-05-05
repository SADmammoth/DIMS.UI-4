import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Modal from '../Modal';
import Form from '../Form';
import ButtonGroup from '../ButtonGroup';
import Spinner from '../Spinner';

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
    const { onSubmit: propsOnSubmit, reload } = this.props;
    this.setState({ loading: true });

    return propsOnSubmit(data).then((response) => {
      this.setState({ loading: false });
      reload();
      this.modal.current.handleClose();
      return response;
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

    const { loading } = this.state;

    return (
      <>
        <Modal ref={this.modal} className='dialog'>
          {loading ? (
            <Spinner centered />
          ) : (
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
          )}
        </Modal>
        <Button classMod={buttonClassMod} onClick={this.onClick}>
          {buttonContent}
        </Button>
      </>
    );
  }
}

DialogButton.defaultProps = {
  reload: () => {},
};

DialogButton.propTypes = {
  message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  confirmButtonClassMod: PropTypes.string.isRequired,
  confirmButtonContent: PropTypes.string.isRequired,
  buttonContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  buttonClassMod: PropTypes.string.isRequired,
  dialogValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reload: PropTypes.func,
};

export default DialogButton;
