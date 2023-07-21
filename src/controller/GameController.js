import { RacingCar } from "../model/index.js";
import { InputView } from "../view/index.js";

class GameController {
  constructor() {
    this.racingCar = new RacingCar();
  }

  async run() {
    const carNames = await InputView.inputCarNames();
    this.racingCar.setRacingCars(carNames);
  }
}

export default GameController;
