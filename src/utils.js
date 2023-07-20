const getRandomNumber = () => {
  const result = Math.floor(Math.random() * 10);
  return result;
};

const getArrayNyInput = (input) => {
  const result = input
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  return result;
};

exports.getArrayNyInput = getArrayNyInput;
exports.getRandomNumber = getRandomNumber;
