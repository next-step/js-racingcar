const $ = (selector) => document.querySelector(selector);

const createElement = (tag, className) => {
  const element = document.createElement(tag);

  if (className) {
    const classNames = className.split(' ');
    classNames.forEach(name => element.classList.add(name));
  }
  return element;
}

export {$, createElement}; 