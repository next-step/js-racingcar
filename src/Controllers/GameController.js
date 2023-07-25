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
    const carNames = this.#view.readCarName((userInput) =>
      this.#validateCarName(userInput)
    );

    this.#startRacingGame(carNames);
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

  #startRacingGame(carNames) {
    this.#model.startRacingGame(carNames, RACING_GAME.TOTAL_ROUNDS);

    this.#printGameResult();
  }

  #printGameResult() {
    const gameResult = this.#model.getGameResult();

    this.#view.printGameResult(gameResult);
  }

  #printError(error) {
    this.#view.printError(error);
  }
}
