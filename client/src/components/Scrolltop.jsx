import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Fires whenever the route changes

  return null;
}

export default ScrollToTop;

// You wrap your main router component with this.
// <Router> <ScrollToTop /> ... </Router>