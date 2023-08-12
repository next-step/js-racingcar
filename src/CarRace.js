import {
  DEFAULT_CAR_RACE_CONFIG,
  RACE_MAX_CAR,
  RACE_MIN_CAR,
  RACE_MAX_LAP,
  RACE_MIN_LAP,
} from "./constants";
import { RaceCarCountError, RaceLapCountError } from "./errors";
import { getRandomIntInclusive } from "./utils";

const CAR_RACE_STATE = {
  NOT_INITIALIZED: 0,
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
      return CAR_RACE_STATE.NOT_INITIALIZED;
    }
    if (this.#currentLap === 0) {
      return CAR_RACE_STATE.READY_TO_START;
    }
    if (this.#currentLap === this.#laps) {
      return CAR_RACE_STATE.FINISHED;
    }
    return CAR_RACE_STATE.RUNNING;
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

  start(options = { verbose: true }) {
    if (this.state !== CAR_RACE_STATE.READY_TO_START) {
      throw new Error("Not ready or has been started");
    }
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
    if (this.state !== CAR_RACE_STATE.FINISHED) {
      throw new Error("The race has not been finished");
    }
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
    if (this.state !== CAR_RACE_STATE.FINISHED) {
      console.log("아직 경기가 끝나지 않았습니다.");
      return;
    }
    const winners = this.getWinnerNames();
    console.log(`${winners.join(", ")}가 최종 우승하였습니다.`);
  }
}
