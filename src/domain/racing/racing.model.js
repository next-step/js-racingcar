import deepCopy from "../../utils/deepCopy.js";

import {
  INITIAL_CARS,
  INITIAL_RACING_HISTORY,
  INITIAL_TOTAL_ROUNDS,
} from "./racing.constant.js";
import RacingManager from "./racingManager.model.js";
import RacingRound from "./racingRound.model.js";

class Racing {
  #manager;
  #round;
  #history = INITIAL_RACING_HISTORY;

  constructor({
    cars = INITIAL_CARS,
    totalRounds = INITIAL_TOTAL_ROUNDS,
    movementRule,
  }) {
    this.#manager = new RacingManager(totalRounds);
    this.#round = new RacingRound(cars, movementRule);
  }

  start() {
    while (this.#manager.isRemainRound) {
      this.#round.execute();
      this.#updateHistory();
      this.#manager.incrementRound();
    }
  }

  #updateHistory() {
    this.#history = [...this.#history, ...this.#round.toJSON()];
  }

  get round() {
    return this.#manager.currentRound;
  }

  get winners() {
    return this.#round.getWinners();
  }

  get history() {
    return deepCopy(this.#history);
  }
}

export default Racing;
