export const $ = (selector, parentEl = document) =>
  parentEl.querySelector(selector);

export const $$ = (selector, parentEl = document) =>
  parentEl.querySelectorAll(selector);
