import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidUpdate() {
    if (this.state.show != this.props.show) {
      this.setState({
        show: this.props.show,
      });
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };
}

export default Modal;

export function ModalBackface() {
  return <div className='modal-shadow' role='article' onClick={(e) => e.stopPropagation()} />; //TODO
}
