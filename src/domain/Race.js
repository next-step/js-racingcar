import { ERROR_CODES } from "../constants";
import { Car } from "./Car";
import { CarError } from "./Error";
import { RandomMoveStrategy } from "./strategies";

export class Race {
  static RACE_ROUND = 5;

  #cars = [];
  #winners = [];
  #strategies = new Map();
  #defaultStrategy = new RandomMoveStrategy();

  constructor(cars, defaultStrategy) {
    this.#cars = cars;
    this.#validateNames(cars.map((car) => car.name));

    if (defaultStrategy) {
      this.#defaultStrategy = defaultStrategy;
    }
  }

  #validateNames(names) {
    if (names.some((name) => name === "")) {
      throw new CarError(ERROR_CODES.ERROR_INVALID_CAR_NAME);
    }

    const nameSet = new Set(names);
    if (nameSet.size !== names.length) {
      throw new CarError(ERROR_CODES.ERROR_DUPLICATE_CAR_NAME);
    }
  }

  race() {
    const result = this.#setRaceResult();
    this.#setWinners();

    return result;
  }

  get cars() {
    return this.#cars;
  }

  get winners() {
    return this.#winners;
  }

  #setWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));
    this.#winners = this.#cars.filter((car) => car.position === maxPosition);
  }

  setStrategyPerRound(round, strategy) {
    this.#strategies.set(round, strategy);
  }

  #setRaceResult() {
    const result = [];
    for (let round = 1; round <= Race.RACE_ROUND; round++) {
      const strategy = this.#strategies.get(round) || this.#defaultStrategy;
      this.#cars.forEach((car) => {
        car.move(strategy.shouldMove);
      });

      result.push({
        round,
        cars: this.#cars.map((car) => ({
          name: car.name,
          position: car.position,
        })),
      });
    }

    return result;
  }
}
