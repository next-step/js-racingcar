import { ERROR_CODES } from "../constants";
import { Car } from "./Car";

export class Race {
  static RACE_ROUND = 5;

  #cars = [];
  #winners = [];
  #strategies = new Map();
  #defaultStrategy;

  constructor(names, defaultStrategy) {
    this.#validateNames(names);
    this.#cars = names.map((name) => new Car(name, defaultStrategy));
    this.#defaultStrategy = defaultStrategy;
  }

  #validateNames(names) {
    if (names.some((name) => name === "")) {
      throw new Error(ERROR_CODES.ERROR_INVALID_CAR_NAME);
    }

    const nameSet = new Set(names);
    if (nameSet.size !== names.length) {
      throw new Error(ERROR_CODES.ERROR_DUPLICATE_CAR_NAME);
    }
  }

  race() {
    const result = [];
    for (let round = 1; round <= Race.RACE_ROUND; round++) {
      const strategy = this.#strategies.get(round) || this.#defaultStrategy;
      this.#cars.forEach((car) => {
        car.setStrategy(strategy);
        car.move();
      });

      result.push({
        round,
        cars: this.#cars.map((car) => ({
          name: car.getName(),
          position: car.getPosition(),
        })),
      });
    }

    this.#setWinners();

    return result;
  }

  getCars() {
    return this.#cars;
  }

  getWinners() {
    return this.#winners;
  }

  #setWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.getPosition()));
    this.#winners = this.#cars.filter(
      (car) => car.getPosition() === maxPosition
    );
  }

  setStrategyPerRound(round, strategy) {
    this.#strategies.set(round, strategy);
  }
}
