import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

export function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const resetScroll = () => {
      if (lenis) {
        lenis.stop();
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true, force: true });
        lenis.start();
      } else {
        window.scrollTo(0, 0);
      }
    };

    // Run immediately
    resetScroll();
    
    // And run after the browser paints the new page
    requestAnimationFrame(() => {
      resetScroll();
    });
  }, [pathname, lenis]);

  return null;
}
