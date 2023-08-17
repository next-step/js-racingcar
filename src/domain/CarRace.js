import {
  DEFAULT_CAR_RACE_CONFIG,
  RACE_MAX_CAR,
  RACE_MIN_CAR,
  RACE_MAX_LAP,
  RACE_MIN_LAP,
} from "../constants";
import {
  RaceCarCountError,
  RaceLapCountError,
  RaceStateError,
} from "../errors";
import { getRandomIntInclusive } from "../utils";

const CAR_RACE_STATE = {
  NOT_READY: 0,
  READY_TO_START: 1,
  RUNNING: 2,
  FINISHED: 3,
};

export class CarRace {
  #cars = [];
  #laps = DEFAULT_CAR_RACE_CONFIG.RACE_LAPS;
  #currentLap = 0;

  get currentLap() {
    return this.#currentLap;
  }

  get laps() {
    return this.#laps;
  }

  get state() {
    if (this.#cars.length === 0) {
      return CAR_RACE_STATE.NOT_READY;
    }
    if (this.#currentLap === 0) {
      return CAR_RACE_STATE.READY_TO_START;
    }
    if (this.#currentLap === this.#laps) {
      return CAR_RACE_STATE.FINISHED;
    }
    return CAR_RACE_STATE.RUNNING;
  }

  get isFinished() {
    return this.#currentLap > 0 && this.#currentLap === this.#laps;
  }

  #race() {
    this.#cars.forEach((car) => {
      const randomNumber = getRandomIntInclusive(
        DEFAULT_CAR_RACE_CONFIG.MIN_RANDOM_NUMBER,
        DEFAULT_CAR_RACE_CONFIG.MAX_RANDOM_NUMBER
      );
      car.move(randomNumber);
    });
    this.#currentLap += 1;
  }

  getCarNames() {
    return this.#cars.map(({ name }) => name);
  }

  getCurrentPositions() {
    return this.#cars.map(({ name, position }) => ({ name, position }));
  }

  setCars(cars) {
    if (cars.length < RACE_MIN_CAR || cars.length > RACE_MAX_CAR) {
      throw new RaceCarCountError("Invalid number of cars");
    }
    this.#cars = cars;
  }

  setLaps(laps) {
    if (laps < RACE_MIN_LAP || laps > RACE_MAX_LAP) {
      throw new RaceLapCountError("Invalid number of laps");
    }
    this.#laps = laps;
  }

  start(laps) {
    if (
      this.state !== CAR_RACE_STATE.READY_TO_START &&
      this.state !== CAR_RACE_STATE.RUNNING
    ) {
      throw new RaceStateError(`Cannot start race in the state ${this.state}`);
    }
    laps = laps || this.#laps;
    let lapCount = 0;
    while (lapCount < laps && this.#currentLap < this.#laps) {
      this.#race();
      lapCount += 1;
    }
  }

  getWinnerNames() {
    if (this.state !== CAR_RACE_STATE.FINISHED) {
      throw new RaceStateError("The race has not been finished");
    }
    const maxPosition = Math.max(...this.#cars.map(({ position }) => position));
    const winners = this.#cars.filter(
      ({ position }) => position === maxPosition
    );
    return winners.map(({ name }) => name);
  }
}
