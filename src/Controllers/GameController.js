import { splitCarNameToArray, Validation } from '../utils';
import { RacingGame } from '../Domains/RacingGame';
import { Car } from '../Domains/Car';

export class GameController {
  #model;
  #view;

  constructor(view) {
    this.#view = view;

    this.#setGameConfig();
  }

  async #setGameConfig() {
    const cars = await this.#createCarByUserInput();
    const totalRound = await this.#readTotalRound();

    this.#model = new RacingGame(cars, totalRound);

    this.#printGameResult();
  }

  async #createCarByUserInput() {
    try {
      const userInput = await this.#view.readCarName();
      const carNames = splitCarNameToArray(userInput);
      const cars = carNames.map((carName) => new Car(carName));

      return cars;
    } catch (error) {
      return this.#handleError(error, () => {
        return this.#createCarByUserInput();
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
