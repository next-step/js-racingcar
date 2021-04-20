const createElement = (target, htmlStr) => {
  const parents = document.querySelector(target);
  if (!htmlStr) {
    return parents;
  }
  parents.innerHTML = htmlStr.trim();

  return parents.firstChild;
};

const generateRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const wait = async (time) => {
  return await new Promise((resolve) => setTimeout(resolve, time));
};

export { createElement, generateRandom, wait };
