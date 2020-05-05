import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';

function CollapsableCardTitle(props) {
  const { cardClass, onClick, children } = props;
  return (
    <Button classMod={`interactive ${cardClass}-card__header__title`} onClick={onClick}>
      {children}
    </Button>
  );
}

CollapsableCardTitle.propTypes = {
  cardClass: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default CollapsableCardTitle;
