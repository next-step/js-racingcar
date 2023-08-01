export const getRandomNumberInRange = (min = 0, max = 10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getIndexesOfMaxValue = (arr) => {
  const max = Math.max(...arr);

  return arr.reduce((acc, cur, index) => {
    return cur === max ? [...acc, index] : acc;
  }, []);
};
