import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ### ScrollToTop Component
 *
 * This component is a utility that ensures the window is scrolled to the top after navigation changes.
 * It listens to changes in the pathname (URL) using the `useLocation` hook from React Router. When the
 * pathname changes, indicating a navigation event, it triggers the window to scroll to the top.
 *
 * This component does not render any visual elements (returns null), and its sole purpose is to control
 * the scroll behavior on route changes.
 *
 * #### Props:
 * - None
 *
 * #### Usage:
 * This component is typically used at a top level in your application, often placed in the main layout
 * or root component. It ensures that when the user navigates between pages, they always start from the
 * top of the new page, which is standard web behavior.
 *
 * #### Example:
 * ```
 * <ScrollToTop />
 * ```
 *
 * #### Dependencies:
 * - `useLocation` hook from 'react-router-dom' to access the current location object and listen for changes in the URL.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
