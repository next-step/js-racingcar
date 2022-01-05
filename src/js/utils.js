
import { RACE_NUMBER } from "./constants.js";

export const $ = (type, selector) => {
  return document.querySelector(type + selector);
};

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const isUpperFour = () => {
  return getRandomNumber(RACE_NUMBER.MIN, RACE_NUMBER.MAX) >= 4;
};

export const delay = (ms) => {
  const startTime = Date.now();
  return new Promise((resolve) => {
    const callback = () => {
      if (Date.now() - ms <= startTime) return requestAnimationFrame(callback);
      resolve(1);
    };
    requestAnimationFrame(callback);
  });
};
