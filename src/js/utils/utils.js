const createElement = (target, htmlStr) => {
  const parents = document.querySelector(target);
  if (htmlStr) {
    parents.innerHTML = htmlStr.trim();
  }

  return parents;
};

const generateRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const wait = async (time) => {
  return await new Promise((resolve) => setTimeout(resolve, time));
};

export { createElement, generateRandom, wait };
