export const sleeping = (ms) => {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
};

export const getRandomNumberInRange = (min = 0, max = 10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const makeConsecutiveRangeArray = (startValue, endValue) => {
  return Array(endValue - startValue + 1)
    .fill(startValue)
    .map((value, index) => value + index);
};
