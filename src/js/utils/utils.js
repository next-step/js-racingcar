export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const createRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

export const createRandomArray = (length, min, max) =>
  [...Array(length)].map(() => createRandomNumber(min, max));

export const isNumber = (num) => !Number.isNaN(num) && typeof num === 'number';

export const show = ($target) => {
  $target.style.display = '';
};

export const hide = ($target) => {
  $target.style.display = 'none';
};
