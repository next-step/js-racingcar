import { INPUT_CONDITION } from '../constants/condition.js';

class GameSetting {
  #names = [];

  #trialCount = null;

  getNames() {
    return this.#names;
  }

  setNames($carNames) {
    this.#names = $carNames.value
      .split(INPUT_CONDITION.SEPARATOR_CAR_NAME)
      .map((name) => name.trim());
  }

  getTrialCount() {
    return this.#trialCount;
  }

  setTrialCount(trialCount) {
    this.#trialCount = trialCount;
  }
}

const gameSetting = new GameSetting();

export default gameSetting;
