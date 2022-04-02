import { generateRandomNumbers } from '../../@helper/index.js';
import { DICE_RANGE, MOVE_CONDITION } from '../../constants.js';
import RacingGameModel from '../models/racingGame.model.js';

/**
 * 게임에서는 랜덤으로 주사위를 굴릴 수 있어야 한다.
 */
export default class RacingGameService {
  #racingGame;

  constructor() {
    this.#racingGame = RacingGameModel();
  }

  getWinnedCars() {
    const winnedCount = Math.max(...this.#racingGame.cars.map(car => car.moveCount));
    const winnedCars = this.#racingGame.cars.filter(car => car.moveCount === winnedCount);
    return winnedCars;
  }

  getCars() {
    return this.#racingGame.cars;
  }

  getTryCount() {
    return this.#racingGame.maxTryCount;
  }

  setCars(cars) {
    this.#racingGame.cars = cars;
  }

  setTryCount(tryCount) {
    this.#racingGame.maxTryCount = tryCount;
  }

  readyCars() {
    this.#racingGame.cars.forEach(car => car.initMoveCount());
  }

  startGame() {
    const randomNumberRange = {
      count: this.#racingGame.maxTryCount,
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
