export const getEl = (selector, parent = document) => parent.querySelector(selector);
export const getEls = (selector, parent = document) => parent.querySelectorAll(selector);
export const disabledEl = (...elements) => elements.forEach(el => el.setAttribute('disabled', true));
