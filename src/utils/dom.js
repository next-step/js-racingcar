export const $ = (selector, container = document) =>
  container.querySelector(selector);

export const hide = ($el, hide) => $el.classList.toggle('hide', hide);

export const focus = ($el) => requestAnimationFrame(() => $el.focus());

export const disabled = ($el, use) =>
  use ? $el.setAttribute('disabled', true) : $el.removeAttribute('disabled');
