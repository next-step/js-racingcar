const $ = (name, element = document) => {
  return element.querySelector(name);
};

const $$ = (name, element = document) => {
  return element.querySelectorAll(name);
};

export { $, $$ };
