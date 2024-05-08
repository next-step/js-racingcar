import {
  INITIAL_CAR_LIST,
  INITIAL_RACING_HISTORY,
  INITIAL_ROUND,
  INITIAL_WINNER_LIST,
  RACING_ROUND,
} from "./racing.constant.js";

export class Racing {
  #round;
  #carList;
  #winnerList;
  #movementRule;
  #racingHistory;

  constructor({ carList = INITIAL_CAR_LIST, movementRule }) {
    this.#carList = carList;
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
    while (this.#round < RACING_ROUND) {
      this.#executeRound();
      this.#updateRacingHistory();
    }
  }

  #executeRound() {
    this.#carList.forEach((car) => {
      if (this.#movementRule()) car.move();
    });
    this.#round++;
  }

  #determineWinnerList() {
    const maxPosition = Math.max(...this.#carList.map((car) => car.position));
    this.#winnerList = this.#carList.filter(
      (car) => car.position === maxPosition
    );
  }

  #updateRacingHistory() {
    const history = this.#carList.map((car) => ({
      name: car.name,
      position: car.position,
    }));
    this.#racingHistory = [...this.#racingHistory, ...history];
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
