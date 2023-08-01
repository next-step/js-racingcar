import { INPUT_MESSAGE, OUTPUT_MESSAGE } from '../constants/message.js';
import { RacingGame } from '../model/index.js';
import { InputView, OutputView } from '../view/index.js';

class GameController {
  constructor() {
    this.racingGame = new RacingGame();
  }

  static async #getRacingCarNames() {
    const racingCarNames = await InputView.input(INPUT_MESSAGE.RACING_CAR);
    return racingCarNames;
  }

  static #printRaceResult(results) {
    OutputView.print(OUTPUT_MESSAGE.RESULT);
    results.forEach((result) => {
      OutputView.print(`${result}\n`);
    });
  }

  static #printRacingWinners(winners) {
    OutputView.print(OUTPUT_MESSAGE.WINNERS(winners));
  }

  #getRacingResult() {
    return this.racingGame.getRacingResult();
  }

  #getRacingWinners() {
    return this.racingGame.getRacingWinners();
  }

  #updateRacingCars(racingCarNames) {
    this.racingGame.requestInitMoveStatus(racingCarNames);
  }

  #startRace(carNames) {
    this.racingGame.race(carNames);
  }

  static #printGameResult(result, racingWinners) {
    GameController.#printRaceResult(result);
    GameController.#printRacingWinners(racingWinners);
  }

  async run() {
    const racingCarNames = await GameController.#getRacingCarNames();
    this.#updateRacingCars(racingCarNames);
    this.#startRace(racingCarNames);
    const result = this.#getRacingResult();
    const racingWinners = this.#getRacingWinners();
    GameController.#printGameResult(result, racingWinners);
  }
}

export default GameController;
