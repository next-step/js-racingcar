import { ERROR_MESSAGE, RACE_CONFIGURE } from '../constants/index';
import { createRaceStatusMessage, createRaceWinnerMessage, printMessage } from '../race/index';
import { generateRandomNumber, isDuplicateArray, isOnlyPositiveNumber } from '../utils/index';

export default class CarRaceOrganizer {
  #minSpeed = 0;
  #maxSpeed = 9;
  #track = '-';

  #totalLap;
  #cars = [];
  #winners = [];
  #lap = 0;

  constructor(cars, totalLap) {
    CarRaceOrganizer.validateDuplicateCarName(cars);
    CarRaceOrganizer.validateTotalLap(totalLap);
    this.#cars = cars;
    this.#totalLap = Number(totalLap);
  }

  get lap() {
    return this.#lap;
  }

  get winners() {
    return this.#winners;
  }

  static validateDuplicateCarName(cars) {
    const carNames = cars.map((car) => car.name);
    if (isDuplicateArray(carNames)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_CAR);
    }
  }

  static validateTotalLap(totalLap) {
    if (!isOnlyPositiveNumber(totalLap)) {
      throw new Error(ERROR_MESSAGE.NOT_RECEIVED_POSITIVE_NUMBER);
    }

    if (totalLap > RACE_CONFIGURE.MAX_LAP) {
      throw new Error(ERROR_MESSAGE.OVER_LAP);
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
