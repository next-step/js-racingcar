import {validateCarName} from "../utils/service.js";
import {isNumber} from "../utils/utils.js";
import {ERROR_MESSAGES} from "../constants.js";

export default {
  /*
  state: state 정보
  payload: payload
  */
  setCarNames(state, {carNames}) {
    if ([...new Set(carNames)].length !== carNames.length) throw Error(ERROR_MESSAGES.DUPLICATED_CAR_NAMES);
    state.carNames = carNames.map(carName => {
      validateCarName(carName);
      return carName.trim();
    });
  },

  setTryCounts(state, {tryCountsString}) {
    if (tryCountsString.length === 0) throw Error(ERROR_MESSAGES.NO_TRY_COUNTS);
    if (isNumber(Number(tryCountsString))) state.tryCounts = Number(tryCountsString);
    else throw Error(ERROR_MESSAGES.TYPE_ONLY_NUMBER);
  },
};