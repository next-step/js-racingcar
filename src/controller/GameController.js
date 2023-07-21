import { RacingTrack } from '../model/index.js';
import { InputView } from '../view/index.js';

class GameController {
  constructor() {
    this.racingTrack = new RacingTrack();
  }

  async run() {
    const carNames = await InputView.inputCarNames();
    this.racingTrack.setRacingCars(carNames);
  }
}

export default GameController;
