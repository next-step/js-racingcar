import { ERROR_CODES } from "../constants";
import { Car } from "./Car";

export class Race {
  static RACE_ROUND = 5;

  #cars = [];
  #winners = [];
  #moveStrategy;

  constructor(names, moveStrategy) {
    this.#validateNames(names);
    this.#cars = names.map((name) => new Car(name, moveStrategy));
    this.#moveStrategy = moveStrategy;
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
      this.#cars.forEach((car) => {
        if (this.#moveStrategy) {
          this.#moveStrategy.move(car);
        }
      });

      result.push({
        round,
        cars: this.#cars.map((car) => ({
          name: car.getName(),
          position: car.getPosition(),
        })),
      });
    }

    const maxPosition = Math.max(...this.#cars.map((car) => car.getPosition()));
    this.#winners = this.#cars.filter(
      (car) => car.getPosition() === maxPosition
    );

    return result;
  }

  getCars() {
    return this.#cars;
  }

  getWinners() {
    return this.#winners;
  }
}
