import React from 'react';
import PropTypes from 'prop-types';
import CollapsibleCardDescription from './CollapsibleCardDescription';

function CollapsibleCardBody(props) {
  const { cardClass, children } = props;
  return (
    <div className={`${cardClass}-card__body`}>
      {React.Children.map(children, (child) => {
        if (!child) {
          return child;
        }
        if (child.type === CollapsibleCardDescription) {
          return React.cloneElement(child, { cardClass });
        }
        return child;
      })}
    </div>
  );
}

CollapsibleCardBody.propTypes = {
  cardClass: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default CollapsibleCardBody;
