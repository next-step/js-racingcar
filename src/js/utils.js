const toArrayBySeparator = (string, separator = ',') => string.split(separator);

const getRandomInteger = (maxValue) => Math.floor(Math.random() * ++maxValue);

const delay = (timeout = 1000) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const getMaxValueByObjectKey = (objectArray, key) =>
  objectArray.reduce((preWinner, current) =>
    preWinner[key] > current[key] ? preWinner : current
  )[key];

export { toArrayBySeparator, getRandomInteger, delay, getMaxValueByObjectKey };
