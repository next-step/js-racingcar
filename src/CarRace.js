import { Car } from "./Car";

export const MAX_NUM_OF_CARS = 5;
export const MIN_NUM_OF_CARS = 1;
export const MIN_RANDOM_NUMBER = 0;
export const MAX_RANDOM_NUMBER = 9;

export const DEFAULT_LAPS = 5;

const getRandomIntInclusive = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  // The maximum is exclusive and the minimum is inclusive
  // return Math.floor(Math.random() * (maxInt - minInt) + minInt);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
};

export class CarRace {
  #cars = [];
  #laps = DEFAULT_LAPS;
  #currentLap = 0;
  init(rawCarNames) {
    const carNames = this.parseCarNames(rawCarNames);
    if (carNames.length < MIN_NUM_OF_CARS) {
      throw new Error(
        "A number of cars were given that are too small to race."
      );
    }
    this.#cars = carNames
      .slice(0, MAX_NUM_OF_CARS)
      .map((carName) => new Car(carName));
  }

  parseCarNames(rawCarNames) {
    const carNames = rawCarNames
      .split(",")
      .map((carName) => carName.trim())
      .filter((carName) => carName);
    return [...new Set(carNames)];
  }

  getCarNames() {
    return this.#cars.map((car) => car.name);
  }

  #race() {
    this.#cars.forEach((car) =>
      car.move(getRandomIntInclusive(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER))
    );
    this.#currentLap += 1;
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

  getWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));
    const winners = this.#cars.filter((car) => car.position === maxPosition);
    return winners.map((car) => car.name);
  }

  printStatus() {
    console.log(`현재 경주 바퀴: ${this.#currentLap}`);
    this.#cars.forEach((car) =>
      console.log(`${car.name}: ${"-".repeat(car.position)}`)
    );
    console.log("");
  }

  printWinners() {
    if (this.#currentLap === this.#laps) {
      const winners = this.getWinners();
      console.log(`${winners.join(", ")}가 최종 우승하였습니다.`);
    } else {
      console.log("아직 경기가 끝나지 않았습니다.");
    }
  }
}
