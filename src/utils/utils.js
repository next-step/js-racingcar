const $ = (el) => document.querySelector(el);

const eventHandler = ({ el, type, callback }) => {
  el.addEventListener(type, callback);
};

const handleElement = {
  disableElement: (el) => (el.disabled = true),
  showElement: (el) => (el.hidden = false),
  hiddenElement: (el) => (el.hidden = true),
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export { $, eventHandler, handleElement, getRandomNumber };
