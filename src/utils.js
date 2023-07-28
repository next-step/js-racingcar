const { SLICE_STANDARD } = require('./constants/racing-rule');

class RacingUtils {
  static getRandomNumber = () => {
    const result = Math.floor(Math.random() * 10);
    return result;
  };

  static sliceByStandard = (input) => {
    const result = input.split(SLICE_STANDARD).map((name) => name.trim());
    return result;
  };
}

module.exports = RacingUtils;
