import { Car, RacingGame } from './domain/index.js';

export default class Application {
  #car;
  #racingGame;

  constructor() {
    this.#car = new Car();
    this.#racingGame = new RacingGame();
  }
}
