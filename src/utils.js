export const sleeping = (ms) => {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
};

export const getRandomIntegerUnderTen = () => {
  return Math.floor(Math.random() * 10);
};
