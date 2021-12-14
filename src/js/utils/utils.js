export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
export const test$ = (selector) => `[data-testid="${selector}"]`;

export const createRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

export const createRandomArray = (length, min, max) => [...Array(length)].map(() => createRandomNumber(min, max));

export const isNumber = (num) => !Number.isNaN(num) && typeof num === 'number';

export const show = ($target) => {
  $target.style.display = '';
};

export const hide = ($target) => {
  $target.style.display = 'none';
};

export const sumArray = (arr) => arr.reduce((acc, curVal) => acc + curVal);

export const findIndexAll = (arr, val) => {
  const result = [];
  arr.forEach((item, index) => item === val && result.push(index));
  return result;
};

export const delay = async (ms) => {
  const startTime = Date.now();
  return new Promise((resolve) => {
    const callback = () => {
      if (Date.now() - ms <= startTime) return requestAnimationFrame(callback);
      resolve(1);
    };
    requestAnimationFrame(callback);
  });
};
