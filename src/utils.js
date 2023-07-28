const { SPLIT_STANDARD, RANDOM_NUMBER_RANGE } = require('./constants/racing-rule.js');

class RacingUtils {
  static getRandomNumber = () => {
    const result = Math.floor(Math.random() * RANDOM_NUMBER_RANGE);
    return result;
  };

  static splitByStandard = (input) => {
    const result = input.split(SPLIT_STANDARD).map((name) => name.trim());
    return result;
  };
}

module.exports = RacingUtils;
