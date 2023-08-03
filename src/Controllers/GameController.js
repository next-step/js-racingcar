import { splitCarNameToArray, Validation } from '../utils';

export class GameController {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#readCarName();
  }

  async #readCarName() {
    try {
      const userInput = await this.#view.readCarName();
      const carNames = splitCarNameToArray(userInput);
      carNames.forEach(Validation.validateCarName);

      this.#handleCarNameInput(carNames);
    } catch (error) {
      this.#handleError(error, () => {
        this.#readCarName();
      });
    }
  }

  #handleCarNameInput(carNames) {
    this.#model.setCars(carNames);

    this.#readTotalRound();
  }

  async #readTotalRound() {
    try {
      const userInput = await this.#view.readTotalRound();
      Validation.validateTotalRounds(userInput);

      this.#handleTotalRoundInput(userInput);
    } catch (error) {
      this.#handleError(error, () => {
        this.#readTotalRound();
      });
    }
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

  #handleError(error, phaseToRetry) {
    this.#printError(error.message);

    phaseToRetry();
  }
}
