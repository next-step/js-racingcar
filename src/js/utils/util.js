export const $$ = selector => selector.charAt(0) === "#" ? document.querySelector(selector) : document.querySelectorAll(selector);

