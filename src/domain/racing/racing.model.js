import {
  INITIAL_CAR_LIST,
  INITIAL_ROUND,
  INITIAL_WINNER_LIST,
  RACING_ROUND,
} from "./racing.constant.js";

export class Racing {
  #round;
  #carList;
  #winnerList;
  #movementRule;

  constructor({ carList = INITIAL_CAR_LIST, movementRule }) {
    this.#carList = carList;
    this.#movementRule = movementRule;
    this.#round = INITIAL_ROUND;
    this.#winnerList = INITIAL_WINNER_LIST;
  }

  start() {
    this.#race();
    this.#determineWinnerList();
  }

  #race() {
    while (this.#round < RACING_ROUND) {
      this.#executeRound();
    }
  }

  #executeRound() {
    this.#carList.forEach((car) => {
      car.move(this.#movementRule());
    });
    this.#round++;
  }

  #determineWinnerList() {
    const maxPosition = Math.max(...this.#carList.map((car) => car.position));
    this.#winnerList = this.#carList.filter(
      (car) => car.position === maxPosition
    );
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
}
