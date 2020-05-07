import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ContainerComponent from '../ContainerComponent';
import Nav from './Nav';
import TextBadge from '../TextBadge';
import SettingsButton from '../SettingsButton';
import MobileNav from './MobileNav';
import matchMaxWidth from '../../../helpers/matchMaxWidth';

function Header(props) {
  const { title, navItems, role } = props;

  return (
    <header className='header fixed-top'>
      <ContainerComponent display='flex'>
        <p className='site-title'>
          <Link to='/'>DIMSUI</Link>
        </p>
        <div className='content'>
          <ContainerComponent display='flex'>
            {title && (
              <h1 className='page-title'>
                {title}
                {matchMaxWidth('600px') || (role && <TextBadge>{role}</TextBadge>)}
              </h1>
            )}
            <>
              {navItems && navItems.length && (
                <>
                  {matchMaxWidth('1000px') ? (
                    <MobileNav className='header__nav' navItems={navItems} />
                  ) : (
                    <Nav className='header__nav' navItems={navItems} />
                  )}
                </>
              )}
            </>
            {role && <SettingsButton />}
          </ContainerComponent>
        </div>
      </ContainerComponent>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navItems: Nav.propTypes.navItems,
  role: PropTypes.string,
};

export default Header;
