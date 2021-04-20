export const $ = (selector, target='') => {
  if(!target) return document.querySelector(selector);
  return target.querySelector(selector);
}
export const $all = (selector, target='') => {
  if(!target) return document.querySelectorAll(selector);
  return target.querySelectorAll(selector);
}