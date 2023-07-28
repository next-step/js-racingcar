import Car from "./Car";
import { GAME_INIT_ROUND, TOTAL_GAME_ROUNDS } from "./constants/settings";
import { getRandomNumber } from "./utils/utils";

export default class Game {
  #cars;
  #currRound;
  #winners;

  constructor(carNames) {
    this.#cars = carNames.map((name) => new Car(name));
    this.#currRound = GAME_INIT_ROUND;
  }

  get cars() {
    return this.#cars;
  }

  get currRound() {
    return this.#currRound;
  }

  get winners() {
    return this.#winners;
  }

  playGame() {
    while (this.#currRound <= TOTAL_GAME_ROUNDS) {
      this.playRound();
      this.#currRound += 1;
    }
  }

  playRound() {
    this.#cars.forEach((car) => {
      car.tryMoveWith(getRandomNumber());
    });

    this.#setWinners();
  }

  #setWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));
    this.#winners = this.#cars.filter((car) => car.position === maxPosition);
  }
}
