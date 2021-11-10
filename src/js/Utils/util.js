const $ = (selector) => document.querySelector(selector);

const getRandomInteger= (start, end) => {
  const randValue = Math.floor(Math.random() * (end - start + 1)) + start; 
  return randValue;
}

export {$, getRandomInteger}; 
