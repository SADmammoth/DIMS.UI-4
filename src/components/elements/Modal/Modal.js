import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  static getDerivedStateFromProps(prevProps, state) {
    if (prevProps.show !== undefined) {
      return { show: prevProps.show };
    }

    return state;
  }

  componentDidMount() {
    const { show } = this.props;
    return this.setState({ show });
  }

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  modalBackfaceClick = (e) => {
    e.preventDefault();
    this.handleClose();
  };

  toggle() {
    const { show } = this.state;
    if (show) {
      this.handleClose();
    } else {
      this.handleShow();
    }
  }

  render() {
    const { show } = this.state;
    const { children, backface, className } = this.props;
    return (
      <>
        {show && (
          <>
            <article className={`modal ${show ? 'show' : ''} ${className || ''}`}>{children}</article>
            {backface && <div className='modal-shadow' role='article' onClick={this.modalBackfaceClick} />}
          </>
        )}
      </>
    );
  }
}

Modal.defaultProps = {
  show: false,
  backface: true,
  onClose: () => {},
};

Modal.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  backface: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default Modal;
