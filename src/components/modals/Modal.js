import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
    };
    props.bindButton(this.handleShow);
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };
}

Modal.propTypes = {
  bindButton: PropTypes.func.isRequired,
};

export default Modal;
