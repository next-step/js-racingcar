import RacingGameModel from '../models/racingGame.model.js';

/**
 * 게임에서는 랜덤으로 주사위를 굴릴 수 있어야 한다.
 */
export default class RacingGameService {
  #racingGame;

  constructor() {
    this.#racingGame = RacingGameModel;
  }

  getWinnedCars() {
    const winnedCount = Math.max(...this.#racingGame.cars.map(car => car.moveCount));
    const winnedCars = this.#racingGame.cars.filter(car => car.moveCount === winnedCount);
    return winnedCars;
  }

  setRacingGame({ cars, tryCount }) {
    this.#racingGame.cars = cars;
    this.#racingGame.tryCount = tryCount;
  }
}
