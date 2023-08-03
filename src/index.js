import { GameController } from './Controllers/GameController';
import { RacingGame } from './Domains';

export class App {
  #gameController;

  constructor() {
    const model = new RacingGame();
    const view = new View();

    this.#gameController = new GameController(model, view);
  }
}

new App();
