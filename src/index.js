import { GameController } from './controller/index.js';

class App {
  constructor() {
    this.controller = new GameController();
  }

  play() {
    this.controller.run();
  }
}

const app = new App();

app.play();
