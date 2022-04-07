import { ERROR_MESSAGE } from "../constant/index.js";

const RacingGame = {
  start: function ({ carName }) {
    const DELIMITER = ",";
    const splitCarNames = carName.split(DELIMITER);
    if (!this.validateCarNames(splitCarNames)) {
      alert(ERROR_MESSAGE.NAME_LENGTH);
      return;
    }
  },
  validateCarNames: function (names) {
    const MAX_NAME_LENGTH = 5;
    return names.every(name => name.length <= MAX_NAME_LENGTH);
  },
};

export default RacingGame;
