import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

function Nav(props) {
  const { navItems, className } = props;

  function renderNavItems() {
    return navItems.map((navItem) => (
      <li className='nav-item' key={navItem.id}>
        <Button link={navItem.link} classMod={`navItem${navItem.active ? '_active' : ''}`}>
          {navItem.content}
        </Button>
      </li>
    ));
  }

  return (
    <nav className={className}>
      <ul className='list_no-type'>{renderNavItems()}</ul>
    </nav>
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
