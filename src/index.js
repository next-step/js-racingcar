import { GameController } from './Controllers/GameController';
import { View } from './Views';

export class App {
  #gameController;

  constructor() {
    const view = new View();

    this.#gameController = new GameController(view);
  }
}

new App();
