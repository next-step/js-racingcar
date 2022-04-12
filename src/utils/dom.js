const $ = (name, element = document) => {
  return element.querySelector(name);
};

const $$ = (name, element = document) => {
  return element.querySelectorAll(name);
};

const show = (target) => target.classList.remove('d-none');
const disable = (target) => (target.disabled = true);

export { $, $$, show, disable };
