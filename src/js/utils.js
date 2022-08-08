const toArrayBySeparator = (string, separator = ',') => string.split(separator);
const getRandomInteger = (maxValue) => Math.floor(Math.random() * ++maxValue);

const delay = (asyncFunc, timerFunc = setTimeout, timeout = 1000) =>
  new Promise((res) =>
    timerFunc(() => {
      res(asyncFunc());
    }, timeout)
  );

export { toArrayBySeparator, getRandomInteger, delay };
