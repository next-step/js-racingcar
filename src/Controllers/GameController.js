import { splitCarNameToArray, Validation } from '../utils';
import { RacingGame } from '../Domains/RacingGame';

export class GameController {
  #model;
  #view;

  constructor(view) {
    this.#view = view;

    this.#setGameConfig();
  }

  async #setGameConfig() {
    const carNames = await this.#readCarName();
    const totalRound = await this.#readTotalRound();
    this.#model = new RacingGame(carNames, totalRound);

    this.#printGameResult();
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
