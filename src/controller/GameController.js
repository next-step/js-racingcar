import { OUTPUT_MESSAGE } from '../constants/message.js';
import { RacingTrack } from '../model/index.js';
import { InputView, OutputView } from '../view/index.js';

class GameController {
  constructor() {
    this.racingTrack = new RacingTrack();
  }

  #printRaceResult() {
    const results = this.racingTrack.getRacingResult();
    OutputView.print(OUTPUT_MESSAGE.RESULT);
    results.forEach((result) => OutputView.print(result + '\n'));
  }

  async #settingRacingCar() {
    const carNames = await InputView.inputCarNames();
    this.racingTrack.setRacingCars(carNames);
  }

  #requestRaceStart() {
    this.racingTrack.race();
  }

  async run() {
    await this.#settingRacingCar();
    this.#requestRaceStart();
    this.#printRaceResult();
  }
}

export default GameController;
