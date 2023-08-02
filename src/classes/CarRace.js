import { RACE_CONFIGURE } from '../constants/index';
import { createRaceStatusMessage, createRaceWinnerMessage, printMessage } from '../raceViewer';
import { generateRandomNumber } from '../utils/index';

export default class CarRace {
  #cars = [];
  #winners = [];
  #lap = 0;

  #maxLap = RACE_CONFIGURE.MAX_LAP;
  #minSpeed = RACE_CONFIGURE.MIN_SPEED;
  #maxSpeed = RACE_CONFIGURE.MAX_SPEED;
  #track = RACE_CONFIGURE.TRACK;

  constructor(cars) {
    this.#cars = cars;
  }

  get lap() {
    return this.#lap;
  }

  get winners() {
    return this.#winners;
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

  race() {
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
