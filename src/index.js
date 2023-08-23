import RacingGame from './domain/RacingGame';
import { GameController } from './view/GameController';

class App {
  #controller;
  constructor() {
    this.#controller = new GameController();
  }

  run() {
    this.#controller.start();
  }
}

new App().run();
