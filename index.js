import { useEffect, useRef, useCallback } from 'react';

/**
 * useInfiniteScroll - A lightweight hook for implementing infinite scrolling in React using Intersection Observer.
 * 
 * @param {Function} callback - The function to call when the element becomes visible.
 * @param {Object} options - IntersectionObserver options (root, rootMargin, threshold)
 * @returns {Array} - returns a ref to attach to the sentinel element.
 */
function useInfiniteScroll(callback, options = {}) {
  const observerRef = useRef(null);
  const callbackRef = useRef(callback);

  // keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const lastElementRef = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (callbackRef.current) {
            callbackRef.current();
          }
        }
      }, options);

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [options]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [lastElementRef];
}

export default useInfiniteScroll;
