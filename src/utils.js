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

const parseOutput = (input) => {
  if (!Array.isArray(input)) {
    throw new Error(MESSAGE.INPUT_NOT_ARRAY_ERROR);
  }

  return input.join(",");
};

module.exports = { getRandomNumber, parseInput, parseOutput };
