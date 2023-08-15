import { ERROR_MESSAGE, RACE_CONFIGURE } from '../constants/index';
import { generateRandomNumber, isDuplicateArray, isOnlyPositiveNumber } from '../../utils/index';

export default class CarRaceOrganizer {
  #totalLap;
  #history = [];
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

  get history() {
    return this.#history;
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
    const { MIN_SPEED, MAX_SPEED } = RACE_CONFIGURE;
    return generateRandomNumber(MIN_SPEED, MAX_SPEED);
  }

  #setHistory() {
    this.#history.push({
      lap: this.#lap,
      cars: this.#cars.map((car) => ({ car: car.name, distance: car.moved }))
    });
  }

  #setWinners() {
    const maxMove = this.#cars.reduce((max, car) => (car.moved > max.moved ? car : max), this.#cars[0]).moved;
    this.#winners = this.#cars.filter((car) => car.moved === maxMove).map((car) => car.name);
  }

  #moveCarsByDistance() {
    this.#cars.forEach((car) => {
      const distance = this.#getDistance();
      car.move(distance);
    });
  }

  runFullRace() {
    if (this.#isRaceDone()) {
      this.stopRace();
      return;
    }

    this.#moveCarsByDistance();
    this.#nextLap();
    this.#setHistory();
    this.runFullRace();
  }

  #nextLap() {
    if (!this.#isRaceDone()) {
      this.#lap += 1;
    }
  }

  stopRace() {
    this.#setWinners();
  }
}
