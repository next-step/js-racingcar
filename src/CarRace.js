import { Car } from "./Car";
import { getRandomIntInclusive, isString } from "./utils";

export const DEFAULT_CONFIG = {
  MAX_NUM_OF_CARS: 5,
  MIN_NUM_OF_CARS: 1,
  MIN_RANDOM_NUMBER: 0,
  MAX_RANDOM_NUMBER: 9,
  RACE_LAPS: 5,
};

export class InvalidCarNamesError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidCarNamesError";
  }
}

export class CarRace {
  #cars = [];
  #laps = DEFAULT_CONFIG.RACE_LAPS;
  #currentLap = 0;

  constructor(rawCarNames) {
    const carNames = this.#parseCarNames(rawCarNames);
    if (carNames.length < DEFAULT_CONFIG.MIN_NUM_OF_CARS) {
      throw new InvalidCarNamesError(
        "A number of cars were given that are too small to race."
      );
    }
    this.#cars = carNames
      .slice(0, DEFAULT_CONFIG.MAX_NUM_OF_CARS)
      .map((carName) => new Car(carName));
  }

  #parseCarNames(rawCarNames) {
    if (!isString(rawCarNames)) {
      throw new InvalidCarNamesError(
        "The given car names value is not a string"
      );
    }
    const carNames = rawCarNames
      .split(",")
      .map((carName) => carName.trim())
      .filter((carName) => carName);
    return [...new Set(carNames)];
  }

  #race() {
    this.#cars.forEach((car) =>
      car.move(
        getRandomIntInclusive(
          DEFAULT_CONFIG.MIN_RANDOM_NUMBER,
          DEFAULT_CONFIG.MAX_RANDOM_NUMBER
        )
      )
    );
    this.#currentLap += 1;
  }

  getCarNames() {
    return this.#cars.map((car) => car.name);
  }

  run(options = { verbose: true }) {
    while (this.#currentLap < this.#laps) {
      this.#race();
      if (options?.verbose) {
        this.printStatus();
      }
    }
    if (options?.verbose) {
      this.printWinners();
    }
  }

  getWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));
    const winners = this.#cars.filter((car) => car.position === maxPosition);
    return winners.map((car) => car.name);
  }

  printStatus() {
    console.log(`현재 경주 바퀴: ${this.#currentLap}`);
    this.#cars.forEach((car) =>
      console.log(`${car.name}: ${"-".repeat(car.position)}`)
    );
    console.log("");
  }

  printWinners() {
    if (this.#currentLap === this.#laps) {
      const winners = this.getWinners();
      console.log(`${winners.join(", ")}가 최종 우승하였습니다.`);
    } else {
      console.log("아직 경기가 끝나지 않았습니다.");
    }
  }
}
