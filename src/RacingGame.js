import Car from "./Car";
import { isDuplicated, isAlphabet } from "./utils/validator";
import { generateRandomNumber } from "./utils/generator";
import { compareNumber } from "./utils/compare";
import { print } from "./utils/print";
import {
  SEPARATOR,
  TOTAL_ROUND,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  FORWARD_CONDITION,
  FORWARD_INDICATOR,
} from "./contants/racingGame";
import { ERROR_CAR_NAME, INFORMATION } from "./contants/messages";

export default class RacingGame {
  #cars;

  constructor() {}

  set cars(inputValue) {
    try {
      const names = inputValue.split(SEPARATOR);

      this.#validateNames(names);

      this.#cars = names.map((name) => {
        return new Car(name);
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  get cars() {
    return this.#cars;
  }

  #validateNames(names) {
    names.forEach((name) => {
      if (name.length > NAME_MAX_LENGTH) {
        throw new Error(ERROR_CAR_NAME.MAX_LENGTH(NAME_MAX_LENGTH));
      }

      if (name.length < NAME_MIN_LENGTH) {
        throw new Error(ERROR_CAR_NAME.MIN_LENGTH(NAME_MIN_LENGTH));
      }

      if (!isAlphabet(name)) {
        throw new Error(ERROR_CAR_NAME.PATTERN);
      }
    });

    if (isDuplicated(names)) {
      throw new Error(ERROR_CAR_NAME.UINIQUE);
    }
  }

  start() {
    print(INFORMATION.STATUS);

    for (let round = 0; round < TOTAL_ROUND; round++) {
      this.#playOneRound();
      print(this.getCarStatuses());
    }
  }

  #playOneRound() {
    this.#cars.forEach((car) => {
      const randomNumber = generateRandomNumber();
      if (compareNumber(randomNumber, FORWARD_CONDITION, ">=")) {
        car.moveForward();
      }
    });
  }

  getCarStatuses() {
    return this.#cars.reduce((acc, car) => {
      const carStatus = `${car.name} : ${FORWARD_INDICATOR.repeat(
        car.position,
      )}`;
      return acc + carStatus + "\n";
    }, "");
  }

  getWinners() {
    const winners = this.#determineWinners();
    const winnerNames = this.getWinnerNames(winners);
    print(INFORMATION.WINNERS(winnerNames));
  }

  #determineWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));
    return this.#cars.filter((car) => car.position === maxPosition);
  }

  getWinnerNames(winners) {
    return winners.map((winner) => winner.name).join(SEPARATOR);
  }
}
