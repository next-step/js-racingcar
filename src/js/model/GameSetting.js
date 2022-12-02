class GameSetting {
  #names = [];

  #trialCount = null;

  getNames() {
    return this.#names;
  }

  setNames($carNames) {
    this.#names = $carNames.value.split(',').map((name) => name.trim());
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
