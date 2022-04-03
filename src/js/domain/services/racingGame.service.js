import { generateRandomNumbers } from '../../@helper/index.js';
import { DICE_RANGE, MOVE_CONDITION } from '../../constants.js';
import RacingGameModel from '../models/racingGame.model.js';

export default class RacingGameService {
  #racingGame;

  constructor() {
    this.#racingGame = RacingGameModel();
  }

  getCars() {
    return this.#racingGame.cars;
  }

  getTryCount() {
    return this.#racingGame.tryCount;
  }

  getWinnedCars() {
    if (this.isFinished()) return null;

    const winnedCount = Math.max(...this.#racingGame.cars.map(car => car.getMoveCount));
    const winnedCars = this.#racingGame.cars.filter(car => car.getMoveCount === winnedCount);
    return winnedCars;
  }

  setCars(cars) {
    this.#racingGame.cars = cars;
  }

  setTryCount(tryCount) {
    this.#racingGame.tryCount = tryCount;
  }

  isFinished() {
    return this.#racingGame.cars.every(car => car.getMoveCount() !== 0);
  }

  readyCars() {
    this.#racingGame.cars.forEach(car => car.initMoveCount());
  }

  startGame() {
    const randomNumberRange = {
      count: this.#racingGame.tryCount,
      min: DICE_RANGE.MIN,
      max: DICE_RANGE.MAX,
    };

    this.readyCars();
    this.#racingGame.cars.forEach(car => {
      const diceNumbers = generateRandomNumbers(randomNumberRange);
      diceNumbers.forEach(dice => {
        if (dice < MOVE_CONDITION) return;
        car.moveForward();
      });
    });
  }
}
