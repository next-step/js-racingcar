export const $ = (selector) => document.querySelector(selector);

export const $$ = (selector) => document.querySelectorAll(selector);

export const showElement = (element) => {
  element.classList.remove("d-none");
};

export const lockElement = (element) => {
  element.disabled = true;
};

export const resetElement = (element) => {
  element.value = "";
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
