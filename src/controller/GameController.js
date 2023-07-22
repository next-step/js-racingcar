import { OUTPUT_MESSAGE } from '../constants/message.js';
import { RacingTrack, RacingWinners } from '../model/index.js';
import { InputView, OutputView } from '../view/index.js';

class GameController {
  constructor() {
    this.racingTrack = new RacingTrack();
    this.racingWinners = new RacingWinners();
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

  #requestRacingWinners() {
    const results = this.racingTrack.getRacingResult();
    this.racingWinners.setRacingWinners(results);
    return this.racingWinners.getRacingWinners();
  }

  #printRacingWinners() {
    const winners = this.#requestRacingWinners();
    OutputView.print(OUTPUT_MESSAGE.WINNERS(winners));
  }

  async run() {
    await this.#settingRacingCar();
    this.#requestRaceStart();
    this.#printRaceResult();
    this.#printRacingWinners();
  }
}

export default GameController;
