import { getRandomInRange } from '../utils/getRandomInRange';

class RacingGame {
  /**
   * 전진 조건.
   * 해당 값 이상이면 전진할 수 있음.
   */
  static MOVE_FORWARD_THRESHOLD = 4;

  #cars;
  #rounds;

  constructor(cars) {
    this.#cars = cars;
    this.#rounds = 0;
  }

  getCars() {
    return this.#cars;
  }

  getRounds() {
    return this.#rounds;
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

  runRound() {
    this.#rounds = this.#rounds + 1;

    this.#cars.forEach((car) => car.moveForward());
  }
}

export default RacingGame;
