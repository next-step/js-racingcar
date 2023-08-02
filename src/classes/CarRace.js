import { RACE_CONFIGURE } from '../constants/index';
import { generateRandomNumber, printRace, printResult, printCustomMessage } from '../utils/index';

export default class CarRace {
  #cars = [];
  #winners = [];
  #lap = 0;

  #maxLap = RACE_CONFIGURE.MAX_LAP;
  #minSpeed = RACE_CONFIGURE.MIN_SPEED;
  #maxSpeed = RACE_CONFIGURE.MAX_SPEED;
  #moveCondition = RACE_CONFIGURE.MOVE_CONDITION;
  #track = RACE_CONFIGURE.TRACK;

  constructor(cars) {
    this.#cars = cars;
  }

  #isRaceDone() {
    return this.#lap >= this.#maxLap;
  }

  #getDistance() {
    return generateRandomNumber(this.#minSpeed, this.#maxSpeed);
  }

  #isMovable(distance) {
    return distance >= this.#moveCondition;
  }

  #setWinners() {
    const maxMove = this.#cars.reduce((max, car) => (car.moved > max.moved ? car : max), this.#cars[0]).moved;
    this.#winners = this.#cars.filter((car) => car.moved === maxMove).map((car) => car.name);
  }

  getWinners() {
    return this.#winners;
  }

  nextLap() {
    if (!this.#isRaceDone()) {
      printCustomMessage();
      this.#lap += 1;
    }
  }

  race() {
    this.#cars.forEach((car) => {
      const distance = this.#getDistance();
      car.move(this.#isMovable(distance));
    });
  }

  print() {
    this.#cars.forEach((car) => {
      printRace(car.name, car.moved, this.#track);
    });
  }

  result() {
    this.#setWinners();
    printResult(this.#winners);
  }

  isRaceDone() {
    return this.#isRaceDone();
  }

  getLap() {
    return this.#lap;
  }
}
