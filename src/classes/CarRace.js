import { RACE_CONFIGURE, ERROR_MESSAGE } from '../constants/index';
import { createRaceStatusMessage, createRaceWinnerMessage, printMessage } from '../race/index';
import { generateRandomNumber, isDuplicateArray } from '../utils/index';

export default class CarRace {
  #cars = [];
  #winners = [];
  #lap = 0;

  #maxLap = RACE_CONFIGURE.MAX_LAP;
  #minSpeed = RACE_CONFIGURE.MIN_SPEED;
  #maxSpeed = RACE_CONFIGURE.MAX_SPEED;
  #track = RACE_CONFIGURE.TRACK;

  constructor(cars) {
    this.#validateDuplicateCarName(cars);
    this.#cars = cars;
  }

  get lap() {
    return this.#lap;
  }

  get winners() {
    return this.#winners;
  }

  #validateDuplicateCarName(cars) {
    const carNames = cars.map((car) => car.name);
    if (isDuplicateArray(carNames)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_CAR);
    }
  }

  #isRaceDone() {
    return this.#lap >= this.#maxLap;
  }

  #getDistance() {
    return generateRandomNumber(this.#minSpeed, this.#maxSpeed);
  }

  #setWinners() {
    const maxMove = this.#cars.reduce((max, car) => (car.moved > max.moved ? car : max), this.#cars[0]).moved;
    this.#winners = this.#cars.filter((car) => car.moved === maxMove).map((car) => car.name);
  }

  isRaceDone() {
    return this.#isRaceDone();
  }

  runFullRace() {
    while (!this.#isRaceDone()) {
      this.runSingleRace();
      this.printRace();
      this.nextLap();
    }
    this.printWinners();
  }

  runSingleRace() {
    this.#cars.forEach((car) => {
      const distance = this.#getDistance();
      car.move(distance);
    });
  }

  nextLap() {
    if (!this.#isRaceDone()) {
      printMessage();
      this.#lap += 1;
    }
  }

  printRace() {
    this.#cars.forEach((car) => {
      printMessage(createRaceStatusMessage(car.name, car.moved, this.#track));
    });
  }

  printWinners() {
    this.#setWinners();
    printMessage(createRaceWinnerMessage(this.#winners));
  }
}
