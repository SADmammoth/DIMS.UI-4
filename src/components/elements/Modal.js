import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Modal extends React.Component {
  static Header = (props) => <div className={`modal__header ${props.className || ''}`}>{props.children}</div>;

  static Body = (props) => <div className={`modal__body ${props.className || ''}`}>{props.children}</div>;

  static Title = (props) => <p className={`modal__title ${props.className || ''}`}>{props.children}</p>;

  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    const { show } = this.props;
    if (this.state.show !== show) {
      this.setState({
        show,
      });
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <>
        <article className={`modal ${this.state.show ? 'show' : ''} ${this.props.className || ''}`}>
          {this.props.children}
        </article>
        {this.props.backface && <div className='modal-shadow' role='article' onClick={(e) => e.stopPropagation()} />}
      </>
    );
  }
}

Modal.defaultProps = {
  show: false,
  backface: true,
};

Modal.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  backface: PropTypes.bool,
};

export default Modal;
