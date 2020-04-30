import React from 'react';
import PropTypes from 'prop-types';
import CollapsableCardTitle from './CollapsableCardTitle';

function CollapsedCard(props) {
  const { children, cardClass, onClick, collapsed } = props;
  return (
    <div className={`${cardClass}-card__header`}>
      {React.Children.map(children, (child) => {
        if (!child) {
          return child;
        }
        if (child.type === CollapsableCardTitle) {
          return React.cloneElement(child, { onClick: () => onClick(collapsed), cardClass });
        }
        return child;
      })}
    </div>
  );
}

CollapsedCard.propTypes = {
  onClick: PropTypes.func,
  cardClass: PropTypes.string,
  collapsed: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default CollapsedCard;
