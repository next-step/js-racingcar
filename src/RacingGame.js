import Car from "./Car";
import { isDuplicated, isAlphabet } from "./utils/validator";
import { generateRandomNumber } from "./utils/generator";
import { print } from "./utils/print";
import {
  SEPARATOR,
  TOTAL_ROUND,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from "./contants/racingGame";
import { ERROR_MSG, RESULT_TITLE_MSG, WINNER_MSG } from "./contants/messages";

export default class RacingGame {
  #cars;

  constructor() {}

  setCars(inputValue) {
    try {
      const names = inputValue.split(SEPARATOR);

      this.validateNames(names);

      this.#cars = names.map((name) => {
        return new Car(name);
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  getCars() {
    return this.#cars;
  }

  validateNames(names) {
    names.forEach((name) => {
      if (name.length > NAME_MAX_LENGTH) {
        throw new Error(ERROR_MSG.MAX_LENGTH(NAME_MAX_LENGTH));
      }

      if (name.length < NAME_MIN_LENGTH) {
        throw new Error(ERROR_MSG.MIN_LENGTH(NAME_MIN_LENGTH));
      }

      if (!isAlphabet(name)) {
        throw new Error(ERROR_MSG.PATTERN);
      }
    });

    if (isDuplicated(names)) {
      throw new Error(ERROR_MSG.UINIQUE);
    }
  }

  start() {
    print(RESULT_TITLE_MSG);

    for (let round = 0; round < TOTAL_ROUND; round++) {
      this.playOneRound();
      print(this.getCarStatuses());
    }
  }

  playOneRound() {
    this.#cars.forEach((car) => {
      const condition = generateRandomNumber();
      car.move(condition);
    });
  }

  getCarStatuses() {
    return this.#cars.reduce((acc, car) => {
      return acc + car.getStatus() + "\n";
    }, "");
  }

  getWinners() {
    const winners = this.determineWinners();
    const winnerNames = this.getWinnerNames(winners);
    print(WINNER_MSG(winnerNames));
  }

  determineWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.getPosition()));
    return this.#cars.filter((car) => car.getPosition() === maxPosition);
  }

  getWinnerNames(winners) {
    return winners.map((winner) => winner.getName()).join(SEPARATOR);
  }
}
