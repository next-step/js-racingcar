import { ERROR_CODES } from "../constants";
import { RaceError } from "./errors";
import { RandomMoveStrategy } from "./strategies";

export class Race {
  #cars = [];
  #winners = [];
  #strategies = new Map();
  #raceRound;

  constructor(cars, round = 1) {
    this.#cars = cars;
    this.#validateNames(cars.map((car) => car.name));
    this.#validateRound(round);
    this.#raceRound = round;
  }

  #validateNames(names) {
    if (!this.isValidEmptyCarName(names)) {
      throw new RaceError(ERROR_CODES.ERROR_INVALID_CAR_NAME);
    }

    if (!this.isValidDuplicateCarName(names)) {
      throw new RaceError(ERROR_CODES.ERROR_DUPLICATE_CAR_NAME);
    }
  }

  #validateRound(round) {
    if (!this.isValidRaceRound(round)) {
      throw new RaceError(ERROR_CODES.ERROR_INVALID_RACE_ROUND);
    }
  }

  race(strategy) {
    const result = this.#getRaceResult(strategy);
    this.#setWinners();

    return result;
  }

  get cars() {
    return this.#cars;
  }

  get winners() {
    return this.#winners;
  }

  get raceRound() {
    return this.#raceRound;
  }

  #setWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));
    this.#winners = this.#cars.filter((car) => car.position === maxPosition);
  }

  setStrategyPerRound(round, strategy) {
    this.#strategies.set(round, strategy);
  }

  #getRaceResult(raceStrategy) {
    const result = [];
    for (let round = 1; round <= this.#raceRound; round++) {
      const strategy = this.#strategies.get(round) || raceStrategy;
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

  isValidEmptyCarName(names) {
    return names.some((name) => name !== "");
  }

  isValidDuplicateCarName(names) {
    const nameSet = new Set(names);
    return nameSet.size === names.length;
  }

  isValidRaceRound(input) {
    return (
      !isNaN(input) && Number(input) >= 0 && Number.isInteger(Number(input))
    );
  }
}
