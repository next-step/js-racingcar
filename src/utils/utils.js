const $ = (el) => document.querySelector(el);

const eventHandler = ({ el, type, callback }) => {
  el.addEventListener(type, callback);
};

export { $, eventHandler };
