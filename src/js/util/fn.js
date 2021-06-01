export const delay = (data, ms) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const pipe = (...fns) => (arg) => fns.reduce((arg, fn) => fn(arg), arg);

export const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
