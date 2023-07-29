import { splitCarNameToArray, validateCarName } from '../utils';

export class GameController {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#readCarName();
  }

  #readCarName() {
    this.#view.readCarName((userInput) => this.#handleCarNameInput(userInput));
  }

  #handleCarNameInput(userInput) {
    const carNames = this.#validateCarName(userInput);

    this.#model.setCars(carNames);
    this.#readTotalRound();
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

  #readTotalRound() {
    this.#view.readTotalRound((userInput) =>
      this.#handleTotalRoundInput(userInput)
    );
  }

  #handleTotalRoundInput(userInput) {
    this.#model.setTotalRounds(userInput);

    this.#startRacingGame();
  }

  #startRacingGame() {
    this.#model.startRace();

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
