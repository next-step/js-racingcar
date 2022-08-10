const toArrayBySeparator = (string, separator = ',') => string.split(separator);
const getRandomInteger = (maxValue) => Math.floor(Math.random() * ++maxValue);

const delay = (timeout = 1000) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export { toArrayBySeparator, getRandomInteger, delay };
