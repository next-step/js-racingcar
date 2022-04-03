import { diff, publisher } from './@helper/index.js';
import { Car, RacingGame } from './domain/index.js';
import { Setup, Game, Result } from './infrastructure/index.js';

export default class Application {
  #racingGame;
  #publisher = publisher();

  constructor() {
    this.#racingGame = new RacingGame();
    this.#publisher.subscribe({ render: this.render.bind(this) });
    this.#publisher.notify();
  }

  render() {
    const props = {
      Car,
      RacingGame: this.#racingGame,
      notify: this.#publisher.notify,
    };

    const $root = document.body;
    const $old = $root.firstChild;
    const $new = document.createElement('div');
    $new.setAttribute('id', 'app');
    $new.replaceChildren(Setup(props), Game(props), Result(props));

    diff($root, $old, $new);
  }
}
