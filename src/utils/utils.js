import { templateForward } from "../view/template.js";

export const removeHiddenClass = ($selector) => {
  $selector.classList.remove("hidden");
};

export const displayTemplate = ($selector, template) => {
  $selector.innerHTML = template;
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
