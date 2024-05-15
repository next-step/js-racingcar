import { INITIAL_CAR_LIST, INITIAL_RACING_ROUND } from "./racing.constant.js";
import RacingData from "./racingData.model.js";
import RacingManager from "./racingManager.model.js";

class Racing {
  #racingManager;
  #racingData;

  constructor({
    carList = INITIAL_CAR_LIST,
    racingRound = INITIAL_RACING_ROUND,
    movementRule,
  }) {
    this.#racingManager = new RacingManager(carList, racingRound, movementRule);
    this.#racingData = new RacingData();
  }

  start() {
    while (this.#racingManager.currentRound < this.#racingManager.racingRound) {
      this.#racingManager.executeRound();
      this.#racingData.updateRacingHistory(this.#racingManager.carList);
    }
    this.#racingData.determineWinnerList(this.#racingManager.carList);
  }

  get round() {
    return this.#racingManager.currentRound;
  }

  get carList() {
    return this.#racingManager.carList;
  }

  get winnerList() {
    return this.#racingData.winnerList;
  }

  get racingHistory() {
    return this.#racingData.racingHistory;
  }
}

export default Racing;
