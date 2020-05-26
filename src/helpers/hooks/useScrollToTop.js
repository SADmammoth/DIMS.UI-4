import { useEffect } from 'react';

const useScrollToTop = ({ location }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default useScrollToTop;
