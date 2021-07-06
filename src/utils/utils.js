const $ = (el) => document.querySelector(el);

const eventHandler = ({ el, type, callback }) => {
  el.addEventListener(type, callback);
};

const handleElement = {
  enableElement: (el) => (el.disabled = false),
  disableElement: (el) => (el.disabled = true),
  showElement: (el) => (el.hidden = false),
  hiddenElement: (el) => (el.hidden = true),
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const delay = (time) => {
  return new Promise((resolve) => setTimeout(() => resolve()), time);
};

export { $, eventHandler, handleElement, getRandomNumber, delay };
