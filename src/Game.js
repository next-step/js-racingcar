import Car from "./Car";
import {
  GAME_INIT_ROUND,
  INPUT_ERROR_MESSAGE,
  TOTAL_GAME_ROUNDS,
} from "./constants/game";
import { getRandomNumber } from "./utils/utils";

export default class Game {
  #cars;
  #currRound;
  #playRoundCalls;
  #roundHistory;
  #winners;

  // setGame
  constructor(userInput) {
    this.#validateUserInput(userInput);

    const carNames = this.#parseCarNames(userInput);

    this.#cars = carNames.map((carName) => new Car(carName));
    this.#currRound = GAME_INIT_ROUND;
    this.#playRoundCalls = 0;
    this.#roundHistory = [];
    this.#winners = [];
  }

  #validateUserInput(userInput) {
    if (!userInput) throw new Error(INPUT_ERROR_MESSAGE.EMPTY_INPUT);

    return;
  }

  #parseCarNames(userInput) {
    const SPLIT_SYM = ", ";
    return userInput.split(SPLIT_SYM).map((carName) => carName.trim());
  }

  get cars() {
    return this.#cars;
  }

  get currRound() {
    return this.#currRound;
  }

  get playRoundCalls() {
    return this.#playRoundCalls;
  }

  get roundHistory() {
    return this.#roundHistory;
  }

  get winners() {
    return this.#winners;
  }

  #saveRoundHistory() {
    const roundCarsHistory = this.#cars.map(
      (car) => new Car(car.name, car.position)
    );

    this.#roundHistory.push(roundCarsHistory);
  }

  #playRound() {
    this.#cars.forEach((car) => {
      car.tryMoveWith(getRandomNumber());
    });

    this.#playRoundCalls += 1;

    this.#saveRoundHistory();
  }

  #setWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));
    this.#winners = this.#cars.filter((car) => car.position === maxPosition);
  }

  play() {
    while (this.#currRound <= TOTAL_GAME_ROUNDS) {
      this.#playRound();
      this.#currRound += 1;
    }

    this.#setWinners();
  }
}
