import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ScrollToTop = ({ location }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

ScrollToTop.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(ScrollToTop);
