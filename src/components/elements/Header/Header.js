import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import ContainerComponent from '../ContainerComponent';
import Nav from './Nav';
import TextBadge from '../TextBadge';
import SettingsButton from '../SettingsButton';
import MobileNav from './MobileNav';
import matchMaxWidth from '../../../helpers/matchMaxWidth';
import Button from '../Button';
import { ReactComponent as SearchIcon } from '../../../assets/icons/Search.svg';
import { ReactComponent as LogoIcon } from '../../../assets/images/devinc.svg';
import FilterPanel from './FilterPanel';

function Header(props) {
  const { title, navItems, role, filterFunction } = props;
  const [filterRegexpMode, setFilterRegexpMode] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const initState = { config: { duration: 10 }, height: 80 };
  const finalState = { config: { duration: 200 }, height: 138 };

  const [style, set, stop] = useSpring(() => initState);

  useEffect(() => {
    if (!showFilterPanel) {
      console.log(initState);
      set(initState);
    } else {
      set(finalState);
    }
  }, [showFilterPanel, set, initState, finalState, stop]);

  const togglePanel = () => {
    stop();
    setShowFilterPanel(!showFilterPanel);
  };

  return (
    <animated.header className={`header fixed-top${showFilterPanel ? ' extended' : ''}`} style={style}>
      <ContainerComponent display='flex'>
        <p className='site-title'>
          <Link to='/'>
            <LogoIcon className='icon-logo' title='Dev Incubator' />
          </Link>
        </p>
        <div className='content'>
          <ContainerComponent display='flex'>
            {title && (
              <h1 className='page-title'>
                {title}
                {matchMaxWidth('600px') || (role && <TextBadge>{role}</TextBadge>)}
              </h1>
            )}
            {navItems && navItems.length && (
              <>
                {matchMaxWidth('1200px') ? (
                  <MobileNav className='header__nav' navItems={navItems} />
                ) : (
                  <Nav className='header__nav' navItems={navItems} />
                )}
              </>
            )}
            {filterFunction && (
              <Button classMod='invisible' onClick={togglePanel}>
                <SearchIcon className='icon-search' />
              </Button>
            )}
            {role && <SettingsButton />}
          </ContainerComponent>
          {filterFunction && (
            <FilterPanel
              showFilterPanel={showFilterPanel}
              filterRegexpMode={filterRegexpMode}
              setFilterRegexpMode={setFilterRegexpMode}
              filterFunction={filterFunction}
            />
          )}
        </div>
      </ContainerComponent>
    </animated.header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navItems: Nav.propTypes.navItems,
  role: PropTypes.string,
  filterFunction: PropTypes.func,
};

export default Header;
