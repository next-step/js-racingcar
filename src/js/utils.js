const $ = ({ target = document, selector }) => target.querySelector(selector);

const addEvent = ({ el, type, callback }) => {
  el.addEventListener(type, callback);
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
};
export { $, addEvent, getRandomInt };
