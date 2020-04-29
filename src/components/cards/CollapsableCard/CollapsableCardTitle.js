import React from 'react';
import PropTypes from 'prop-types';

function CollapsableCardTitle(props) {
  const { cardClass, onClick, children } = props;
  return (
    <p role='menu' className={`interactive ${cardClass}-card__header__title`} onClick={onClick}>
      {children}
    </p>
  );
}

CollapsableCardTitle.propTypes = {
  cardClass: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default CollapsableCardTitle;
