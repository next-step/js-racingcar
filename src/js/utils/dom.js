export const $ = (selector, target='') => {
  if(!target) return document.querySelector(selector);
  return target.querySelector(selector);
}
export const $all = (selector, target='') => {
  if(!target) return document.querySelectorAll(selector);
  return target.querySelectorAll(selector);
}

export const $text = (text) => document.createTextNode(text);

export const $element = (selector, target='', attribute='') => {
  const element = document.createElement(selector);
  if(target && attribute) element.setAttribute(target, attribute);
  return element;
}

export const $child = (parent, child) => parent.appendChild(child);