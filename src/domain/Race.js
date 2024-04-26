import {
  ERROR_DUPLICATE_CAR_NAME,
  ERROR_INVALID_CAR_NAME,
  ERROR_LONG_CAR_NAME,
} from "../constants";
import { getRandom } from "../utils";
import { Car } from "./Car";

export class Race {
  static MOVE_MIN = 0;
  static MOVE_MAX = 9;
  static RACE_ROUND = 5;

  #cars = [];
  #winners = [];

  constructor(names) {
    this.#validateNames(names);
    this.#cars = names.map((carName) => new Car(carName));
  }

  #validateNames(names) {
    if (names.some((carName) => carName === "")) {
      throw new Error(ERROR_INVALID_CAR_NAME);
    }

    if (names.some((carName) => carName.length > Car.CAR_NAME_MAX_LEN)) {
      throw new Error(ERROR_LONG_CAR_NAME);
    }

    const nameSet = new Set(names);
    if (nameSet.size !== names.length) {
      throw new Error(ERROR_DUPLICATE_CAR_NAME);
    }
  }

  race() {
    const result = [];
    for (let round = 1; round <= Race.RACE_ROUND; round++) {
      this.#cars.forEach((car) => {
        car.move(getRandom(Race.MOVE_MIN, Race.MOVE_MAX));
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
