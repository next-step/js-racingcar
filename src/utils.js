const { SLICE_STANDARD } = require('./constants/racing-rule');

const getRandomNumber = () => {
  const result = Math.floor(Math.random() * 10);
  return result;
};

const sliceByStandard = (input) => {
  const result = input.split(SLICE_STANDARD).map((name) => name.trim());

  return result;
};

module.exports = {
  sliceByStandard,
  getRandomNumber,
};
