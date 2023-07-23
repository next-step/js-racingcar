import { GameController } from './Controllers/GameController';
import { Car, Model } from './Models';
import { InputView, OutputView, View } from './Views';

export class App {
  #gameController;

  constructor() {
    const model = new Model(new Car());
    const view = new View(InputView, OutputView);

    this.#gameController = new GameController(model, view);
  }

  playGame() {
    this.#gameController.play();
  }
}

const app = new App();
app.playGame();
