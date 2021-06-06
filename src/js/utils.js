const $ = ({ target = document, selector }) => target.querySelector(selector);

const addEvent = ({ el, type, callback }) => {
  el.addEventListener(type, callback);
};

export { $, addEvent };
