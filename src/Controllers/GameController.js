import { splitCarNameToArray, Validation } from '../utils';

export class GameController {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#setGameConfig();
  }

  async #setGameConfig() {
    const carNames = await this.#readCarName();
    const totalRound = await this.#readTotalRound();

    this.#model.setCars(carNames);
    this.#model.setTotalRounds(totalRound);

    this.#startRacingGame();
  }

  async #readCarName() {
    try {
      const userInput = await this.#view.readCarName();
      const carNames = splitCarNameToArray(userInput);
      carNames.forEach(Validation.validateCarName);

      return carNames;
    } catch (error) {
      return this.#handleError(error, () => {
        return this.#readCarName();
      });
    }
  }

  async #readTotalRound() {
    try {
      const userInput = await this.#view.readTotalRound();
      Validation.validateTotalRounds(userInput);

      return userInput;
    } catch (error) {
      return this.#handleError(error, () => {
        return this.#readTotalRound();
      });
    }
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

  async #handleError(error, phaseToRetry) {
    this.#printError(error.message);

    return await phaseToRetry();
  }
}
