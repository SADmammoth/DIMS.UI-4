import React from 'react';
import PropTypes from 'prop-types';

import CollapsedCard from './CollapsedCard';
import CollapsableCardBody from './CollapsableCardBody';
import CollapsableCardTitle from './CollapsableCardTitle';
import CollapsableCardDescription from './CollapsableCardDescription';

class CollapsableCard extends React.PureComponent {
  static Header = CollapsedCard;

  static Body = CollapsableCardBody;

  static Title = CollapsableCardTitle;

  static Description = CollapsableCardDescription;

  render() {
    const { id, collapsed, open, close, cardClass, children, className } = this.props;

    const onClick = (collapsed) => {
      collapsed ? open(id) : close(id);
    };

    return (
      <>
        <article id={id} className={`${className || ''} ${cardClass}-card${!collapsed ? ' open' : ''}`}>
          {React.Children.map(children, (child) => {
            return child.type === CollapsableCard.Header
              ? React.cloneElement(child, { onClick, collapsed, cardClass })
              : null;
          })}
          {!collapsed &&
            React.Children.map(children, (child) => {
              if (child.type === CollapsableCard.Body || child.type === CollapsableCard.Description) {
                return React.cloneElement(child, { cardClass });
              }
              if (child.type !== CollapsableCard.Header) {
                return child;
              }
              return null;
            })}
        </article>
      </>
    );
  }
}

CollapsableCard.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  cardClass: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default CollapsableCard;
