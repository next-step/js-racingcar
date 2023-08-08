import Car from '../Car/index.js';
import { getRandomInRange } from '../utils/getRandomInRange.js';

class RacingGame {
  /**
   * 전진 조건.
   * 해당 값 이상이면 전진할 수 있음.
   */
  static MOVE_FORWARD_THRESHOLD = 4;

  static DEFAULT_MAX_ROUNDS = 5;

  static ERROR_MESSAGE = {
    NO_CAR_INSTACE: 'Car 클래스가 아닙니다.',
    INVALID_MAX_ROUNDS: 'Max Round가 숫자가 아닙니다.',
  };

  #cars;
  #rounds;
  #maxRounds;
  #records;

  constructor(cars, maxRounds = RacingGame.DEFAULT_MAX_ROUNDS) {
    this.validate(cars, maxRounds);

    this.#cars = cars;
    this.#rounds = 0;
    this.#maxRounds = maxRounds;
    this.#records = [];
  }

  validate(cars, maxRounds) {
    if (!cars?.every((car) => car instanceof Car)) {
      throw new Error(RacingGame.ERROR_MESSAGE.NO_CAR_INSTACE);
    }

    if (typeof maxRounds !== 'number') {
      throw new Error(RacingGame.ERROR_MESSAGE.INVALID_MAX_ROUNDS);
    }
  }

  get cars() {
    return this.#cars;
  }

  get rounds() {
    return this.#rounds;
  }

  get records() {
    return this.#records;
  }

  get carsRecord() {
    return this.#cars.map((car) => ({
      name: car.name,
      distanceDriven: car.distanceDriven,
    }));
  }

  get maxDistanceDriven() {
    return Math.max(...this.#cars.map((car) => car.distanceDriven));
  }

  get winningCars() {
    return this.#cars.filter(
      (car) => car.distanceDriven === this.maxDistanceDriven
    );
  }

  canMoveForward() {
    return getRandomInRange() >= RacingGame.MOVE_FORWARD_THRESHOLD;
  }

  saveCurrentRecord() {
    this.#records.push(this.carsRecord);
  }

  runRound() {
    this.#rounds = this.#rounds + 1;

    this.#cars.forEach((car) => {
      if (this.canMoveForward()) {
        car.moveForward();
      }
    });
    this.saveCurrentRecord();
  }

  startRace() {
    for (let i = 0; i < this.#maxRounds; i++) {
      this.runRound();
    }
  }
}

export default RacingGame;
