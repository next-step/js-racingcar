import {
  DUPLICATE_NAME,
  MIN_CAR_COUNT_NOT_REACHED,
} from "../constants/ErrorMessages";
import {
  CAR_RUN_THRESHOLD,
  RACE_MAX_ROLL_NUMBER,
  RACE_MIN_CAR_COUNT,
  RACE_MIN_ROLL_NUMBER,
} from "../constants/Numbers";
import { getRandomInt } from "../utils";

class Race {
  #cars;
  #winners;

  constructor(cars) {
    this.#validateRace(cars);

    this.#cars = cars;
  }

  #validateRace(cars) {
    const carNameArr = cars.map((car) => car.getName());
    const carNameSet = new Set(carNameArr);

    if (carNameArr.length < RACE_MIN_CAR_COUNT) {
      throw Error(MIN_CAR_COUNT_NOT_REACHED);
    }

    if (carNameArr.length !== carNameSet.size) {
      throw Error(DUPLICATE_NAME);
    }
  }

  getCars() {
    return this.#cars;
  }

  getWinners() {
    return this.#winners;
  }

  getMaxPosition() {
    const maxPosition = this.#cars.reduce((prev, cur) => {
      if (cur.getPosition() >= prev) return cur.getPosition();
      return prev;
    }, 0);

    return maxPosition;
  }

  playOneRound() {
    this.#cars.forEach((car) => {
      if (
        getRandomInt(RACE_MIN_ROLL_NUMBER, RACE_MAX_ROLL_NUMBER) >=
        CAR_RUN_THRESHOLD
      )
        car.move();
    });
  }

  pickWinners() {
    const maxPosition = this.getMaxPosition();

    const winners = this.#cars.reduce((prev, cur) => {
      if (cur.getPosition() === maxPosition) return [...prev, cur];
      return prev;
    }, []);

    this.#winners = winners;
  }
}

export default Race;
