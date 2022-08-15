export const addCls = (target, ...clsName) =>
  target?.classList?.add(...clsName);

export const removeCls = (target, ...clsName) =>
  target?.classList?.remove(...clsName);

export const warnMsg = (msg) => alert(msg);

export const createElement = (tagName, ...clsName) => {
  const element = document.createElement(tagName);
  element.classList.add(...clsName);
  return element;
};

export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
