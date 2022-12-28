/* eslint-disable no-param-reassign */
import ERROR_MESSAGES from '../constant/errorMessages.js';
import RacingGame from './RacingGame.js';
import TrialCount from './TrialCount.js';

const CAR_NAME_SEPARATOR = ',';

class Cars {
  #carList;

  #trialCount;

  constructor() {
    this.#carList = null;
    this.#trialCount = null;
  }

  processNameList = carNames => carNames.split(CAR_NAME_SEPARATOR).map(name => name.trim());

  generateGame = () => {
    const racingGame = new RacingGame(this.#carList, this.#trialCount);
    racingGame.race();

    return [racingGame.result, racingGame.winners];
  };

  resetAll = () => {
    this.#carList = null;
    this.#trialCount = null;
  };

  #validateUnique(carList) {
    if (carList.length === new Set(carList).size) return true;
    throw new Error(ERROR_MESSAGES.DUPLICATED_NAME);
  }

  set carList(carList) {
    if (this.#validateUnique(carList)) this.#carList = carList;
  }

  get carList() {
    return this.#carList;
  }

  set trialCount(trialCount) {
    if (trialCount instanceof TrialCount) {
      this.#trialCount = trialCount;
      return;
    }
    throw new Error('Cars의 trialCount은 TrialCount의 인스턴스여야 합니다.');
  }

  get trialCount() {
    return this.#trialCount;
  }
}

const cars = new Cars();

export default cars;
