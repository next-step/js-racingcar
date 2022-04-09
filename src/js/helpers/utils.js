export const $template = html => {
  const template = document.createElement('template');
  template.insertAdjacentHTML('afterbegin', html);
  return template.firstElementChild;
};

export const pipe =
  (...fns) =>
  value =>
    fns.reduce((_value, fn) => fn(_value), value);

export const trim = value => {
  return value.trim();
};

export const trimComma = value => {
  let parsed = value.startsWith(',') ? value.slice(1) : value;
  return parsed.endsWith(',') ? parsed.slice(0, -1) : parsed;
};

export const split = (target, separator = ',') => {
  return target.split(separator);
};

export const removeSpace = targetArray => {
  return targetArray.map(element => element.replace(/\s/gi, ''));
};

export const generateRandomNumbers = ({ count: length, min = 1, max = 9 }) =>
  Array.from({ length }).map(() => Math.floor(Math.random() * max) + min);
