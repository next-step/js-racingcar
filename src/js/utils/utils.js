export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const removeBlank = (str) => {
  return str.replaceAll(' ', '');
};

export const createRandomArray = (length, min, max) => {
  return [...Array(length)].map(() => createRandomNumber(min, max));
};

export const createRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};