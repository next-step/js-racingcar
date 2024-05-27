import { INITIAL_ROUND } from "./racing.constant.js";
import { validateTotalRounds } from "./racing.contract.js";

class RacingManager {
  #currentRound = INITIAL_ROUND;
  #totalRounds;

  constructor(totalRounds) {
    this.#totalRounds = validateTotalRounds(totalRounds);
  }

  incrementRound() {
    this.#currentRound++;
  }

  get isRemainRound() {
    return this.#currentRound < this.#totalRounds;
  }

  get currentRound() {
    return this.#currentRound;
  }
}

export default RacingManager;
