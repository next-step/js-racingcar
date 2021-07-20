const $ = (selector) => document.querySelector(selector);

const getRandomInteger= (start, end) => {
  return Math.floor(Math.ramdom * (end - start + 1)) + start;
}

export {$, getRandomInteger}; 