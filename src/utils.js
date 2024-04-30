const { MESSAGE } = require("../constants/message");

const getRandomNumber = (min, max) => {
  if (typeof min !== "number" || typeof max !== "number") {
    throw new TypeError(MESSAGE.INPUT_TYPE_ERROR);
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const parseInput = (input) => {
  if (input === "") {
    throw new Error(MESSAGE.INPUT_LENGTH_ERROR);
  }

  return input.split(",");
};

module.exports = { getRandomNumber, parseInput };
