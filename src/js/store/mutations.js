import { createProgressArray, validateCarName } from '../utils/service.js';
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

  setProgressMatrix(state, payload) {
    state.progressMatrix = [...Array(state.carNames.length)].map(() =>
      createProgressArray(state.tryCounts)
    );
  },

  setWinners(state, payload) {
    let maxNumber = 0;
    let winnersIndices = [];

    state.progressMatrix.forEach((progressArray, index) => {
      const curSum = sumArray(progressArray);

      if (curSum < maxNumber) return;
      if (curSum === maxNumber) return winnersIndices.push(index);

      winnersIndices = [];
      maxNumber = curSum;
      winnersIndices.push(index);
    });

    state.winners = winnersIndices.map((winnerIndex) => state.carNames[winnerIndex]);
  },
};
