import Car from "./Car";
import { generateRandomNumber, compareNumber } from "./utils/number";
import { print } from "./utils/print";
import {
  SEPARATOR,
  TOTAL_ROUND,
  FORWARD_CONDITION,
  FORWARD_INDICATOR,
  RANDOM_NUMBER_MIN,
  RANDOM_NUMBER_MAX,
} from "./contants/racingGame";
import { INFORMATION, NEWLINE } from "./contants/messages";
import { toArray } from "./utils/string";

export default class RacingGame {
  #cars;

  constructor(inputValue) {
    const names = toArray(inputValue, SEPARATOR);

    this.#cars = names.map((name) => {
      return new Car(name);
    });
  }

  get cars() {
    return this.#cars;
  }

  play() {
    print(INFORMATION.STATUS);

    for (let round = 0; round < TOTAL_ROUND; round++) {
      this.#playOneRound();
      print(this.getCarStatuses());
    }
  }

  #playOneRound() {
    this.#cars.forEach((car) => {
      const randomNumber = generateRandomNumber(
        RANDOM_NUMBER_MIN,
        RANDOM_NUMBER_MAX,
      );
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
      return acc + carStatus + NEWLINE;
    }, "");
  }

  getWinnerNames() {
    const winners = this.#determineWinners();
    return winners.map((winner) => winner.name).join(SEPARATOR);
  }

  #determineWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));
    return this.#cars.filter((car) => car.position === maxPosition);
  }
}
