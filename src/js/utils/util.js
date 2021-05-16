export const selector = (v, el = document) => el.querySelector(v);
export const createDom = (tag = 'div', ...classList) => {
  const el = document.createElement(tag);
  el.classList.add(...classList);
  return el;
}
