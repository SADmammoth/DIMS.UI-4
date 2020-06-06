import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import CollapsibleCardTitle from './CollapsibleCardTitle';
import changeColorScheme from '../../../helpers/changeColorScheme';

function CollapsedCard(props) {
  const { children, cardClass, onClick: onClickProp, collapsed } = props;

  const initState = { background: changeColorScheme.currentColors.primaryBg, transform: 'scale(1)' };
  const highlightedState = { background: changeColorScheme.currentColors.highlightBg, transform: 'scale(1.01)' };

  const [style, set, stop] = useSpring(() => ({ config: { duration: 200 }, ...initState }));
  useEffect(() => {
    collapsed ? set(initState) : set(highlightedState);
  }, [collapsed, set, initState, highlightedState]);

  const onClick = (collapsed) => {
    stop();
    onClickProp(collapsed);
  };

  return (
    <animated.div className={`${cardClass}-card__header`} style={style}>
      {React.Children.map(children, (child) => {
        if (!child) {
          return child;
        }
        if (child.type === CollapsibleCardTitle) {
          return React.cloneElement(child, { onClick: () => onClick(collapsed), cardClass });
        }
        return child;
      })}
    </animated.div>
  );
}

CollapsedCard.propTypes = {
  onClick: PropTypes.func,
  cardClass: PropTypes.string,
  collapsed: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default CollapsedCard;
