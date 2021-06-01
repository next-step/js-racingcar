export const err = msg => {
  throw msg;
};
export const popUp = msg => alert(msg);
export const qs = (sel, parent = document) => parent.querySelector(sel);
export const qsById = (id, parent) => qs(`#${id}`, parent);
export const random = (start, end) =>
  Math.floor(start + Math.random() * (end - start + 1));
export const max = (...args) => Math.max(...args);
export const values = obj => Object.values(obj);
export const disabled = (isDisabled, ...els) =>
  els.forEach(el => (el.disabled = isDisabled));
export const timeout = (...args) => setTimeout(...args);
