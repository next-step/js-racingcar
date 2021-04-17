'use strict';

const $ = (selector, element = document) => {
  return element.querySelector(selector);
};

export { $ };
