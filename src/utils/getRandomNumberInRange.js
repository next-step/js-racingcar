const getRandomNumberInRange = (min = 0, max = 10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default getRandomNumberInRange;
