import RacingInputView from "../views/RacingInputView.js";
import { splitCarName } from "../utils/textUtils.js";
import { CAR_NAME_MAX_LENGTH, ERROR_MESSAGE } from "../constant/index.js";

const RacingGame = {
  start: function ({ carName }) {
    const splitCarNames = splitCarName(carName);
    if (!this.validateCarNames(splitCarNames)) {
      alert(ERROR_MESSAGE.NAME_LENGTH);
      return;
    }

    RacingInputView.renderTryCountInput();
  },
  validateCarNames: function (names) {
    return names.every(name => name.length <= CAR_NAME_MAX_LENGTH);
  },
};

export default RacingGame;
