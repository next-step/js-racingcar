import { Car } from "./Car";
import { getRandomIntInclusive, isString } from "./utils";

export const DEFAULT_CONFIG = {
  MAX_NUM_OF_CARS: 5,
  MIN_NUM_OF_CARS: 1,
  MAX_LENGH_OF_CAR_NAME: 5,
  MIN_LENGH_OF_CAR_NAME: 1,
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

  constructor(enteredCarNames) {
    const carNames = this.#parseCarNames(enteredCarNames);
    if (carNames.length < DEFAULT_CONFIG.MIN_NUM_OF_CARS) {
      throw new InvalidCarNamesError(
        "A number of cars were given that are too small to race."
      );
    }
    this.#cars = carNames
      .slice(0, DEFAULT_CONFIG.MAX_NUM_OF_CARS)
      .map((carName) => new Car(carName));
  }

  #parseCarNames(enteredCarNames) {
    if (!isString(enteredCarNames)) {
      throw new InvalidCarNamesError(
        "The given car names value is not a string"
      );
    }
    const carNames = enteredCarNames
      .split(",")
      .map((carName) => carName.trim())
      .filter((carName) => carName);
    const uniqueCarNames = [...new Set(carNames)];
    this.#validateCarNames(uniqueCarNames);
    return uniqueCarNames;
  }

  #validateCarNames(carNames) {
    if (
      carNames.some(
        (carName) => carName.length < DEFAULT_CONFIG.MIN_LENGH_OF_CAR_NAME
      )
    ) {
      throw new InvalidCarNamesError("One or more car names are too short");
    }
    if (
      carNames.some(
        (carName) => carName.length > DEFAULT_CONFIG.MAX_LENGH_OF_CAR_NAME
      )
    ) {
      throw new InvalidCarNamesError("One or more car names are too long");
    }
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
    return this.#cars.map(({ name }) => name);
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

  getWinnerNames() {
    const maxPosition = Math.max(...this.#cars.map(({ position }) => position));
    const winners = this.#cars.filter(
      ({ position }) => position === maxPosition
    );
    return winners.map(({ name }) => name);
  }

  printStatus() {
    console.log(`현재 경주 바퀴: ${this.#currentLap}`);
    this.#cars.forEach((car) =>
      console.log(`${car.name}: ${"-".repeat(car.position)}`)
    );
    console.log("");
  }

  printWinners() {
    if (this.#currentLap !== this.#laps) {
      console.log("아직 경기가 끝나지 않았습니다.");
      return;
    }

    const winners = this.getWinnerNames();
    console.log(`${winners.join(", ")}가 최종 우승하였습니다.`);
  }
}
