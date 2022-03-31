import { Car, RacingGame } from './domain/index.js';
import { Setup, Game, Result } from './infrastructure/index.js';

export default class Application {
  #car;
  #racingGame;

  constructor() {
    this.#car = new Car();
    this.#racingGame = new RacingGame();
  }

  render() {
    const $app = document.createElement('div');
    $app.setAttribute('id', 'app');
    $app.replaceChildren(Setup(), Game(), Result());

    document.body.replaceChildren();
    document.body.insertAdjacentElement('afterbegin', $app);
  }
}
