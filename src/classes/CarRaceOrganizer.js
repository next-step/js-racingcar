import { RACE_CONFIGURE, ERROR_MESSAGE } from '../constants/index';
import { createRaceStatusMessage, createRaceWinnerMessage, printMessage } from '../race/index';
import { generateRandomNumber, isDuplicateArray, isOnlyNumber } from '../utils/index';

export default class CarRaceOrganizer {
  #minSpeed = RACE_CONFIGURE.MIN_SPEED;
  #maxSpeed = RACE_CONFIGURE.MAX_SPEED;
  #track = RACE_CONFIGURE.TRACK;

  #totalLap;
  #cars = [];
  #winners = [];
  #lap = 0;

  constructor(cars, totalLap) {
    this.#validateDuplicateCarName(cars);
    this.#validateLap(totalLap);
    this.#cars = cars;
    this.#totalLap = Number(totalLap);
  }

  get lap() {
    return this.#lap;
  }

  get winners() {
    return this.#winners;
  }

  #validateLap(totalLap) {
    if (!isOnlyNumber(totalLap)) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMBER);
    }
  }

  #validateDuplicateCarName(cars) {
    const carNames = cars.map((car) => car.name);
    if (isDuplicateArray(carNames)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_CAR);
    }
  }

  #isRaceDone() {
    return this.#lap >= this.#totalLap;
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
