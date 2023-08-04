const { SPLIT_STANDARD, RANDOM_NUMBER_RANGE } = require('./constants/racing-rule.js');

const utils = Object.freeze({
  getRandomNumber: () => {
    const result = Math.floor(Math.random() * RANDOM_NUMBER_RANGE);
    return result;
  },

  splitByStandard: (input) => {
    const result = input.split(SPLIT_STANDARD).map((name) => name.trim());
    return result;
  },
});

module.exports = utils;
