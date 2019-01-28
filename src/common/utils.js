import { css } from "styled-components";

export const breakpoints = {
  large: 1920,
  desktop: 1280,
  tablet: 600
};

// Iterate through the breakpoints and create a media template
export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

/**
  * @function debounce
  * Returns a function, that, as long as it continues to be invoked, will not
  * be triggered. The function will be called after it stops being called for
  * N milliseconds. If `immediate` is passed, trigger the function on the
  * leading edge, instead of the trailing.
  * @param {function} func - Function to debounce
  * @param {number} wait - Delay before triggering the function
  * @param {boolean} immediate - If `immediate` is passed, trigger the function on the
  *                              leading edge, instead of the trailing.
  */
export function debounce(func, wait, immediate = false) {
  let timeout;
  return function() {
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}
