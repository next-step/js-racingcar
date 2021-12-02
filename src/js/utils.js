export const $ = (type, selector) => {
  return document.querySelector(type + selector);
};

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
