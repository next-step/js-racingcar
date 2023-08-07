import { getRandomInRange } from '../utils/getRandomInRange.js';

class RacingGame {
  /**
   * 전진 조건.
   * 해당 값 이상이면 전진할 수 있음.
   */
  static MOVE_FORWARD_THRESHOLD = 4;

  static DEFAULT_MAX_ROUNDS = 5;

  #cars;
  #rounds;
  #maxRounds;
  #records;

  constructor(cars, maxRounds = RacingGame.DEFAULT_MAX_ROUNDS) {
    this.#cars = cars;
    this.#rounds = 0;
    this.#maxRounds = maxRounds;
    this.#records = [];
  }

  getCars() {
    return this.#cars;
  }

  getRounds() {
    return this.#rounds;
  }

  getRecords() {
    return this.#records;
  }

  getCarsRecord() {
    return this.#cars.map((car) => ({
      name: car.getName(),
      distanceDriven: car.getDistanceDriven(),
    }));
  }

  getMaxDistanceDriven() {
    return Math.max(...this.#cars.map((car) => car.getDistanceDriven()));
  }

  getWinningCars() {
    const maxDistance = this.getMaxDistanceDriven();

    return this.#cars.filter((car) => car.getDistanceDriven() === maxDistance);
  }

  canMoveForward() {
    return getRandomInRange() >= RacingGame.MOVE_FORWARD_THRESHOLD;
  }

  saveCurrentRecord() {
    this.#records.push(this.getCarsRecord());
  }

  runRound() {
    this.#rounds = this.#rounds + 1;

    this.#cars.forEach((car) => car.moveForward());
    this.saveCurrentRecord();
  }

  startRace() {
    for (let i = 0; i < this.#maxRounds; i++) {
      this.runRound();
    }
  }
}

export default RacingGame;
