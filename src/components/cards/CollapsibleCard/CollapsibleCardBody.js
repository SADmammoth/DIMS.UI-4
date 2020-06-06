import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import CollapsibleCardDescription from './CollapsibleCardDescription';

function CollapsibleCardBody(props) {
  const { cardClass, children } = props;

  const style = useSpring({
    config: { duration: 100 },
    to: { opacity: 1, height: 65, transform: 'scaleY(1)' },
    from: { opacity: 0, height: 30, transform: 'scaleY(0)' },
  });

  return (
    <animated.div className={`${cardClass}-card__body`} style={style}>
      {React.Children.map(children, (child) => {
        if (!child) {
          return child;
        }
        if (child.type === CollapsibleCardDescription) {
          return React.cloneElement(child, { cardClass });
        }
        return child;
      })}
    </animated.div>
  );
}

CollapsibleCardBody.propTypes = {
  cardClass: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default CollapsibleCardBody;
