/**
 * @param {string} selector
 * @param {Element || Document} parent
 * @returns {Element}
 */
const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

/**
 * @param {string} selector
 * @param {Element || Document} parent
 * @returns {NodeListOf<Element>}
 */
const $$ = (selector, parent = document) => {
    return parent.querySelectorAll(selector);
};

export {
    $,
    $$,
};
