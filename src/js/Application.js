import { Car, RacingGame } from './domain/index.js';
import { Setup, Game, Result } from './infrastructure/index.js';

export default class Application {
  #racingGame;

  constructor() {
    this.#racingGame = new RacingGame();
  }

  render() {
    const $app = document.createElement('div');
    $app.setAttribute('id', 'app');
    $app.replaceChildren(Setup(Car, this.#racingGame), Game(), Result());

    document.body.replaceChildren();
    document.body.insertAdjacentElement('afterbegin', $app);
  }
}
