export const sleeping = (ms) => {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
};

export const getRandomNumberInRange = (min = 0, max = 10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
