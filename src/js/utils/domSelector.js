"use strict";

export const $ = (selector, elem = document) => {
  return elem.querySelector(selector);
};
