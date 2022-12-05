/**
 *
 * @param {string} selector
 * @returns {?HTMLElement}
 */
export const selector = (selector) => document.querySelector(selector);
/**
 *
 * @param {string} selector
 * @returns {HTMLElement[]|[]}
 */
export const selectorAll = (selector) => document.querySelectorAll(selector);
