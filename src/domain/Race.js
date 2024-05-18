import { ERROR_CODES } from "../constants";
import { Car } from "./Car";
import { RaceError } from "../errors";

export class Race {
  #cars = [];
  #winners = [];
  #raceRound = new Map();

  constructor(cars, round = 1, strategies = new Map()) {
    this.#of(cars);
    this.#validateNames(this.#cars.map((car) => car.name));
    this.#validateRound(round);
    this.#ofRoundMap(round, strategies);
  }

  #of(cars) {
    if (Array.isArray(cars)) {
      if (cars.every((car) => car instanceof Car)) {
        this.#ofCars(cars);
      } else if (cars.every((car) => typeof car === "string")) {
        this.#ofNames(cars);
      }
    } else if (typeof cars === "string") {
      this.#ofString(cars);
    }
  }

  #ofRoundMap(round, strategies) {
    const roundMap = new Map();
    for (let i = 1; i <= round; i++) {
      roundMap.set(i, strategies.get(i));
    }
    this.#raceRound = roundMap;
  }

  #ofString(cars) {
    this.#ofNames(cars.split(","));
  }

  #ofNames(cars) {
    this.#ofCars(cars.map((name) => new Car(name.trim())));
  }

  #ofCars(cars) {
    this.#cars = cars;
  }

  #validateNames(names) {
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

  #getRaceResult(raceStrategy) {
    const result = [];
    console.log("size", this.#raceRound.size);
    for (let round = 1; round <= this.#raceRound.size; round++) {
      const strategy = this.#raceRound.get(round) || raceStrategy;
      console.log("strategy", strategy);
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
