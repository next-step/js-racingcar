export const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const getRandomNumber = ({ max, min }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const showElement = ($element) =>
  $element.classList.remove(CLASSNAME.MODIFIER.HIDDEN);

export const hideElement = ($element) =>
  $element.classList.add(CLASSNAME.MODIFIER.HIDDEN);

export const getRandomIntInclusive = (min, max) => {
  const minInteger = Math.ceil(min);
  const maxInteger = Math.floor(max);

  return Math.floor(Math.random() * (maxInteger - minInteger + 1) + minInteger);
};

const canMoveForward = () => {
  const MIN = 1;
  const MAX = 9;
  const MOVING_POINT = 4;
  return getRandomIntInclusive(MIN, MAX) >= MOVING_POINT;
};

export const getRacingResult = (numberCars) =>
  Array.from(Array(numberCars), canMoveForward);
