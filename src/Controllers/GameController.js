import { RACING_GAME } from '../constants';
import { splitCarNameToArray, validateCarName } from '../utils';

export class GameController {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;
  }

  play() {
    this.#readCarName();
  }

  #readCarName() {
    this.#view.readCarName((userInput) => this.#handleUserInput(userInput));
  }

  #handleUserInput(userInput) {
    const carNames = this.#validateCarName(userInput);

    this.#startRacingGame(carNames);
  }

  #startRacingGame(carNames) {
    this.#model.settingRacingGame(carNames, RACING_GAME.TOTAL_ROUNDS);

    this.#printGameResult();
  }

  #validateCarName(userInput) {
    try {
      const carNames = splitCarNameToArray(userInput);
      carNames.forEach(validateCarName);

      return carNames;
    } catch (error) {
      this.#printError(error);
    }
  }

  #printGameResult() {
    const gameResult = this.#model.getGameResult();

    this.#view.printGameResult(gameResult);
  }

  #printError(error) {
    this.#view.printError(error);
  }
}
