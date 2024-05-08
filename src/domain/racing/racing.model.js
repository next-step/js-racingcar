import {
  INITIAL_CAR_LIST,
  INITIAL_RACING_HISTORY,
  INITIAL_ROUND,
  INITIAL_WINNER_LIST,
  INITIAL_RACING_ROUND,
} from "./racing.constant.js";
import { validateRacingRound } from "./racing.contract.js";

export class Racing {
  #round;
  #carList;
  #winnerList;
  #racingRound;
  #movementRule;
  #racingHistory;

  constructor({
    carList = INITIAL_CAR_LIST,
    racingRound = INITIAL_RACING_ROUND,
    movementRule,
  }) {
    validateRacingRound(racingRound);

    this.#carList = carList;
    this.#racingRound = racingRound;
    this.#movementRule = movementRule;
    this.#round = INITIAL_ROUND;
    this.#winnerList = INITIAL_WINNER_LIST;
    this.#racingHistory = INITIAL_RACING_HISTORY;
  }

  start() {
    this.#race();
    this.#determineWinnerList();
  }

  #race() {
    while (this.#round < this.#racingRound) {
      this.#executeRound();
      this.#updateRacingHistory();

      this.#round++;
    }
  }

  #executeRound() {
    this.#carList.forEach((car) => {
      if (this.#movementRule()) {
        car.move();
      }
    });
  }

  #determineWinnerList() {
    const maxPosition = Math.max(...this.#carList.map((car) => car.position));
    this.#winnerList = this.#carList.filter(
      (car) => car.position === maxPosition
    );
  }

  #updateRacingHistory() {
    const history = this.#generateRacingHistory();
    this.#racingHistory = [...this.#racingHistory, ...history];
  }

  #generateRacingHistory() {
    return this.#carList.map((car) => ({
      name: car.name,
      position: car.position,
    }));
  }

  get round() {
    return this.#round;
  }

  get carList() {
    return this.#carList;
  }

  get winnerList() {
    return this.#winnerList;
  }

  get racingHistory() {
    return this.#racingHistory;
  }
}
