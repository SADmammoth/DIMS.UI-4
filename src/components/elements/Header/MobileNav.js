import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Modal from '../Modal';
import { ReactComponent as MenuIcon } from '../../../assets/icons/menu.svg';

function Nav(props) {
  const { navItems, className } = props;
  const modal = React.createRef();

  const toggleModal = () => {
    modal.current.toggle();
  };

  function renderNavItems() {
    return navItems.map((el) => (
      <li className='nav-item' key={el.id}>
        <Button link={el.link} classMod={`navItem${el.active ? '_active' : ''}`}>
          {el.content}
        </Button>
      </li>
    ));
  }

  return (
    <div className={className}>
      <Modal ref={modal} backface={false} className='nav-modal'>
        <nav className={className}>
          <ul className='list_no-type'>{renderNavItems()}</ul>
        </nav>
      </Modal>
      <Button classMod='invisible' onClick={toggleModal}>
        <MenuIcon className='icon-menu' />
      </Button>
    </div>
  );
}
Nav.defaultProps = {
  className: '',
};

Nav.propTypes = {
  className: PropTypes.string,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      link: PropTypes.string,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default Nav;
