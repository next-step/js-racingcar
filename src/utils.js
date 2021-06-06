// doucument querySelector
const $ = selector => document.querySelector(selector);

// target querySelector
const $$ = ({ target, selector }) => target.querySelector(selector);

export { $, $$ };
