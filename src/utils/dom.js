const $ = (name, element = document) => {
  element.querySelector(name);
};

const $$ = (name, element = document) => {
  element.querySelectorAll(name);
};

export { $, $$ };
