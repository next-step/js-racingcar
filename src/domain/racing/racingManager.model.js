import { INITIAL_ROUND } from "./racing.constant";
import { validateRacingRound } from "./racing.contract";

class RacingManager {
  #round;
  #racingRound;
  #carList;
  #movementRule;

  constructor(carList, racingRound, movementRule) {
    this.#round = INITIAL_ROUND;
    this.#racingRound = validateRacingRound(racingRound);
    this.#carList = carList;
    this.#movementRule = movementRule;
  }

  executeRound() {
    this.#carList.forEach((car) => {
      if (this.#movementRule()) {
        car.move();
      }
    });
    this.#round++;
  }

  get racingRound() {
    return this.#racingRound;
  }

  get currentRound() {
    return this.#round;
  }

  get carList() {
    return [...this.#carList];
  }
}

export default RacingManager;
