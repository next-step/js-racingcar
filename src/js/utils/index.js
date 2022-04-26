export const $ = (selector) => document.querySelector(selector);

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
