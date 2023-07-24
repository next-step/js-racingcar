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
    this.#view.readCarName((userInput) => this.#validateCarName(userInput));
  }

  #validateCarName(userInput) {
    try {
      const carNames = splitCarNameToArray(userInput);
      carNames.forEach((carName) => validateCarName(carName));

      this.#startRacingGame(carNames);
    } catch (error) {
      this.#printError(error);
    }
  }

  #startRacingGame(carNames) {
    this.#model.startRacingGame(carNames, RACING_GAME.TOTAL_ROUNDS);
  }

  #printError(error) {
    this.#view.printError(error);
  }
}
