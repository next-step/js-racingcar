import { createProcessArray, validateCarName } from '../utils/service.js';
import { isNumber, sumArray } from '../utils/utils.js';
import { ERROR_MESSAGES } from '../constants.js';

export default {
  /*
  state: state 정보
  payload: payload
  */
  setCarNames(state, { carNames }) {
    if ([...new Set(carNames)].length !== carNames.length)
      throw Error(ERROR_MESSAGES.DUPLICATED_CAR_NAMES);

    state.carNames = carNames.map((carName) => {
      validateCarName(carName);
      return carName.trim();
    });
  },

  setTryCounts(state, { tryCountsString }) {
    if (tryCountsString.length === 0) throw Error(ERROR_MESSAGES.NO_TRY_COUNTS);
    if (isNumber(Number(tryCountsString))) state.tryCounts = Number(tryCountsString);
    else throw Error(ERROR_MESSAGES.TYPE_ONLY_NUMBER);
  },

  setProcessMatrix(state, payload) {
    state.processMatrix = [...Array(state.carNames.length)].map(() =>
      createProcessArray(state.tryCounts)
    );
  },

  setWinners(state, payload) {
    let maxNumer = 0;
    let winnersIndices = [];

    state.processMatrix.forEach((processArray, index) => {
      const curSum = sumArray(processArray);

      if (curSum < maxNumer) return;
      if (curSum === maxNumer) return winnersIndices.push(index);

      winnersIndices = [];
      maxNumer = curSum;
      winnersIndices.push(index);
    });

    state.winners = winnersIndices.map((winnerIndex) => state.carNames[winnerIndex]);
  },
};
